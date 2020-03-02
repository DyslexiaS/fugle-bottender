const rp = require('request-promise');
const Promise = require('bluebird');
const { withProps } = require('bottender');
const utils = require('../lib/utils');
const { NEWLINE_LF } = require('../lib/constants');

const handleAddSymbolsReq = async (context, props) => {
    const { isText, isCallbackQuery } = context.event;
    let symbolQuery;
    if (isText && props.match) {
        symbolQuery = props.match[2] || props.match[3];
    } else if (isCallbackQuery) {
        //
    }
    if (!symbolQuery) {
        return context.sendMessage('無法確認您要新增的股票, 您可以重新輸入看看, 例如: 【+2330】');
    }
    const { userId } = utils.getSourceAndUserId(context);
    const result = await rp({
        uri: `${process.env.FUGLE_API_HOST}/bot/add_symbols_request`,
        method: 'POST',
        body: {
            userId,
            symbolQuery,
        },
        json: true,
        encoding: null,
        timeout: 20000,
    });
    if (result.error) {
        const text = result.error.message;
        return context.sendMessage(text);
    }
    const { symbols, lists } = result;
    const symbolIds = symbols.map(symbol => symbol.id);
    const symbolStrings = symbols.map(symbol => `${symbol.name}(${symbol.id})`);
    if (!symbols.length) {
        const message = '您所輸入的股票代碼或名稱不存在, 請重新確認喔';
        return context.sendMessage(message);
    }
    if (!lists.length) {
        const message = '您的群組狀態錯誤, 請輸入【#】洽客服協助, 謝謝';
        return context.sendMessage(message);
    }
    // save to state
    context.setState({
        watchlist: {
            lists,
            symbolIds,
        },
    });
    if (lists.length > 10) {
        const message =
            '提醒: 您的追蹤群組超過 Messenger 可顯示的上限, 若要編輯全部的自選, 請到網站操作';
        return context.sendMessage(message);
    }
    if (lists.length === 1) {
        const listId = lists[0].id;
        return withProps(handleAddSymbols, {
            listId,
            symbolIds,
        });
    }
    const text = `請問您想將 ${symbolStrings.join(',')} 加入到哪個追蹤群組呢?`;
    const keyboardParams = lists.slice(0, 10).map(list => {
        return {
            text: list.title,
            callbackData: `ADD_TO_WATCHLIST::${list.id}`,
        };
    });
    await context.sendMessage(text, {
        replyMarkup: {
            inlineKeyboard: [keyboardParams],
        },
    });
};

const handleAddSymbols = async (context, props) => {
    const { userId } = utils.getSourceAndUserId(context);
    const lists = context.state.watchlist.lists;
    let listId = props.listId;
    const reqSymbolIds = props.symbolIds || context.state.watchlist.symbolIds;
    /*
    if (results.response && results.response.entity) {
        const temp = lists.find((list) => { return list.title === results.response.entity; });
        listId = temp.id;
    }
    */
    try {
        const result = await rp({
            uri: `${process.env.FUGLE_API_HOST}/bot/add_symbols`,
            method: 'POST',
            body: {
                userId,
                symbolIds: reqSymbolIds,
                watchlistId: listId,
            },
            json: true,
            encoding: null,
            timeout: 20000,
        });
        if (result.error === 'quota exceeded') {
            return context.sendMessage(
                '您儲存的股票數目已超過單一群組上限(35), 建議您可以與Fugle【同步】後新增更多群組, 若您有其他特殊需求請輸入【#】與我們聯繫, 謝謝!',
            );
        }
        const symbols = result.symbols;
        const symbolIds = symbols.map(symbol => {
            return symbol.id;
        });
        const list = result.list;
        const symbolStrings = symbols.map(symbol => {
            return `${symbol.name}(${symbol.id})`;
        });
        if (symbols.length) {
            const text = `已幫您把 ${symbolStrings.join(',')} 加入 [${list.title}] 了`;
            const keyboardParams = [
                {
                    text: '復原',
                    callbackData: 'DEL_FROM_WATCHLIST',
                },
                {
                    text: '查看自選追蹤',
                    callbackData: 'SHOW_WATCHLIST',
                },
            ];
            return context.sendMessage(text, {
                replyMarkup: {
                    inlineKeyboard: [keyboardParams],
                },
            });
        }
        return context.sendMessage('處理錯誤, 請稍候重試');
    } catch (err) {
        console.log(err);
        return context.sendMessage('處理錯誤, 請稍候重試');
    }
};

const handleDelSymbolsReq = async context => {
    await context.sendText('stock action 2');
};

const handleRemoveWatchlist = async context => {
    await context.sendText('stock action 3');
};

