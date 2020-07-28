const Promise = require('bluebird');
const snakeCaseKeys = require('snakecase-keys');
const telegramNotifyMessage = require('../lib/message/notify_telegram');
const lineNotifyMessage = require('../lib/message/notify_line');
const telegramApi = require('../lib/native_api/telegram');
const lineApi = require('../lib/native_api/line');
const logger = require('../lib/logger');

const notifyTelegramUsers = async (body, userIds) => {
    const { symbolId, symbolName, contentSpecId, content } = body;
    let msgs;
    if (contentSpecId === 'FCNT000004') {
        msgs = await telegramNotifyMessage.important(symbolId, symbolName, contentSpecId, content);
    } else if (contentSpecId === 'FCNT000006') {
        msgs = await telegramNotifyMessage.revenue(symbolId, symbolName, contentSpecId, content);
    } else if (contentSpecId === 'FCNT000069') {
        msgs = await telegramNotifyMessage.statement(symbolId, symbolName, contentSpecId, content);
    } else {
        logger.error(`${contentSpecId} error`);
        return;
    }
    // send messages
    await Promise.each(msgs, async (msg) => {
        await Promise.map(
            userIds,
            (userId) => {
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
                        text: msg[0],
                        ...snakeCaseKeys(msg[1]),
                    });
                }
                if (contentSpecId === 'FCNT000006') {
                    return telegramApi.sendPhoto({
                        chat_id: id,
                        photo: msg[0],
                        ...snakeCaseKeys(msg[1]),
                    });
                }
                return telegramApi.sendMessage({
                    chat_id: id,
                    text: msg[0],
                    ...snakeCaseKeys(msg[1]),
                });
            },
            {
                concurrency: 5,
            },
        );
    });
};

const notifyLineUsers = async (body, userIds) => {
    const { symbolId, symbolName, contentSpecId, content } = body;
    let msgs;
    if (contentSpecId === 'FCNT000004') {
        msgs = await lineNotifyMessage.important(symbolId, symbolName, contentSpecId, content);
    } else if (contentSpecId === 'FCNT000006') {
        msgs = await lineNotifyMessage.revenue(symbolId, symbolName, contentSpecId, content);
    } else if (contentSpecId === 'FCNT000069') {
        msgs = await lineNotifyMessage.statement(symbolId, symbolName, contentSpecId, content);
    } else {
        logger.error(`${contentSpecId} error`);
        return;
    }
    // send messages
    await Promise.map(
        userIds,
        (userId) => {
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
    const { body } = req;
    const { userIds } = body;
    // early return to crawler
    res.status(200).end();
    const telegramUserIds = userIds.filter((id) => id.match(/^telegram-/));
    const lineUserIds = userIds.filter((id) => id.match(/^line-/));
    await notifyTelegramUsers(body, telegramUserIds);
    await notifyLineUsers(body, lineUserIds);
}

module.exports = notify;
