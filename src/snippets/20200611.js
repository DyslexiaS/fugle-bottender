require('dotenv').config();

const Promise = require('bluebird');
const snakeCaseKeys = require('snakecase-keys');
const telegramApi = require('../lib/native_api/telegram');
const logger = require('../lib/logger');

const MAX_CONCURRENCY = 10;

const notifyTelegramUsers = async userIds => {
    const keyboardParams = [
        {
            text: '填寫問卷',
            url: 'https://www.surveycake.com/s/L0QN7',
        },
    ];
    const msg = [
        `親愛的富果小幫手用戶您好，為求更精準地為您提供股票特蒐服務，富果團隊和台、政、東吳大學共同推動了「智能投資信鴿」專案，期待透過您協助回填問卷（約 2 分鐘），優化您於富果的投資體驗！\n\n為感謝您的參與，我們將會抽出 10 位幸運的回填用戶，並贈送富果獨家指標「券商買賣集中度 30 天使用權限（價值199元）」喔！謝謝您！`,
        {
            parseMode: 'HTML',
            replyMarkup: {
                inlineKeyboard: [keyboardParams],
            },
        },
    ];
    return Promise.map(
        userIds,
        userId => {
            logger.info({
                id: userId,
                timestamp: +new Date(),
                event: 'proactive_message',
                message: `20200611-問卷調查`,
            });
            const id = userId.replace(/^telegram-/, '');
            return telegramApi.sendMessage({
                chat_id: id,
                text: msg[0],
                ...snakeCaseKeys(msg[1]),
            });
        },
        {
            concurrency: MAX_CONCURRENCY,
        },
    );
};

(async () => {
    const telegramIds = [
        // paste ids here...
    ];
    await notifyTelegramUsers(telegramIds);
})();
