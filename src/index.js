const { router, route, text, telegram } = require('bottender/router');
const { chain, withProps } = require('bottender');
const {
    handleGreeting,
    handleThanks,
    handleSmile,
    handleHelp,
    handleSuggest,
    handleGetStarted,
    handleUnknown,
    handleNotFound,
    handleRegisterHint,
} = require('./handler/general');
const {
    handleAddSymbolsReq,
    handleDelSymbolsReq,
    handleRemoveWatchlist,
    handleShowWatchlist,
} = require('./handler/watchlist');
const { handleRegisterReq, handleRegister, handleLinkingStatus } = require('./handler/user');
const { handleSearch } = require('./handler/search');
const { handleTelegramCallbackQuery } = require('./handler/telegram');
const validateAndLog = require('./middleware/validate_logger');
const fullwidth = require('./middleware/fullwidth');
const typingAction = require('./middleware/typing_action');

const handleBotCommands = async (context) => {
    const {
        message: { text: msgText },
    } = context.event;
    if (msgText.match(/^\/start$/)) {
        return handleRegisterHint(context);
    }
    return handleNotFound(context);
};

const handleSearchOrRegister = async (context) => {
    const {
        message: { text: msgText },
    } = context.event;
    if (context?.state?.user?.registering && msgText.match(/^[0-9]{6}$/)) {
        return handleRegister(context);
    }
    return handleSearch(context);
};

const mainRoutes = () => {
    return router([
        telegram.callbackQuery(handleTelegramCallbackQuery),
        text(/^\//, handleBotCommands),
        text(/^09[0-9]{8}$/, handleRegisterReq),
        text(/(^hi.*|^hello.*|[你|妳|您]好.*|^哈囉)/i, handleGreeting),
        text(/(^好棒.*$|^你好棒.*$|^thank.*$|^謝謝.*$|^感謝.*$|^沒關係.*$)/i, handleThanks),
        text(
            /(^XD.*$|^OK.*$|^[:|：][)|）]$|^\^[\s|_]*\^$|^哈+$|^好喔.+$|^好的.+$|^haha$)/i,
            handleSmile,
        ),
        text(/(^ADD\s*(.+)$|^[+＋]\s*(.+)$)/i, handleAddSymbolsReq),
        text(/(^DEL\s*(.+)$|^[-－]\s*(.+)$)/i, handleDelSymbolsReq),
        text(/^CLEAR$/i, handleRemoveWatchlist),
        text(
            /(新增自選|加入自選|加到自選|新增追蹤|加入追蹤|加到追蹤|刪除自選|自選刪除|刪除追蹤|追蹤刪除)/i,
            withProps(handleHelp, {
                data: 'WATCHLIST',
            }),
        ),
        text(/(^HELP\s*(.*)|問題|詢問|^怎麼.*|^[?？]\s*(.*))/i, handleHelp),
        text(/(^LIST$|^WATCHLIST$|自選|自選追蹤|追蹤)/i, handleShowWatchlist),
        text(/(^FUGLE$|^富果$|^連結$|^同步$|^綁定$|^解綁$|^解除綁定$)/i, handleLinkingStatus),
        text(/(^#$|客服)/i, handleSuggest),
        text('*', handleSearchOrRegister),
        route('*', handleUnknown),
    ]);
};

module.exports = async function App() {
    return chain([
        // middlewares
        validateAndLog,
        typingAction,
        fullwidth,
        // handle routes
        mainRoutes,
    ]);
};
