/* eslint no-underscore-dangle: 0 */
const Promise = require('bluebird');
const numeral = require('numeral');
const moment = require('moment');

function revenue(symbolId, symbolName, contentSpecId, content, botSource) {
    const imageBaseUrl = `https://s3-ap-northeast-1.amazonaws.com/${process.env.S3_BUCKET}`;
    const ts = new Date().getTime();
    const rawContent = content.rawContent[0];
    const title = `${symbolName}(${symbolId}) 公布了最新營收!`;
    const mom = `${numeral(rawContent.data.current.mom).format('0.00')}%`;
    const subtitle =
        `${rawContent.year}/${rawContent.month}: ` +
        `${numeral(rawContent.data.current.revenue).format('0,0')}仟元 \n` +
        `【YoY: ${rawContent.data.current.yoy}%】\n【MoM: ${mom}】`;
    const imageUrl = `${imageBaseUrl}/revenue/${symbolId}.${botSource}.jpg?ts=${ts}`;
    const webUrl1 = `${process.env.FUGLE_WEB_HOST}/picture/cards?cards[]={"c":"FCRD000008","s":"${symbolId}"}`;
    // messenger shows warning when url includes chars like ' ' or '+' or '='
    const redirectParams = encodeURIComponent(`symbol_id**${symbolId}`);
    const webUrl2 = `${
        process.env.FUGLE_WEB_HOST
    }/bot-redirect.html?path=trade&params=${redirectParams}&t=${new Date().getTime()}`;
    const webUrl3 = `${process.env.FUGLE_WEB_HOST}/ai/${symbolId},revenue,kchart?utm_source=fortunabot&utm_medium=messengerbot&utm_campaign=fugle`;
    const buttons = [
        {
            type: 'web_url',
            url: webUrl1,
            title: '快速閱讀',
            webview_height_ratio: 'tall',
        },
        {
            type: 'web_url',
            url: webUrl2,
            title: '玉山證券下單/開戶',
            messenger_extensions: true,
        },
        {
            type: 'web_url',
            url: webUrl3,
            title: 'Fugle完整版',
        },
    ];
    const elements = [
        {
            title: title,
            image_url: imageUrl,
            default_action: {
                type: 'web_url',
                url: webUrl1,
                webview_height_ratio: 'tall',
            },
            subtitle: subtitle,
            buttons: buttons,
        },
    ];
    return [elements];
}

function important(symbolId, symbolName, contentSpecId, content) {
    const momentNow = moment();
    const rawContentIdxs = [];
    content.rawContent.every((el, idx) => {
        if (
            moment(el.timestamp)
                .add(5, 'minutes')
                .isSameOrAfter(momentNow)
        ) {
            rawContentIdxs.push(idx);
            return true;
        }
        return false;
    });
    if (!rawContentIdxs.length) {
        rawContentIdxs.push(0); // should at least send 1st element
    }

    return Promise.map(rawContentIdxs, rawContentIdx => {
        const title = `${symbolName}(${symbolId}) 發布了重大訊息!`;
        const data = content.rawContent[rawContentIdx];
        const desc = data.descs
            .map(el => {
                const temp = el.content.join('');
                return `${el.title} ${temp}`;
            })
            .join('');
        const subtitle = `${data.title}\n\n${desc}`;
        const rowId = data._id;
        const webUrl1 = `${process.env.FUGLE_WEB_HOST}/picture/cards?cards[]={"c":"FCRD000006","s":"${symbolId}","r":"${rowId}"}`;
        const redirectParams = encodeURIComponent(`symbol_id**${symbolId}`);
        const webUrl2 = `${
            process.env.FUGLE_WEB_HOST
        }/bot-redirect.html?path=trade&params=${redirectParams}&t=${new Date().getTime()}`;
        const webUrl3 = `${process.env.FUGLE_WEB_HOST}/ai/${symbolId},important,kchart?utm_source=fortunabot&utm_medium=messengerbot&utm_campaign=fugle`;
        const buttons = [
            {
                type: 'web_url',
                url: webUrl1,
                title: '快速閱讀',
                webview_height_ratio: 'tall',
            },
            {
                type: 'web_url',
                url: webUrl2,
                title: '玉山證券下單/開戶',
                messenger_extensions: true,
            },
            {
                type: 'web_url',
                url: webUrl3,
                title: 'Fugle完整版',
            },
        ];
        const elements = [
            {
                title: title,
                default_action: {
                    type: 'web_url',
                    url: webUrl1,
                    webview_height_ratio: 'tall',
                },
                subtitle: subtitle,
                buttons: buttons,
            },
        ];
        return elements;
    });
}

function statement(symbolId, symbolName, contentSpecId, content) {
    const typeMappings = {
        income_statement: {
            idx: 0,
            name: '綜合損益',
        },
        balance_sheet: {
            idx: 1,
            name: '資產負債',
        },
        cashflow_statement: {
            idx: 2,
            name: '現金流量',
        },
        equity_statement: {
            idx: 3,
            name: '權益變動',
        },
        account_report: {
            idx: 4,
            name: '會計查核',
        },
    };
    const rawContent = content.rawContent;
    const ys = `${rawContent.year}第${rawContent.season}季`;
    const message = `${symbolName}(${symbolId}) 公布了${ys}財報!`;
    const buttons = rawContent.urls
        .map(obj => {
            return {
                type: 'web_url',
                url: obj.url,
                title: typeMappings[obj.type].name,
                index: typeMappings[obj.type].idx,
            };
        })
        .sort((a, b) => {
            return a.index - b.index;
        })
        .map(obj => {
            delete obj.index;
            return obj;
        });
    buttons.push({
        type: 'postback',
        payload: `action?SEARCH_SYMBOL=${symbolId}`,
        title: symbolName,
    });

    // organize elements
    const elements = [
        {
            title: message,
            buttons: buttons.slice(0, 3),
        },
    ];
    if (buttons.length > 3) {
        elements.push({
            title: '►　　',
            buttons: buttons.slice(3),
        });
    }
    return [elements];
}

module.exports = {
    revenue,
    important,
    statement,
};
