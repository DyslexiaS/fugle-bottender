const { NEWLINE_LF, HELPBTNS } = require('../constants');

const smile = () => {
    const XDstring = ['😀', '😁', '😂', '😃', '😄', '😅', '😆'];
    return XDstring[Math.round(Math.random() * XDstring.length)];
};

const register = () => {
    const text =
        `Hi, 您好, 我是富果股市小幫手! 目前此服務僅免費開放給富果會員使用. ` +
        `若您已註冊富果會員, 請直接輸入您的<u>【手機號碼】</u> (格式：0912345678) 進行帳號認證, ` +
        `若您尚未註冊富果會員, 請先<a href="https://www.fugle.tw/account/register">完成註冊後</a>再使用本服務, 謝謝！`;
    return text;
};

const greeting = () => {
    const tip = '您現在就可以輸入任一檔股票試試看, 例如:【2330】';
    const text = `Hi, 您好, 我是富果股市小幫手! 您可以告訴我您關心的股票, 我會在營收、財報和重大訊息發佈的時候通知您喔! \n\n${tip}`;
    return [
        text,
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
    ];
};

const thanks = () => {
    const messages = [
        '謝謝您!',
        '十分感謝您的支持!',
        '十分感謝您的支持!\n歡迎您隨時批評指教!',
        '謝謝您的支持!',
        '哈! 祝您投資順利喔!',
        '謝謝您, 我會繼續努力!',
    ];
    return messages[Math.round(Math.random() * messages.length)];
};

const notFound = () => {
    const text = `您的指令或問題我目前找不到答案, 我會盡快學習相關的知識! \n
        您可以點擊【查看說明】來看看我目前提供的服務,
        或是輸入【#】反應您遇到的問題喔!`;
    const keyboardParams = [
        {
            text: '查看說明',
            callbackData: 'HELP',
        },
    ];
    return [
        text,
        {
            replyMarkup: {
                inlineKeyboard: [keyboardParams],
            },
        },
    ];
};

const dataNotFound = () => {
    const text =
        '不好意思, 您想搜尋的資料目前我找不到, 您可以找看看其他的項目, 或是輸入【#】跟我反應您遇到的問題喔! 謝謝!';
    return text;
};

const notSupported = () => {
    const text =
        '不好意思, 小幫手目前尚未支援相關功能, 如果您有其他需求, 歡迎輸入【#】告訴我，謝謝!';
    return text;
};

const groupAlert = () => {
    const text =
        '哈囉! 想在群組中呼叫我, 請在所有指令前加上【/】喔! 例如要搜尋個股, 請輸入【/股號】; 選擇項目的時候, 請輸入【/號碼】喔!';
    return text;
};

const helpWatchlist = () => {
    const textNewLine = NEWLINE_LF;
    const textNewLine2 = `${textNewLine}${textNewLine}`;
    const text =
        '' +
        `• 您可以輸入【+股票代碼】來建立您的自選追蹤, 接收營收, 除權息與重大訊息的即時通知${textNewLine2}` +
        `• 您可以輸入【-股票代碼】將股票從您的自選追蹤中移除${textNewLine2}` +
        `• 您可以輸入【LIST】確認您目前的自選追蹤${textNewLine2}` +
        `• 您可以輸入【CLEAR】清空特定的追蹤清單${textNewLine2}` +
        '• 編輯自選追蹤時, 您可用逗號隔開代碼, 一次增刪多檔, 如:【+2330,2412】';
    return text;
};

const helpLinking = () => {
    const textNewLine = NEWLINE_LF;
    const textNewLine2 = `${textNewLine}${textNewLine}`;
    const text =
        '' +
        `• 您可以輸入【FUGLE】查詢您的帳號狀態, 並進行綁定或解除綁定${textNewLine2}` +
        `• 綁定 Fugle 帳號後, 您的自選追蹤將會與 Fugle 網站上的自選追蹤同步${textNewLine2}` +
        `• 您在網站上也可以針對每個追蹤清單設定開啟或關閉小幫手的通知`;
    return text;
};

const helpInfo = () => {
    const textNewLine = NEWLINE_LF;
    const textNewLine2 = `${textNewLine}${textNewLine}`;
    const text =
        '' +
        `• 您可以輸入【股票代碼】或【公司簡稱】, 如:【2330】, 查詢該股票的價量及線圖${textNewLine2}` +
        `• 您也可以直接輸入想查詢的資料類型, 如:【鴻海的營收】${textNewLine2}` +
        '• 目前我支援台股大部分資料以及美股的價格查詢, 如果您有其他需求, 歡迎輸入【#】告訴我!';
    return text;
};

const helpQuery = () => {
    const keyboardParams = Object.keys(HELPBTNS).map(key => {
        return {
            text: HELPBTNS[key],
            callbackData: `HELP_${key}`,
        };
    });
    return [
        '請問您想瞭解哪部分的功能呢?',
        {
            replyMarkup: {
                inlineKeyboard: [keyboardParams],
            },
        },
    ];
};

module.exports = {
    smile,
    register,
    greeting,
    thanks,
    notFound,
    dataNotFound,
    notSupported,
    groupAlert,
    helpWatchlist,
    helpLinking,
    helpInfo,
    helpQuery,
};
