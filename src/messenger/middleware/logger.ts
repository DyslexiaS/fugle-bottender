const logger = require('../../lib/logger');

export let log = async (context: any, next: any) => {
    const {
        isText, isQuickReply, isOptin, isSticker, isPostback,
        text, quickReply, postback,
        message, rawEvent,
    } = context.event;
    const { sender: { id: fbUserID }, timestamp } = rawEvent;
    const userID = `facebook-${fbUserID}`;
    if (isOptin) {
        logger.info({
            id: userID,
            timestamp: timestamp,
            event: 'optin',
            message: rawEvent.optin.ref
        });
    } else if (isQuickReply) {
        const msg = quickReply.payload.trim().toUpperCase();
        logger.info({
            id: userID,
            timestamp: timestamp,
            event: 'quick',
            message: msg
        });
    } else if (isText) {
        const msg = text.trim().toUpperCase();
        logger.info({
            id: userID,
            timestamp: timestamp,
            event: 'message',
            message: msg
        });
    } else if (isSticker) {
        logger.info({
            id: userID,
            timestamp: timestamp,
            event: 'sticker',
            message: message.sticker_id
        });
    } else if (isPostback) {
        const msg = postback.payload.trim().toUpperCase();
        logger.info({
            id: userID,
            timestamp: timestamp,
            event: 'postback',
            message: msg
        });
    } else if (rawEvent.account_linking) {
        const linkStatus = rawEvent.account_linking.status;
        logger.info({
            id: userID,
            timestamp: timestamp,
            event: 'account_linking',
            message: linkStatus
        });
    } else {
        // console.log('Webhook received other event: ', JSON.stringify(context.event));
    }
    await next();
};
