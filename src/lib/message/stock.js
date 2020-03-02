/* eslint no-underscore-dangle: 0 */
const _ = require('lodash');
const rp = require('request-promise');
var relations = require('../card_relations');

const getMappingCardNames = (cardSpecIds, limit) => {
    var names = cardSpecIds.map(cardSpecId => {
        return relations[cardSpecId];
    });
    names = _.uniq(_.flatten(names));
    names = names
        .sort(() => {
            return Math.round(Math.random()) - 0.5;
        })
        .slice(0, limit);
    return names;
};

const defaultInfo = async complex => {
    const { symbolInfo, summary } = complex;
    const { symbolId, symbolName } = symbolInfo;
    const res = await rp(
        `https://api.fugle.tw/picture/v0/card/request?symbolId=${symbolId}&cardSpecId=FCRD000002&apiToken=${process.env.PICTURE_API_TOKEN}`,
        {
            json: true,
        },
    );
    if (!res || !res.data || !res.data.url) {
        console.log(`${res}`);
        return;
    }
    const kchartURL = res.data.url;
    const params = encodeURIComponent(`symbol_id**${symbolId}`);
    const c1KeyboardParams = [
        {
            text: `加入自選`,
            callbackData: `ADD_TO_WATCHLIST_REQ::${symbolId}`,
        },
        {
            text: '交易',
            url: `${
                process.env.FUGLE_WEB_HOST
            }/bot-redirect.html?path=trade&params=${params}&t=${new Date().getTime()}`,
        },
        {
            text: '富果看更多',
            url: `${process.env.FUGLE_WEB_HOST}/ai/${symbolId},kchart`,
        },
    ];
    const card1 = [
        kchartURL,
        {
            caption: `${symbolName} (${symbolId}) 近3月價量走勢`,
            replyMarkup: {
                inlineKeyboard: [c1KeyboardParams],
            },
        },
    ];
    if (summary && summary.title && summary.subtitle) {
        const c2KeyboardParams = [
            {
                text: '營收',
                callbackData: `SEARCH_SYMBOL::${symbolId},營收`,
            },
            {
                text: '融資券',
                callbackData: `SEARCH_SYMBOL::${symbolId},融資券`,
            },
            {
                text: '法人買賣',
                callbackData: `SEARCH_SYMBOL::${symbolId},法人買賣`,
            },
        ];
        const card2 = [
            `${summary.title}：\n${summary.subtitle}`,
            {
                replyMarkup: {
                    inlineKeyboard: [c2KeyboardParams],
                },
            },
        ];
        return [card1, card2];
    }
    return [card1];
};

const imageInfo = (searchText, cards) => {
    const symbolIds = [];
    const symbolStrings = [];
    const cardSpecIds = [];
    // eliminate duplicated cards
    cards = cards.filter((card, idx) => {
        let exists = false;
        for (let i = idx + 1; i < cards.length; i++) {
            const compare = cards[i];
            if (
                card.card_spec_id === compare.card_spec_id &&
                card.symbol_id === compare.symbol_id
            ) {
                exists = true;
            }
        }
        return !exists;
    });
    const resultMsgs = [];
    // images
    cards.forEach(card => {
        const symbolString = `${card.symbol_name}(${card.symbol_id})`;
        symbolIds.push(card.symbol_id);
        symbolStrings.push(symbolString);
        cardSpecIds.push(card.card_spec_id);
        resultMsgs.push([
            card.chart_path,
            {
                caption: `${symbolString}`,
            },
        ]);
    });
    const symbolIdsJoined = symbolIds.join(',');
    // suffix info
    const urlQuery = encodeURIComponent(searchText);
    const actionKeyboardParams1 = [
        {
            text: `加入自選`,
            callbackData: `ADD_TO_WATCHLIST_REQ::${symbolIdsJoined}`,
        },
        {
            text: `到富果看更多`,
            url: `${process.env.FUGLE_WEB_HOST}/ai/${urlQuery}`,
        },
    ];
    const actionKeyboardParams2 = getMappingCardNames(cardSpecIds, 2).map(name => {
        return {
            text: `查詢 ${name}`,
            callbackData: `SEARCH_SYMBOL::${symbolIdsJoined},${name}`,
        };
    });
    resultMsgs.push([
        `► 您可以...`,
        {
            replyMarkup: {
                inlineKeyboard: [actionKeyboardParams1, actionKeyboardParams2],
            },
        },
    ]);
    return resultMsgs;
};

module.exports = {
    defaultInfo,
    imageInfo,
};
