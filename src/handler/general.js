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
    await context.sendMessage('suggest handler');
};

const handleDataNotFound = async context => {
    const message =
        '不好意思, 您想搜尋的資料目前我找不到, 您可以找看看其他的項目, 或是輸入【#】跟我反應您遇到的問題喔! 謝謝!';
    await context.sendMessage(message);
};

const handleUnknown = async context => {
    await context.sendMessage('unknown handler');
};

module.exports = {
    handleGreeting,
    handleThanks,
    handleSmile,
    handleHelp,
    handleSuggest,
    handleDataNotFound,
    handleUnknown,
};
