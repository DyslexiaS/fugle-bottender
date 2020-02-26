const rp = require('request-promise');
const utilMsg = require('../lib/message/util');

const handleGreeting = async context => {
    const message = utilMsg.greeting();
    await context.sendMessage(...message);
};

const handleThanks = async context => {
    const message = utilMsg.thanks();
    await context.sendMessage(message);
};

const handleSmile = async context => {
    const message = utilMsg.smile();
    await context.sendMessage(message);
};

const handleHelp = async (context, props) => {
    const { data } = props;
    if (data === 'WATCHLIST') {
        const message = utilMsg.helpWatchlist();
        await context.sendMessage(message);
    } else if (data === 'LINKING') {
        const message = utilMsg.helpLinking();
        await context.sendMessage(message);
    } else if (data === 'INFO') {
        const message = utilMsg.helpInfo();
        await context.sendMessage(message);
    } else {
        const message = utilMsg.helpQuery();
        await context.sendMessage(...message);
    }
};

const handleSuggest = async context => {
    const text = '歡迎您透過客服系統提供我們任何想法與建議，我們會儘速回覆您，謝謝!';
    // TBD:
    // const supportId = Buffer.from(`${userId},${userName}`).toString('base64').replace(/=/g, '**');
    const keyboardParams = [
        {
            text: '客服系統',
            url: `https://support.fugle.tw/online-service/`,
        },
    ];
    await context.sendMessage(text, {
        replyMarkup: {
            inlineKeyboard: [keyboardParams],
        },
    });
};

const handleDataNotFound = async context => {
    const message =
        '不好意思, 您想搜尋的資料目前我找不到, 您可以找看看其他的項目, 或是輸入【#】跟我反應您遇到的問題喔! 謝謝!';
    await context.sendMessage(message);
};

const handleNotFound = async context => {
    const message = utilMsg.notFound();
    await context.sendMessage(...message);
};

const handleUnknown = async context => {
    await context.sendMessage('不好意思，小幫手目前暫時不支援此功能喔!');
};

const handleRegisterHint = async context => {
    const message = utilMsg.register();
    await context.sendMessage(message, {
        parse_mode: 'HTML',
    });
};

const handleGetStarted = async context => {
    const { message } = context.event;
    const {
        from: { id: userId, first_name, last_name },
    } = message;
    if (!userId) {
        return handleUnknown(context);
    }
    try {
        await rp({
            uri: `${process.env.FUGLE_API_HOST}/bot/init_user`,
            method: 'POST',
            body: {
                channel: 'telegram',
                userId: `telegram-${userId}`,
                profile: {
                    first_name,
                    last_name,
                },
            },
            json: true,
            encoding: null,
            timeout: 10000,
        });
        return handleGreeting(context);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    handleGreeting,
    handleThanks,
    handleSmile,
    handleHelp,
    handleSuggest,
    handleDataNotFound,
    handleNotFound,
    handleUnknown,
    handleRegisterHint,
    handleGetStarted,
};
