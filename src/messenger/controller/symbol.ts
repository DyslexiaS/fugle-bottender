// const request = require('request-promise');
const _ = require('lodash');
// const Promise = require('bluebird');
// const builder = require('botbuilder');
// const customMessage = require('../message/custom_message');
// const symbolMessage = require('../message/symbol_message');
const config = require('../../config');
const wordsSplitter = require('../../lib/words_splitter');
// const utils = require('../lib/utils');
const rp = require('request-promise');
import * as util from '../message/util';
import { Button, Message, QuickReply } from '../message/index';

interface Context {
    event: any;
    sendText(...args: any[]): void;
    sendMessage(...args: any[]): void;
    sendButtonTemplate(title: string, buttons: Button[]): void;
}

export const search = async (context: Context, text: string) => {
    const inputText = text;
    try {
        const wordresult = wordsSplitter.extractor(inputText);
        const searchText = `${wordresult.remain} ${wordresult.types.join(' ')}`.trim();
        const result = await rp({
            method: 'GET',
            uri: `${config.api.host}/search/bot?q=${encodeURIComponent(searchText)}`,
            json: true
        });
        if (_.isEmpty(result) || result.message === 'notfind') {
            // return session.replaceDialog('/data_not_found');
        }
        if ('elements' in result) {
            const eLength = result.elements.length;
            // session.dialogData.elements = result.elements;
            if (eLength === 0) {
                // return session.replaceDialog('/data_not_found');
            } else if (eLength > 3) {
                const text = `您的搜尋總共傳回 ${eLength} 份資料, 請問您要全部顯示嗎?`;
                /*
                return builder.Prompts.choice(session, text, ['我想重新搜尋', '好'], {
                    maxRetries: 0
                });
                */
            }
            // return next();
        }
        if ('cards' in result) {
            const cLength = result.cards.length;
            // session.dialogData.cards = result.cards;
            if (cLength === 0) {
                // return session.replaceDialog('/data_not_found');
            } else if (cLength > 3) {
                /*
                const text = `您的搜尋總共傳回 ${cLength} 份資料, 請問您要全部顯示嗎?`;
                return builder.Prompts.choice(session, text, ['我想重新搜尋', '好'], {
                    maxRetries: 0
                });
                */
            }
            // return next();
        }
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

export const showImportant = async (context: Context) => {
    /*
    const chunks = args.data.split('-');
    const symbolId = chunks[0];
    const fingerprint = chunks[2];
    const webUrl = `${config.fugleServer}/picture/cards?cards[]={"c":"FCRD000006","s":"${symbolId}","r":"${fingerprint}"}`;
    const text = '不好意思, 因為改版更新, 請您透過以下連結觀看本則訊息, 謝謝!';
    const message = new builder.Message(session)
        .text(text)
        .attachments([
            new builder.HeroCard(session)
                .buttons([
                    builder.CardAction.openUrl(session, webUrl, '快速閱讀')
                ]),
        ]);
    return session.endDialog(message);
    return session.endDialog('不好意思, 這則訊息的顯示目前有點問題, 麻煩您先到網站上瀏覽, 謝謝!');
    */
};

