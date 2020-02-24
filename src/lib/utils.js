// source: telegram, line...
// userId: source + the id assigned by the source (the uniq id stored in our db)
const getSourceAndUserId = context => {
    let source;
    let userId;
    let userName;
    const { platform, event } = context;
    const { isCallbackQuery, isMessage, callbackQuery } = event;
    if (platform === 'telegram') {
        let message;
        if (isMessage) {
            message = event.message;
        } else if (isCallbackQuery) {
            message = callbackQuery;
        }
        const {
            from: { id: fromId, firstName, lastName },
        } = message;
        source = platform;
        userId = `${platform}-${fromId}`;
        userName = `${firstName}${lastName}`;
    } else {
        // not supported yet
    }
    return {
        source,
        userId,
        userName,
    };
};

module.exports = {
    getSourceAndUserId,
};
