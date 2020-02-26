const rp = require('request-promise');

const send = async (method, body) => {
    try {
        const res = await rp({
            uri: `https://api.telegram.org/bot${process.env.TELEGRAM_ACCESS_TOKEN}/${method}`,
            method: 'POST',
            body,
            json: true,
        });
        console.log({ ...res, result: 'skipped' });
    } catch (error) {
        console.log(error.error || error);
    }
};

const sendMessage = async params => {
    console.log(params);
    await send('sendMessage', params);
};

const sendPhoto = async params => {
    await send('sendPhoto', params);
};

module.exports = {
    send,
    sendMessage,
    sendPhoto,
};
