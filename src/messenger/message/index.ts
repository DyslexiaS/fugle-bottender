export class QuickReply {
    content_type: string;
    title: string;
    payload: string | number;
    constructor(_type: string, _title: string, _payload: string | number) {
        this.content_type = _type;
        this.title = _title;
        this.payload = _payload;
    }
}

export class Message {
    text: string;
    quick_replies: QuickReply[];
    constructor(_text: string = '', _quick: QuickReply[] = []) {
        this.text = _text;
        if (_quick.length) {
            this.quick_replies = _quick;
        }
    }
}
