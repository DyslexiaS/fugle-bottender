// const util = require('./lib/message/util');
const rp = require('request-promise');
const _ = require('lodash');
const Promise = require('bluebird');
const wordsSplitter = require('../lib/word_splitter');
const { handleDataNotFound } = require('./general');
const stockMsg = require('../lib/message/stock');

const handleSearch = async context => {
    await context.sendText('stock action 6');
    const { text: inputText } = context.event;
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
        console.log(result);
        await context.sendMessage('go search');
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
                await context.sendMessage([
                    text,
                    {
                        replyMarkup: {
                            inlineKeyboard: [keyboardParams],
                        },
                    },
                ]);
            } else {
                await Promise.each(result.elements, async symbolComplex => {
                    const { priceInfo } = symbolComplex;
                    await context.sendMessage(priceInfo);
                    const defaultInfo = await stockMsg.defaultInfo(symbolComplex);
                    console.log(defaultInfo);
                    // await context.sendGenericTemplate(defaultInfo);
                });
            }
            return;
        }
        /*
        if (result.cards) {
            const caLength = result.cards.length;
            // session.dialogData.cards = result.cards;
            if (caLength === 0) {
                await general.dataNotFound(context);
                return;
            } else if (caLength > 3) {
                const text = `您的搜尋總共傳回 ${caLength} 份資料, 請問您要全部顯示嗎?`;
                const quickReplies = [
                    new QuickReply('text', '我想重新搜尋', 'SEARCH_RESET'),
                    new QuickReply('text', '好', 'SEARCH_ALL'),
                ];
                await context.sendMessage(new Message(text, quickReplies));
            } else {
                /*
                const imageInfo = symbolMessage.imageInfo(session, searchText, cards, source);
                imageInfo.forEach((message) => {
                    session.send(message);
                });
                */
        //    }
        // }
    } catch (err) {
        console.error(err);
    }

    /*
    (session, args, next) => {
        let inputText;
        if (args && args.data) {
            inputText = args.data;
        } else if (session.message && session.message.text) {
            inputText = session.message.text;
        } else {
            return session.replaceDialog('/not_found');
        }
        const wordresult = wordsSplitter.extractor(inputText);
        let searchText = `${wordresult.remain} ${wordresult.types.join(' ')}`;
        searchText = searchText.trim();
        session.dialogData.searchText = searchText;
        session.dialogData.elements = null;
        session.dialogData.cards = null;
        // console.log(`search api: ${searchText}`);
        const options = {
            method: 'GET',
            uri: `${config.apiServer}/search/bot?q=${encodeURIComponent(searchText)}`,
            json: true
        };
        return request(options).then((result) => {
            if (_.isEmpty(result) || result.message === 'notfind') {
                return session.replaceDialog('/data_not_found');
            }
            if ('elements' in result) {
                const eLength = result.elements.length;
                session.dialogData.elements = result.elements;
                if (eLength === 0) {
                    return session.replaceDialog('/data_not_found');
                } else if (eLength > 3) {
                    const text = `您的搜尋總共傳回 ${eLength} 份資料, 請問您要全部顯示嗎?`;
                    return builder.Prompts.choice(session, text, ['我想重新搜尋', '好'], {
                        maxRetries: 0
                    });
                }
                return next();
            }
            if ('cards' in result) {
                const cLength = result.cards.length;
                session.dialogData.cards = result.cards;
                if (cLength === 0) {
                    return session.replaceDialog('/data_not_found');
                } else if (cLength > 3) {
                    const text = `您的搜尋總共傳回 ${cLength} 份資料, 請問您要全部顯示嗎?`;
                    return builder.Prompts.choice(session, text, ['我想重新搜尋', '好'], {
                        maxRetries: 0
                    });
                }
                return next();
            }
            return session.replaceDialog('/data_not_found');
        });
    },
    (session, results) => {
        const elements = session.dialogData.elements;
        const cards = session.dialogData.cards;
        const searchText = session.dialogData.searchText;
        if (results.response && results.response.entity === '我想重新搜尋') {
            return session.endDialog('請您再重新搜尋, 謝謝!');
        }
        if (elements && elements.length > 0) {
            const { source } = utils.getSourceAndUserId(session);
            Promise.each(elements, (symbolComplex) => {
                const { priceInfo } = symbolComplex;
                session.send(priceInfo);
                return symbolMessage.defaultInfo(session, source, symbolComplex)
                .then((message) => {
                    session.send(message);
                });
            });
        }
        if (cards && cards.length > 0) {
            const { source } = utils.getSourceAndUserId(session);
            const imageInfo = symbolMessage.imageInfo(session, searchText, cards, source);
            imageInfo.forEach((message) => {
                session.send(message);
            });
        }
        return session.endDialog();
    }
    */
};

module.exports = {
    handleSearch,
};
