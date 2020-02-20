// const util = require('./lib/message/util');

const handleAddSymbols = async context => {
    await context.sendText('stock action 1');
};

const handleDelSymbols = async context => {
    await context.sendText('stock action 2');
};

const handleRemoveWatchlist = async context => {
    await context.sendText('stock action 3');
};

const handleShowWatchlist = async context => {
    await context.sendText('stock action 4');
};

const handleLinkingStatus = async context => {
    await context.sendText('stock action 5');
};

module.exports = {
    handleAddSymbols,
    handleDelSymbols,
    handleRemoveWatchlist,
    handleShowWatchlist,
    handleLinkingStatus,
};
