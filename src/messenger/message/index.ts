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

export class Button {
    type: string;
    title: string;
    url?: string;
    payload?: string;
    constructor(options: any) {
        const { type, title, url, payload } = options;
        if (type) { this.type = type; }
        if (title) { this.title = title; }
        if (url) { this.url = url; }
        if (payload) { this.payload = payload; }
    }
}

export class Element {
    title: string;
    image_url?: string;
    subtitle?: string;
    default_action: {
      type: string;
      url?: string;
      messenger_extensions: boolean;
      webview_height_ratio?: string;
    };
    buttons?: Button[];
    constructor(options: any) {
        const { title, image_url, subtitle, default_action, buttons } = options;
        if (title) { this.title = title; }
        if (image_url) { this.image_url = image_url; }
        if (subtitle) { this.subtitle = subtitle; }
        if (default_action) { this.default_action = default_action; }
        if (buttons) { this.buttons = buttons; }
    }
}
