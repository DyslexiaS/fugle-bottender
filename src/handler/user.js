const rp = require('request-promise');
// const Promise = require('bluebird');
const utils = require('../lib/utils');

const handleRegisterReq = async context => {
    const { text: mobile } = context.event;
    const { userId } = utils.getSourceAndUserId(context);
    if (!userId) {
        return context.sendMessage('處理錯誤, 請稍候重試');
    }
    try {
        const result = await rp({
            uri: `${process.env.FUGLE_API_HOST}/bot/register_req`,
            method: 'POST',
            body: {
                mobile,
            },
            json: true,
            encoding: null,
            timeout: 20000,
        });
        const { status, error } = result;
        if (error) {
            const text = error.message;
            return context.sendMessage(text);
        }
        context.setState({
            user: {
                mobile,
            },
        });
        let text;
        if (status === 0) {
            // new user
            text = `您好, 已傳送 OTP 驗證碼到您的手機【${mobile}】, 請回傳驗證碼完成帳號綁定.`;
        } else if (status === 1) {
            // messenger user
            text =
                `您好, 此手機目前有綁定即將下架的 Messenger 服務, 即將為您進行帳號移轉作業` +
                `, 已傳送 OTP 驗證碼到您的手機【${mobile}】, 請回傳驗證碼完成帳號綁定, 系統會自動將您在 Messenger 的清單資料移轉至 Telegram.`;
        }
        await context.sendMessage(text);
    } catch (err) {
        console.log(err);
        return context.sendMessage('處理錯誤, 請稍候重試');
    }
};

const handleRegister = async context => {
    const { text: otp, message } = context.event;
    const {
        from: { id: userId, first_name, last_name },
    } = message;
    if (!userId || !context.user.mobile) {
        return context.sendMessage('處理錯誤, 請稍候重試');
    }
    try {
        const result = await rp({
            uri: `${process.env.FUGLE_API_HOST}/bot/register`,
            method: 'POST',
            body: {
                mobile: context.user.mobile,
                otp,
                channel: 'telegram',
                userId: `telegram-${userId}`,
                profile: {
                    first_name,
                    last_name,
                },
            },
            json: true,
            encoding: null,
            timeout: 10000,
        });
        const { error } = result;
        if (error) {
            const text = error.message;
            return context.sendMessage(text);
        }
        await context.sendMessage(
            `您已成功完成帳號綁定, 可以開始使用小幫手囉! 現在就輸入任一檔股票試試看, 例如:【2330】`,
            {
                replyMarkup: {
                    inlineKeyboard: [
                        [
                            {
                                text: '查看說明',
                                callbackData: 'HELP',
                            },
                        ],
                    ],
                },
            },
        );
    } catch (err) {
        console.log(err);
        return context.sendMessage('處理錯誤, 請稍候重試');
    }
};

module.exports = {
    handleRegisterReq,
    handleRegister,
};
