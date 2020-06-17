require('dotenv').config();

const Promise = require('bluebird');
const numeral = require('numeral');
const rp = require('request-promise');
const moment = require('moment');
const _ = require('lodash');
const fugleApi = require('../lib/fugle');
const telegramApi = require('../lib/native_api/telegram');

const MAX_MESSAGE_COMPONENTS = 7;
const NumberOrZero = (str) => (Number.isNaN(Number(str)) ? 0 : Number(str));

async function getFugleContent(contentId) {
    const res = await rp({
        uri: `${process.env.FUGLE_API_HOST}/data/new_content/${contentId}`,
        method: 'GET',
        json: true,
        timeout: 10000,
    });
    return res.rawContent;
}

async function getDateAfterNTradingDays(nDays) {
    const today = moment().startOf('day');
    const result = await getFugleContent('FCNT000068');
    const objs = result.filter((obj) => {
        return obj.open_tw;
    });
    const todayIdx = objs.findIndex((obj) => {
        return moment(obj.date).format('x') === today.format('x');
    });
    if (todayIdx !== -1 && todayIdx + nDays <= objs.length) {
        return moment(objs[todayIdx + nDays].date);
    }
    return null;
}

async function notifyDividend(nDays) {
    if (nDays !== 0 && nDays !== 3) {
        console.log('Parameter should only be 0 or 3.');
        process.exit();
    }
    const momentDate = await getDateAfterNTradingDays(nDays);
    if (momentDate === null) {
        console.log('Get trading date failed, terminated.');
        process.exit();
    }
    const targetDateString = momentDate.format('YYYYMMDD');
    const targetDateString2 = momentDate.clone().add(1, 'days').format('YYYYMMDD');
    console.log(`target date: ${targetDateString}`);
    const dividendList = await getFugleContent(
        `FCNT000067?startDate=${targetDateString}&endDate=${targetDateString2}`,
    );
    if (!dividendList || !dividendList.length) {
        console.log('No dividend information.');
        process.exit();
    }
    const dividendSymbols = dividendList
        .filter((row) => {
            // 除權交易日, 除息交易日
            return (
                moment(row.risuYmd).isSame(momentDate) || moment(row.cshdivDate).isSame(momentDate)
            );
        })
        .filter((row) => row.symbolId);
    let dividendInfos = await Promise.map(dividendSymbols, async (symbol) => {
        const { cshdivCcapDiv, cshdivCernDiv, symbolId } = symbol;
        const priceObj = await getFugleContent(`FCNT000013?symbol_id=${symbolId}`);
        if (!priceObj || !priceObj.length) {
            return null;
        }
        const row = symbol;
        row.price = numeral(priceObj[priceObj.length - 1].close).format('0.00');
        row.changeRate = numeral(priceObj[priceObj.length - 1].change_rate).format('0.00');
        if (row.changeRate > 0) {
            row.changeRate = `+${row.changeRate}`;
        }
        row.yields = (NumberOrZero(cshdivCcapDiv) + NumberOrZero(cshdivCernDiv)) / row.price;
        const symbolNames = await fugleApi.getSymbolNames([symbolId]);
        row.symbolName = symbolNames[symbolId];
        return row;
    });
    dividendInfos = dividendInfos.filter((row) => row);
    const dividendSymbolIds = dividendSymbols.map((row) => row.symbolId);
    console.log(`notify symbols: ${dividendSymbolIds.join(',')}`);
    let users = await fugleApi.getUserIdsBySymbolIds(dividendSymbolIds);
    users = users.filter((user) => user.channel === 'telegram');
    await Promise.map(users, async (user) => {
        let { id: userId } = user;
        userId = userId.replace(/telegram-/, '');
        const notifySymbolIds = _.sortBy(_.intersection(user.symbols, dividendSymbolIds));
        if (!notifySymbolIds.length) {
            return;
        }
        console.log(`notify user ${userId}: ${notifySymbolIds.join(',')}`);
        let dateString = '';
        if (nDays === 0) {
            dateString = '今日';
        } else {
            const weekday = ['日', '一', '二', '三', '四', '五', '六'];
            dateString = ` ${momentDate.format('MM/DD')}(${weekday[momentDate.day()]}) `;
        }
        const messages = [];
        messages.push(`提醒您, 您追蹤的以下股票將於${dateString}進行除權息!`);
        await Promise.each(notifySymbolIds, (symbolId) => {
            const promises = [];
            const data = dividendInfos.find((row) => {
                return row.symbolId === symbolId;
            });
            // Need to check date again because two dates may both exist in one row.
            if (moment(data.cshdivDate).isSame(momentDate)) {
                const cash = NumberOrZero(data.cshdivCcapDiv) + NumberOrZero(data.cshdivCernDiv);
                const message =
                    `<b>${data.symbolName}(${data.symbolId}) 除息</b>\n` +
                    `現金股利: ${numeral(cash).format('0.00')} 元\n` +
                    `現金殖利率: ${numeral(data.yields).format('0.00%')}\n最新收盤價: ${
                        data.price
                    } (${data.changeRate}%)`;
                messages.push(message);
            }
            if (moment(data.risuYmd).isSame(momentDate)) {
                const risu = NumberOrZero(data.risuCapDiv) + NumberOrZero(data.risuErnDiv);
                const message =
                    `<b>${data.symbolName}(${data.symbolId}) 除權\n</b>` +
                    `股票股利: ${numeral(risu).format('0.00')} 元\n最新收盤價: ${data.price} (${
                        data.changeRate
                    }%)`;
                messages.push(message);
            }
            return Promise.all(promises);
        });
        // buttons
        const queryUrl = encodeURIComponent(`${notifySymbolIds.join(' ')} 股利政策`);
        const keyboardParams = [
            {
                url: 'https://www.twse.com.tw/zh/page/trading/exchange/TWT48U.html',
                text: '上市除權息',
            },
            {
                url: 'https://www.tpex.org.tw/web/stock/exright/preAnnounce/PrePost.php?l=zh-tw',
                text: '櫃買除權息',
            },
            {
                url: `${process.env.FUGLE_WEB_HOST}/ai/${queryUrl}?utm_source=fortunabot&utm_medium=telegrambot&utm_campaign=fugle`,
                text: '股利資訊',
            },
        ];
        messages.push(`股利及其他近期除權息資訊：`);
        if (messages.length < MAX_MESSAGE_COMPONENTS) {
            // send in one message
            await telegramApi.sendMessage({
                chat_id: userId,
                text: messages.join('\n\n'),
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [keyboardParams],
                },
            });
        } else {
            await Promise.each(messages, (message, idx) => {
                let params = {
                    chat_id: userId,
                    text: message,
                    parse_mode: 'HTML',
                };
                if (idx === messages.length - 1) {
                    params = {
                        ...params,
                        reply_markup: {
                            inline_keyboard: [keyboardParams],
                        },
                    };
                }
                return telegramApi.sendMessage(params);
            });
        }
    });
    console.log('done');
}

if (process.argv.length === 3) {
    // now should be 0 (today) or 3 (3 days before)
    notifyDividend(+process.argv[2]).then(() => {
        process.exit();
    });
} else {
    console.log('please specify days');
    process.exit();
}
