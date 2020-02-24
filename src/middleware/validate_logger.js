const logger = require('../lib/logger');
const { handleUnknown } = require('../handler/general');

module.exports = async (context, props) => {
    const {
        isText,
        isSticker,
        isCallbackQuery,
        isMessage,
        text,
        callbackQuery,
        message,
        sticker,
    } = context.event;
    // console.log(isText, isMessage, isSticker, isCallbackQuery);
    // console.log(JSON.stringify(context.event.rawEvent));
    // only allow specific events
    if (!isText && !isMessage && !isSticker && !isCallbackQuery) {
        return handleUnknown(context);
    }
    // extract userId
    let userId = null;
    let timestamp = null;
    if (isMessage) {
        const {
            from: { id: fromId },
            chat: { id: chatId, type: chatType },
            date,
        } = message;
        userId = `telegram-${fromId}`;
        timestamp = new Date(date * 1000);
        if (chatType !== 'private' || fromId !== chatId) {
            await context.sendMessage(
                '不好意思，目前小幫手暫時不支援群組功能，如果您有其他需求, 歡迎輸入【#】告訴我!',
            );
            // end chat
            return;
        }
    } else if (isCallbackQuery) {
        userId = `telegram-${callbackQuery.from.id}`;
        timestamp = new Date();
    }
    // log
    if (isText) {
        const msg = text.trim().toUpperCase();
        logger.info({
            id: userId,
            timestamp,
            event: 'message',
            message: msg,
        });
    } else if (isSticker) {
        logger.info({
            id: userId,
            timestamp,
            event: 'sticker',
            message: sticker.fileUniqueId,
        });
    } else if (isCallbackQuery) {
        const msg = callbackQuery.data.trim().toUpperCase();
        logger.info({
            id: userId,
            timestamp,
            event: 'callbackQuery',
            message: msg,
        });
    } else {
        // console.log('Webhook received other event: ', JSON.stringify(context.event));
    }
    return props.next;
};
