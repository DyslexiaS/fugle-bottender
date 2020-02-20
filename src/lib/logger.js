const request = require('request-promise');
const Mixpanel = require('mixpanel');

const mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN);

async function log(id, type, timestamp, event, message) {
    try {
        await request({
            method: 'POST',
            uri: `${process.env.FUGLE_API_HOST}/bot/log`,
            body: {
                id,
                type,
                timestamp,
                event,
                message,
            },
            json: true,
        });
        mixpanel.track(`${event.toLowerCase()}.${message.toLowerCase()}`, {
            distinct_id: id,
        });
    } catch (err) {
        console.error(err);
    }
}

function info(params) {
    return log(params.id, 'info', params.timestamp, params.event, params.message);
}

function error(params) {
    return log(params.id, 'error', params.timestamp, params.event, params.message);
}

module.exports = {
    info: info,
    error: error,
};