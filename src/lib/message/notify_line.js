/* eslint no-underscore-dangle: 0 */
const Promise = require('bluebird');
const numeral = require('numeral');
const moment = require('moment');
const rp = require('request-promise');

async function revenue(symbolId, symbolName, contentSpecId, content) {
    let imageUrl =
        'https://dk91kmsnfr6kg.cloudfront.net/images/logo144-1b44e4dbc828f92defbb2a582aec7f93v1.png';
    try {
        const res = await rp(
            `https://api.fugle.tw/picture/v0/card/request?symbolId=${symbolId}&cardSpecId=FCRD000008&apiToken=${process.env.PICTURE_API_TOKEN}`,
            {
                json: true,
            },
        );
        if (!res || !res.data || !res.data.url) {
            console.log(`${res}`);
        } else {
            imageUrl = res.data.url;
        }
    } catch (e) {
        console.log(e.message);
    }
    const rawContent = content.rawContent[0];
    const title = `${symbolName}(${symbolId}) 公布了最新營收!`;
    const mom = `${numeral(rawContent.data.current.mom).format('0.00')}%`;
    const subtitle =
        `${rawContent.year}/${rawContent.month}: ` +
        `${numeral(rawContent.data.current.revenue).format('0,0')}仟元 \n` +
        `【YoY: ${rawContent.data.current.yoy}%】\n【MoM: ${mom}】`;
    const webUrl1 = `${process.env.FUGLE_WEB_HOST}/picture/cards?cards[]={"c":"FCRD000008","s":"${symbolId}"}`;
    const webUrl2 = `${process.env.FUGLE_WEB_HOST}/ai/${symbolId},revenue,kchart?utm_source=fuglebot&utm_medium=linebot&utm_campaign=fugle`;
    const message = {
        type: 'template',
        altText: '此訊息無法呈現.',
        template: {
            type: 'buttons',
            thumbnailImageUrl: imageUrl,
            title: title,
            text: subtitle,
            actions: [
                {
                    type: 'uri',
                    label: '快速閱讀',
                    uri: webUrl1,
                },
                {
                    type: 'uri',
                    label: 'Fugle完整版',
                    uri: webUrl2,
                },
            ],
        },
    };
    return [message];
}

function important(symbolId, symbolName, contentSpecId, content) {
    var momentNow = moment();
    var rawContentIdxs = [];
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
        const webUrl2 = `${process.env.FUGLE_WEB_HOST}/ai/${symbolId},important,kchart?utm_source=fuglebot&utm_medium=linebot&utm_campaign=fugle`;
        return {
            type: 'template',
            altText: '此訊息無法呈現.',
            template: {
                type: 'buttons',
                title: title.slice(0, 40),
                text: subtitle.slice(0, 60),
                actions: [
                    {
                        type: 'uri',
                        label: '快速閱讀',
                        uri: webUrl1,
                    },
                    {
                        type: 'uri',
                        label: '富果完整版',
                        uri: webUrl2,
                    },
                ],
            },
        };
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
    const title = `${symbolName}(${symbolId}) 公布了${ys}財報!`;
    var actions = rawContent.urls
        .map(obj => {
            return {
                type: 'uri',
                uri: obj.url,
                label: typeMappings[obj.type].name,
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
    actions.push({
        type: 'postback',
        label: `查詢${symbolName}`,
        data: `action?SEARCH_SYMBOL=${symbolId}`,
    });
    const messages = [
        {
            type: 'template',
            altText: '此訊息無法呈現.',
            template: {
                type: 'buttons',
                text: title,
                actions: actions.slice(0, 4),
            },
        },
    ];
    if (actions.length > 4) {
        messages.push({
            type: 'template',
            altText: '此訊息無法呈現.',
            template: {
                type: 'buttons',
                text: `${symbolName} 更多財報項目`,
                actions: actions.slice(4),
            },
        });
    }
    return messages;
}

module.exports = {
    revenue,
    important,
    statement,
};
