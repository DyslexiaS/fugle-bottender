import { MessengerContext } from 'bottender-types';

export let fullwidth = async (context: MessengerContext, next: any) => {
    const { isText } = context.event;
    let { text } = context.event;
    if (isText) {
        text = text.replace(/[\uff01-\uff5e]/g, (ch: string) => {
            return String.fromCharCode(ch.charCodeAt(0) - 0xfee0);
        });
        text = text.toUpperCase();
    }
    await next();
};