const handleShowWatchlist = async context => {
    const { userId } = utils.getSourceAndUserId(context);
    if (!userId) {
        return context.sendMessage('處理錯誤, 請稍候重試');
    }
    try {
        const result = await rp({
            uri: `${process.env.FUGLE_API_HOST}/bot/watchlists`,
            method: 'GET',
            qs: {
                userId,
            },
            json: true,
            encoding: null,
            timeout: 20000,
        });
        const lists = result.lists;
        if (!lists.length) {
            const text = '您尚未建立自選追蹤, 請輸入例如:【+2330】開始編輯';
            return context.sendMessage(text);
        }
        if (lists.length > 5) {
            const text = '提醒: 您的追蹤群組數量較多, 若要查看全部群組, 請到網站操作';
            await context.sendMessage(text);
        }
        await Promise.each(lists.slice(0, 5), async list => {
            const notification = list.notification ? '(通知開啟)' : '(通知關閉)';
            let symbolCount = 0;
            const symbolStrings = list.symbols.reduce((prev, symbol) => {
                symbolCount++;
                const temp = `(${symbol.id}) ${symbol.name}`;
                if (symbolCount > 6) {
                    return prev;
                } else if (symbolCount === 6) {
                    return `${prev}${NEWLINE_LF}...共${list.symbols.length}檔`;
                } else if (prev.length + temp.length >= 65) {
                    return `${prev}${NEWLINE_LF}...共${list.symbols.length}檔`;
                } else if (prev.length) {
                    return `${prev}${NEWLINE_LF}${temp}`;
                }
                return prev + temp;
            }, '');
            const keyboardParams = [
                {
                    text: list.notification ? '關閉通知' : '開啟通知',
                    callbackData: `CHANGE_WATCHLIST_SETTINGS::${list.id}::${!list.notification}`,
                },
                {
                    text: '列出全部',
                    callbackData: `SHOW_WATCHLIST_DETAIL::${list.id}`,
                },
            ];
            const text = `<b>► ${list.title}</b> <i>${notification}</i>\n${symbolStrings}`;
            await context.sendMessage(text, {
                parse_mode: 'HTML',
                replyMarkup: {
                    inlineKeyboard: [keyboardParams],
                },
            });
        });
    } catch (err) {
        console.log(err);
        return context.sendMessage('處理錯誤, 請稍候重試');
    }
};

const handleShowWatchlistDetail = async (context, props) => {
    const { userId } = utils.getSourceAndUserId(context);
    if (!userId) {
        return context.sendMessage('處理錯誤, 請稍候重試');
    }
    try {
        const watchlistId = props.listId;
        const textNewLine = NEWLINE_LF;
        const textNewLine2 = `${NEWLINE_LF}${NEWLINE_LF}`;
        const result = await rp({
            uri: `${process.env.FUGLE_API_HOST}/bot/watchlist/${watchlistId}`,
            method: 'GET',
            qs: {
                userId,
            },
            json: true,
            encoding: null,
            timeout: 20000,
        });
        const { title, symbols } = result;
        let text;
        if (symbols.length) {
            text = `您的 [${title}] 追蹤如下:${textNewLine2}`;
            text += symbols
                .map(symbol => {
                    return `(${symbol.id}) ${symbol.name}`;
                })
                .join(textNewLine);
            if (result.notification) {
                text += `${textNewLine2}當有重大訊息, 除權息或營收公布時, 我會即時通知您!`;
            }
        } else {
            text = '此追蹤群組沒有內容, 請輸入例如:【+2330】開始編輯';
        }
        const keyboardParams = [
            {
                text: '查看自選追蹤',
                callbackData: `SHOW_WATCHLIST`,
            },
        ];
        await context.sendMessage(text, {
            replyMarkup: {
                inlineKeyboard: [keyboardParams],
            },
        });
    } catch (err) {
        console.log(err);
        return context.sendMessage('處理錯誤, 請稍候重試');
    }
};

const handleWatchlistSettings = async (context, props) => {
    const { userId } = utils.getSourceAndUserId(context);
    if (!userId) {
        return context.sendMessage('處理錯誤, 請稍候重試');
    }
    try {
        const { listId, notification } = props;
        const result = await rp({
            uri: `${process.env.FUGLE_API_HOST}/bot/watchlist`,
            method: 'POST',
            body: {
                userId,
                listId,
                fields: {
                    notification,
                },
            },
            json: true,
            encoding: null,
            timeout: 20000,
        });
        const { list } = result;
        if (!list) {
            return context.sendMessage('處理錯誤, 請稍候重試');
        }
        const text = `追蹤群組 [${list.title}] 的通知功能已${list.notification ? '開啟' : '關閉'}`;
        const keyboardParams = [
            {
                text: '查看自選追蹤',
                callbackData: `SHOW_WATCHLIST`,
            },
        ];
        await context.sendMessage(text, {
            replyMarkup: {
                inlineKeyboard: [keyboardParams],
            },
        });
    } catch (err) {
        console.log(err);
        return context.sendMessage('處理錯誤, 請稍候重試');
    }
};

module.exports = {
    handleAddSymbolsReq,
    handleAddSymbols,
    handleDelSymbolsReq,
    handleRemoveWatchlist,
    handleShowWatchlist,
    handleShowWatchlistDetail,
    handleWatchlistSettings,
};
