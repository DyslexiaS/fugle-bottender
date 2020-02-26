const request = require('request-promise');

function send(to, messages) {
    return request({
        uri: `${process.env.LINE_PUSH_URI}`,
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
        },
        body: {
            to,
            messages,
        },
        json: true,
    }).catch(error => {
        console.log(error.error || error);
    });
}

module.exports = {
    send,
};
