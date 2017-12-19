import { intentMatch, quickReplyMatch } from '../../lib/intent';
import { MessengerContext } from 'bottender-types';

export let typing = async (context: MessengerContext, next: any) => {
    const { isText, isQuickReply, isPostback } = context.event;
    if (isText || isQuickReply || isPostback) {
        context.typing(600);
    }
    await next();
};
