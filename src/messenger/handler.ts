import { intentMatch, quickReplyMatch } from '../lib/intent';
import * as general from './controller/general';
import { MessengerContext } from 'bottender-types';

export let entry = async (context: MessengerContext) => {
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
