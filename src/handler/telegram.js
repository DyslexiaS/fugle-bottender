// const util = require('../lib/message/util');
const { withProps } = require('bottender');
const { handleHelp } = require('./general');
const {
    handleAddSymbols,
    handleDelSymbols,
    handleShowWatchlist,
    handleShowWatchlistDetail,
    handleWatchlistSettings,
} = require('./watchlist');
const { handleUnregister } = require('./user');

const handleTelegramCallbackQuery = async (context, props) => {
    const { data: queryData } = context.event.callbackQuery;
    if (queryData.match(/^HELP/i)) {
        const data = queryData.match(/^HELP_(.+)$/i);
        return withProps(handleHelp, { data: data && data.length ? data[1] : null });
    }
    let match;
    match = queryData.match(/^SHOW_WATCHLIST_DETAIL::(.+)$/i);
    if (match) {
        return withProps(handleShowWatchlistDetail, { listId: match[1] });
    }
    match = queryData.match(/^SHOW_WATCHLIST$/i);
    if (match) {
        return handleShowWatchlist;
    }
    match = queryData.match(/^CHANGE_WATCHLIST_SETTINGS::(.+)::(.+)$/i);
    if (match) {
        return withProps(handleWatchlistSettings, {
            listId: match[1],
            notification: match[2] === 'true',
        });
    }
    match = queryData.match(/^UNREGISTER$/i);
    if (match) {
        return handleUnregister;
    }
    match = queryData.match(/^ADD_TO_WATCHLIST::(.+)$/i);
    if (match) {
        return withProps(handleAddSymbols, { listId: match[1] });
    }
    match = queryData.match(/^DEL_FROM_WATCHLIST::(.+)$/i);
    if (match) {
        return withProps(handleDelSymbols, { listIds: [match[1]] });
    }
};

module.exports = {
    handleTelegramCallbackQuery,
};
