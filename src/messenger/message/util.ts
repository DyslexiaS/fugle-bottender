const NEWLINE_LF = '\n';

class QuickReply {
    content_type: string;
    title: string;
    payload: string | number;
}

class Message {
    text: string;
    quick_replies: QuickReply[];
    constructor(_text: string = '', _quick: QuickReply[] = []) {
        this.text = _text;
        if (_quick.length) {
            this.quick_replies = _quick;
        }
    }
}

export let helpWatchlist = () => {
    const textNewLine = NEWLINE_LF;
    const textNewLine2 = `${textNewLine}${textNewLine}`;
    const text = '' +
    `• 您可以輸入【+股票代碼】來建立您的自選追蹤, 接收營收, 除權息與重大訊息的即時通知${textNewLine2}` +
    `• 您可以輸入【-股票代碼】將股票從您的自選追蹤中移除${textNewLine2}` +
    `• 您可以輸入【LIST】確認您目前的自選追蹤${textNewLine2}` +
    `• 您可以輸入【CLEAR】清空特定的追蹤清單${textNewLine2}` +
    '• 編輯自選追蹤時, 您可用逗號隔開代碼, 一次增刪多檔, 如:【+2330,2412】';
    return new Message(text);
};

export let helpLinking = () => {
    const textNewLine = NEWLINE_LF;
    const textNewLine2 = `${textNewLine}${textNewLine}`;
    const text = '' +
    `• 您可以輸入【FUGLE】查詢您的帳號狀態, 並進行綁定或解除綁定${textNewLine2}` +
    `• 綁定 Fugle 帳號後, 您的自選追蹤將會與 Fugle 網站上的自選追蹤同步${textNewLine2}` +
    `• 您在網站上也可以針對每個追蹤清單設定開啟或關閉小幫手的通知`;
    return new Message(text);
};

export let helpInfo = () => {
    const textNewLine = NEWLINE_LF;
    const textNewLine2 = `${textNewLine}${textNewLine}`;
    const text = '' +
    `• 您可以輸入【股票代碼】或【公司簡稱】, 如:【2330】, 查詢該股票的價量及線圖${textNewLine2}` +
    `• 您也可以直接輸入想查詢的資料類型, 如:【鴻海的營收】${textNewLine2}` +
    '• 目前我支援台股大部分資料以及美股的價格查詢, 如果您有其他需求, 歡迎輸入【#】告訴我!';
    return new Message(text);
};
