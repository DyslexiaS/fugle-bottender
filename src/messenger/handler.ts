import { intentMatch, quickReplyMatch } from '../lib/intent';
import * as general from './controller/general';

interface Context {
    event: any;
    sendText(...args: any[]): void;
    sendMessage(...args: any[]): void;
}

export let entry = async (context: Context) => {
    const { isText, isQuickReply, text, quickReply, message } = context.event;
    if (isQuickReply) {
        console.log(context.event);
        console.log(quickReply);
        const { payload } = quickReply;
        const { name } = quickReplyMatch(payload);
        switch (name) {
            case 'help':
                await general.help(context, payload);
            default:
                return;
        }
    } else if (isText) {
        console.log(context.event);
        const { name, data } = intentMatch(text);
        console.log(name, data);
        await context.sendText(`Hello ${context.event.text} ${name}`);
        switch (name) {
            case 'help':
                await general.help(context, data);
            default:
                return;
        }
    }
};
