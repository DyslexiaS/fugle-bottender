const Promise = require('bluebird');
const snakeCaseKeys = require('snakecase-keys');
const telegramNotifyMessage = require('../lib/message/notify_telegram');
const lineNotifyMessage = require('../lib/message/notify_line');
const chartGen = require('../lib/chart/generator');
const telegramApi = require('../lib/native_api/telegram');
const lineApi = require('../lib/native_api/line');
const logger = require('../lib/logger');

const notifyTelegramUsers = async (body, userIds) => {
    const { symbolId, symbolName, contentSpecId, content } = body;
    let msgs;
    if (contentSpecId === 'FCNT000004') {
        msgs = await telegramNotifyMessage.important(symbolId, symbolName, contentSpecId, content);
    } else if (contentSpecId === 'FCNT000006') {
        await chartGen.genChartAndUploadToS3(JSON.stringify(content), symbolId, {
            botSource: 'facebook',
            chartType: 'revenue',
        });
        msgs = await telegramNotifyMessage.revenue(
            symbolId,
            symbolName,
            contentSpecId,
            content,
            'facebook',
        );
    } else if (contentSpecId === 'FCNT000069') {
        msgs = await telegramNotifyMessage.statement(symbolId, symbolName, contentSpecId, content);
    } else {
        logger.error(`${contentSpecId} error`);
        return;
    }
    // send messages
    return Promise.map(
        userIds,
        userId => {
            logger.info({
                id: userId,
                timestamp: +new Date(),
                event: 'proactive_message',
                message: `${symbolId}-${symbolName}-${contentSpecId}`,
            });
            const id = userId.replace(/^telegram-/, '');
            if (contentSpecId === 'FCNT000004') {
                return telegramApi.sendMessage({
                    chat_id: id,
                    text: msgs[0][0],
                    ...snakeCaseKeys(msgs[0][1]),
                });
            } else if (contentSpecId === 'FCNT000006') {
                return telegramApi.sendPhoto({
                    chat_id: id,
                    photo: msgs[0],
                    ...snakeCaseKeys(msgs[1]),
                });
            } else {
                return telegramApi.sendMessage({
                    chat_id: id,
                    text: msgs[0],
                    ...snakeCaseKeys(msgs[1]),
                });
            }
        },
        {
            concurrency: 5,
        },
    );
};

const notifyLineUsers = async (body, userIds) => {
    const { symbolId, symbolName, contentSpecId, content } = body;
    let msgs;
    if (contentSpecId === 'FCNT000004') {
        msgs = await lineNotifyMessage.important(symbolId, symbolName, contentSpecId, content);
    } else if (contentSpecId === 'FCNT000006') {
        await chartGen.genChartAndUploadToS3(JSON.stringify(content), symbolId, {
            botSource: 'line',
            chartType: 'revenue',
        });
        msgs = await lineNotifyMessage.revenue(
            symbolId,
            symbolName,
            contentSpecId,
            content,
            'line',
        );
    } else if (contentSpecId === 'FCNT000069') {
        msgs = await lineNotifyMessage.statement(symbolId, symbolName, contentSpecId, content);
    } else {
        logger.error(`${contentSpecId} error`);
        return;
    }
    // send messages
    return Promise.map(
        userIds,
        userId => {
            logger.info({
                id: userId,
                timestamp: +new Date(),
                event: 'proactive_message',
                message: `${symbolId}-${symbolName}-${contentSpecId}`,
            });
            const id = userId.replace(/^(line-user|line-group|line-room)-/, '');
            return lineApi.send(id, msgs);
        },
        {
            concurrency: 5,
        },
    );
};

async function notify(req, res) {
    const body = req.body;
    const userIds = body.userIds;
    // early return to crawler
    res.status(200).end();
    const telegramUserIds = userIds.filter(id => id.match(/^telegram-/));
    const lineUserIds = userIds.filter(id => id.match(/^line-/));
    await notifyTelegramUsers(body, telegramUserIds);
    await notifyLineUsers(body, lineUserIds);
}

module.exports = notify;
