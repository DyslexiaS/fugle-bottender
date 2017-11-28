import { intentMatch } from '../lib/intent';
import * as general from './controller/general';

interface Context {
    event: any;
    sendText(...args: any[]): void;
    sendMessage(...args: any[]): void;
}

export let entry = async (context: Context) => {
    const { isText, text, message } = context.event;
    console.log(context.event);
    if (isText) {
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
