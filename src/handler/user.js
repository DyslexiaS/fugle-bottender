const rp = require('request-promise');
// const Promise = require('bluebird');
const utils = require('../lib/utils');

const handleRegisterReq = async (context) => {
    const { text: mobile } = context.event;
    const { userId } = utils.getSourceAndUserId(context);
    if (!userId) {
        return context.sendMessage('處理錯誤, 請稍候重試');
    }
    try {
        const result = await rp({
            uri: `${process.env.FUGLE_API_HOST}/bot/register-req`,
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
            text = `您好, 已傳送簡訊驗證碼到您的手機【${mobile}】, 請在對話框回傳您收到的【6位數字驗證碼】完成帳號綁定.`;
        } else if (status === 1) {
            // messenger user
            text =
                `您好, 此手機目前有綁定即將下架的 Messenger 服務, 即將為您進行帳號移轉作業.\n\n` +
                `系統將傳送簡訊驗證碼到您的手機【${mobile}】, 請在對話框回傳您收到的【6位數字驗證碼】完成帳號綁定, 系統會自動將您在 Messenger 的清單資料移轉至 Telegram.`;
        }
        await context.sendMessage(text);
    } catch (err) {
        console.log(err);
        return context.sendMessage('處理錯誤, 請稍候重試');
    }
};

const handleRegister = async (context) => {
    const { text: otp, message } = context.event;
    const {
        from: { id: channelId, first_name, last_name },
    } = message;
    if (!channelId || !context.state.user.mobile) {
        return context.sendMessage('處理錯誤, 請稍候重試');
    }
    try {
        const result = await rp({
            uri: `${process.env.FUGLE_API_HOST}/bot/register`,
            method: 'POST',
            body: {
                mobile: context.state.user.mobile,
                otp,
                channel: 'telegram',
                userId: `telegram-${channelId}`,
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
            `您已成功完成帳號綁定, 可以開始使用小幫手囉! 現在就輸入任一檔股票試試看, 例如:【2330】\n\n` +
                `若要接收重大訊息等通知資訊, 請<b>務必確認您有將通知功能打開</b>, 您可以點擊下方【查看自選追蹤】確認您的設定`,
            {
                parse_mode: 'HTML',
                replyMarkup: {
                    inlineKeyboard: [
                        [
                            {
                                text: '查看說明',
                                callbackData: 'HELP',
                            },
                            {
                                text: '查看自選追蹤',
                                callbackData: 'SHOW_WATCHLIST',
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

const handleUnregister = async (context) => {
    const { userId } = utils.getSourceAndUserId(context);
    if (!userId) {
        return context.sendMessage('處理錯誤, 請稍候重試');
    }
    try {
        const result = await rp({
            uri: `${process.env.FUGLE_API_HOST}/bot/unregister`,
            method: 'POST',
            body: {
                userId,
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
            `您已成功解除帳號綁定, 在重新完成富果會員帳號綁定前, 將無法正常使用小幫手服務喔!`,
        );
    } catch (err) {
        console.log(err);
        return context.sendMessage('處理錯誤, 請稍候重試');
    }
};

const handleLinkingStatus = async (context) => {
    const { userId } = utils.getSourceAndUserId(context);
    if (!userId) {
        return context.sendMessage('處理錯誤, 請稍候重試');
    }
    try {
        const user = await rp({
            uri: `${process.env.FUGLE_API_HOST}/bot/linking-status`,
            method: 'POST',
            body: {
                channel: 'telegram',
                userId,
            },
            json: true,
            encoding: null,
            timeout: 20000,
        });
        const fugleUserId = user.userId;
        if (fugleUserId !== null) {
            // session.dialogData.fugleUserId = fugleUserId;
            return context.sendMessage(`您已綁定富果會員的帳號: ${user.mobile}, 請問是否要解除?`, {
                replyMarkup: {
                    inlineKeyboard: [
                        [
                            {
                                text: '解除綁定',
                                callbackData: 'UNREGISTER',
                            },
                        ],
                    ],
                },
            });
        }
        return context.sendMessage(
            '您目前尚未綁定富果會員帳號, 您可以直接輸入<u>【手機號碼】</u> (格式：0912345678) 進行綁定',
            {
                parse_mode: 'HTML',
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
    handleUnregister,
    handleLinkingStatus,
};
