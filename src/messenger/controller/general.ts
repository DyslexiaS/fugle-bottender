import * as util from '../message/util';
import { HELPBTNS } from '../../lib/constants';

interface Context {
    event: any;
    sendText(...args: any[]): void;
    sendMessage(...args: any[]): void;
}

class QuickReply {
    content_type: string;
    title: string;
    payload: string | number;
    constructor(_type: string, _title: string, _payload: string | number) {
        this.content_type = _type;
        this.title = _title;
        this.payload = _payload;
    }
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

export let help = async (context: Context, type: string) => {
    if (type === 'HELP_WATCHLIST') {
        const message = util.helpWatchlist();
        await context.sendMessage(message);
        const quickReplies = Object.keys(HELPBTNS).filter((key) => {
            return key !== 'HELP_WATCHLIST';
        })
        .map((key) => {
            return new QuickReply('text', HELPBTNS[key], key);
        });
        await context.sendMessage(new Message('查詢其他項目:', quickReplies));
    } else if (type === 'HELP_LINKING') {
        const message = util.helpLinking();
        await context.sendMessage(message);
        const quickReplies = Object.keys(HELPBTNS).filter((key) => {
            return key !== 'HELP_LINKING';
        })
        .map((key) => {
            return new QuickReply('text', HELPBTNS[key], key);
        });
        await context.sendMessage(new Message('查詢其他項目:', quickReplies));
    } else if (type === 'HELP_INFO') {
        const message = util.helpInfo();
        await context.sendMessage(message);
        const quickReplies = Object.keys(HELPBTNS).filter((key) => {
            return key !== 'HELP_INFO';
        })
        .map((key) => {
            return new QuickReply('text', HELPBTNS[key], key);
        });
        await context.sendMessage(new Message('查詢其他項目:', quickReplies));
    } else {
        const text = '請問您想瞭解哪部分的功能呢?';
        const quickReplies = Object.keys(HELPBTNS).map((key) => {
            return new QuickReply('text', HELPBTNS[key], key);
        });
        await context.sendMessage(new Message(text, quickReplies));
    }
};
