const { router, route, text, telegram } = require('bottender/router');
const { chain, withProps } = require('bottender');
const {
    handleGreeting,
    handleThanks,
    handleSmile,
    handleHelp,
    handleSuggest,
    handleUnknown,
} = require('./handler/general');
const {
    handleAddSymbols,
    handleDelSymbols,
    handleRemoveWatchlist,
    handleShowWatchlist,
    handleLinkingStatus,
} = require('./handler/watchlist');
const { handleSearch } = require('./handler/search');
const { handleTelegramCallbackQuery } = require('./handler/telegram');
const validateAndLog = require('./middleware/validate_logger');
const fullwidth = require('./middleware/fullwidth');
const typingAction = require('./middleware/typing_action');

const mainRoutes = () => {
    return router([
        telegram.callbackQuery(handleTelegramCallbackQuery),
        text(/(^hi.*|^hello.*|[你|妳|您]好.*|^哈囉)/i, handleGreeting),
        text(/(^好棒.*$|^你好棒.*$|^thank.*$|^謝謝.*$|^感謝.*$|^沒關係.*$)/i, handleThanks),
        text(
            /(^XD.*$|^OK.*$|^[:|：][)|）]$|^\^[\s|_]*\^$|^哈+$|^好喔.+$|^好的.+$|^haha$)/i,
            handleSmile,
        ),
        text(/(^ADD\s*(.+)$|^[+＋]\s*(.+)$)/i, handleAddSymbols),
        text(/(^DEL\s*(.+)$|^[-－]\s*(.+)$)/i, handleDelSymbols),
        text(/^CLEAR$/i, handleRemoveWatchlist),
        text(
            /(新增自選|加入自選|加到自選|新增追蹤|加入追蹤|加到追蹤|刪除自選|自選刪除|刪除追蹤|追蹤刪除)/i,
            withProps(handleHelp, {
                data: 'WATCHLIST',
            }),
        ),
        text(/(^HELP\s*(.*)|^怎麼.*|^[?？]\s*(.*))/i, handleHelp),
        text(/(^LIST$|^WATCHLIST$|自選|自選追蹤|追蹤)/i, handleShowWatchlist),
        text(/(^FUGLE$|^連結$|^同步$|^綁定$)/i, handleLinkingStatus),
        text(/^#$/i, handleSuggest),
        text('*', handleSearch),
        route('*', handleUnknown),
    ]);
};

module.exports = async function App() {
    return chain([
        // middlewares
        validateAndLog,
        typingAction,
        fullwidth,
        // updateAddress,
        // handle routes
        mainRoutes,
    ]);
};
