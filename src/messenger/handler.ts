import { intentMatch, quickReplyMatch, postbackMatch } from '../lib/intent';
import * as general from './controller/general';
import { MessengerContext } from 'bottender-types';

export let entry = async (context: MessengerContext) => {
    const {
        isText, isQuickReply, isPostback,
        text, quickReply, postback, message
    } = context.event;
    if (isText) {
        // console.log(context.event);
        console.log(text);
        const { name, data } = intentMatch(text);
        console.log(name, data);
        await context.sendText(`Hello ${context.event.text} ${name}`);
        switch (name) {
            case 'help':
                await general.help(context, data);
                break;
            case 'greeting':
                await general.greeting(context);
                break;
            case 'thanks':
                await general.thanks(context);
                break;
            case 'smile':
                await general.smile(context);
                break;
            case 'add_symbols':
                break;
            case 'del_symbols':
                break;
            case 'remove_watchlist':
                break;
            case 'show_watchlist':
                break;
            case 'linking_status':
                break;
            case 'suggest':
                break;
            default:
                return;
        }
    } else if (isQuickReply) {
        // console.log(context.event);
        console.log(quickReply);
        const { payload } = quickReply;
        const { name } = quickReplyMatch(payload);
        switch (name) {
            case 'help':
                await general.help(context, payload);
                break;
            default:
                return;
        }
    } else if (isPostback) {
        const { payload } = postback;
        console.log(postback);
        const { name, data } = postbackMatch(payload);
        switch (name) {
            case 'help':
                await general.help(context, data);
                break;
            default:
                return;
        }
    }
};
