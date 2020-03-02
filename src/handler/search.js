const rp = require('request-promise');
const _ = require('lodash');
const Promise = require('bluebird');
const wordsSplitter = require('../lib/word_splitter');
const { handleDataNotFound } = require('./general');
const stockMsg = require('../lib/message/stock');

const handleSearch = async (context, props) => {
    let inputText;
    const { isText, isCallbackQuery } = context.event;
    if (isText) {
        inputText = context.event.text;
    } else if (isCallbackQuery) {
        inputText = props.query;
    }
    try {
        const wordResult = wordsSplitter.extractor(inputText);
        const searchText = `${wordResult.remain} ${wordResult.types.join(' ')}`.trim();
        const result = await rp({
            method: 'GET',
            uri: `${process.env.FUGLE_API_HOST}/search/bot?q=${encodeURIComponent(searchText)}`,
            json: true,
        });
        if (_.isEmpty(result) || result.message === 'notfind') {
            await handleDataNotFound(context);
            return;
        }
        if (result.elements) {
            const elLength = result.elements.length;
            if (elLength === 0) {
                await handleDataNotFound(context);
            } else if (elLength > 2) {
                const text = `您的搜尋總共傳回 ${elLength} 份資料, 請問您要全部顯示嗎?`;
                const keyboardParams = [
                    {
                        text: '我想重新搜尋',
                        callbackData: `SEARCH_RESET`,
                    },
                    {
                        text: '好',
                        callbackData: `SEARCH_ALL`,
                    },
                ];
                await context.sendMessage(text, {
                    replyMarkup: {
                        inlineKeyboard: [keyboardParams],
                    },
                });
            } else {
                await Promise.each(result.elements, async symbolComplex => {
                    const { priceInfo } = symbolComplex;
                    await context.sendMessage(priceInfo);
                    await context.sendChatAction('typing');
                    const defaultInfo = await stockMsg.defaultInfo(symbolComplex);
                    await context.sendPhoto(...defaultInfo[0]);
                    if (defaultInfo.length > 1) {
                        await context.sendMessage(...defaultInfo[1]);
                    }
                });
            }
            return;
        }
        if (result.cards) {
            const caLength = result.cards.length;
            if (caLength === 0) {
                await handleDataNotFound(context);
                return;
            } else if (caLength > 2) {
                const text = `您的搜尋總共傳回 ${caLength} 份資料, 請問您要全部顯示嗎?`;
                const keyboardParams = [
                    {
                        text: '我想重新搜尋',
                        callbackData: `SEARCH_RESET`,
                    },
                    {
                        text: '好',
                        callbackData: `SEARCH_ALL`,
                    },
                ];
                await context.sendMessage(text, {
                    replyMarkup: {
                        inlineKeyboard: [keyboardParams],
                    },
                });
            } else {
                const imageInfo = await stockMsg.imageInfo(searchText, result.cards);
                await context.sendPhoto(...imageInfo[0]);
                await Promise.each(imageInfo.slice(1), async info => {
                    await context.sendMessage(...info);
                });
            }
            return;
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    handleSearch,
};
