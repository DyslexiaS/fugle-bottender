const rp = require('request-promise');
const config = require('../config');

const log = async (id: string, type: string, timestamp: string, event: string, message: string) => {
    try {
        const result = await rp({
            method: 'POST',
            uri: `${config.api.host}/bot/log`,
            body: {
                id: id,
                type: type,
                timestamp: timestamp,
                event: event,
                message: message
            },
            json: true
        });
    } catch (err) {
        console.error(err);
    }
};

export const info = async (params: any) => {
    await log(params.id, 'info', params.timestamp, params.event, params.message);
};

export const error = async (params: any) => {
    await log(params.id, 'error', params.timestamp, params.event, params.message);
};
