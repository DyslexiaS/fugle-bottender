import { MessengerContext } from 'bottender-types';
const logger = require('../../lib/logger');

export let log = async (context: MessengerContext, next: any) => {
    const { isText, isQuickReply, text, quickReply, message } = context.event;
    /*
    if (event.optin && event.optin.ref) {
        logger.info({
            id: userId,
            timestamp: event.timestamp,
            event: 'optin',
            message: event.optin.ref
        });
    } else if (event.message && event.message.quick_reply) {
        const text = event.message.quick_reply.payload.trim().toUpperCase();
        logger.info({
            id: userId,
            timestamp: event.timestamp,
            event: 'quick',
            message: text
        });
    } else if (event.message && event.message.text) {
        const text = event.message.text.trim().toUpperCase();
        logger.info({
            id: userId,
            timestamp: event.timestamp,
            event: 'message',
            message: text
        });
    } else if (event.message && event.message.sticker_id) {
        logger.info({
            id: userId,
            timestamp: event.timestamp,
            event: 'sticker',
            message: event.message.sticker_id
        });
    } else if (event.postback && event.postback.payload) {
        const text = event.postback.payload.trim().toUpperCase();
        logger.info({
            id: userId,
            timestamp: event.timestamp,
            event: 'postback',
            message: text
        });
    } else if (event.account_linking) {
        const linkStatus = event.account_linking.status;
        logger.info({
            id: userId,
            timestamp: event.timestamp,
            event: 'account_linking',
            message: linkStatus
        });
    } else {
        logger.error(userId, event.timestamp, `Webhook received unknown event: ${JSON.stringify(event)}`);
        console.log('Webhook received unknown event: ', event);
    }
    */
    await next();
};
