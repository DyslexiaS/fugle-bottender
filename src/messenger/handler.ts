import { intentMatch, quickReplyMatch, postbackMatch } from '../lib/intent';
import * as general from './controller/general';
import * as symbol from './controller/symbol';

interface Handlers {
    help: any;
    greeting: any;
    thanks: any;
    smile: any;
    search: any;
    [key: string]: any;
}

const handlers: Handlers = {
    help: general.help,
    greeting: general.greeting,
    thanks: general.thanks,
    smile: general.smile,
    search: symbol.search,
};

export let entry = async (context: any) => {
    const {
        isText, isQuickReply, isPostback,
        text, quickReply, postback,
    } = context.event;
    if (isQuickReply) { // will also be isText
        // console.log(context.event);
        const { payload } = quickReply;
        console.log(`isQuickReply: ${payload}`);
        const { name } = quickReplyMatch(payload);
        console.log(`quick intent: ${name}`);
        await handlers[name].call(this, context, payload);
    } else if (isPostback) {
        // console.log(context.event);
        const { payload } = postback;
        console.log(`isPostBack: ${payload}`);
        const { name, data } = postbackMatch(payload);
        console.log(`postback intent: ${name}, ${data}`);
        await handlers[name].call(this, context, data);
    } else if (isText) {
        // console.log(context.event);
        console.log(`isText: ${text}`);
        const { name, data } = intentMatch(text);
        console.log(`intent: ${name}, ${data}`);
        await handlers[name].call(this, context, data);
    }
};
