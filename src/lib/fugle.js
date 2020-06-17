const rp = require('request-promise');
const _ = require('lodash');

async function getContents(contentIds) {
    const options = {
        method: 'POST',
        uri: `${process.env.FUGLE_API_HOST}/data/new_contents`,
        body: { contentIds },
        json: true,
    };
    return rp(options).then(results => {
        return _.flatten(results);
    });
}

async function getSymbolNames(symbolIds) {
    const options = {
        method: 'POST',
        uri: `${process.env.FUGLE_API_HOST}/data/symbol_names`,
        body: { symbolIds },
        json: true,
    };
    return rp(options);
}

/* get user info by symbolIds (which in user's notification-enabled watchlist) */
function getUserIdsBySymbolIds(symbolIds) {
    return rp({
        uri: `${process.env.FUGLE_API_HOST}/bot/users_by_symbols`,
        method: 'POST',
        body: {
            symbolIds,
        },
        json: true,
        encoding: null,
        timeout: 20000,
    })
        .then(results => {
            return results; // [{ id, address, symbols }]
        })
        .catch(err => {
            console.log(err);
            return [];
        });
}

async function getUser(userId) {
    try {
        return rp({
            uri: `${process.env.FUGLE_API_HOST}/bot/user?userId=${userId}`,
            method: 'GET',
            json: true,
            encoding: null,
            timeout: 60000,
        });
    } catch (e) {
        return null;
    }
}

async function getAllUsers(channel) {
    return rp({
        uri: `${process.env.FUGLE_API_HOST}/bot/users?channel=${channel}`,
        method: 'GET',
        json: true,
        encoding: null,
        timeout: 60000,
    })
        .then(results => {
            return results; // [{ id, channel_id }]
        })
        .catch(err => {
            console.log(err);
            return [];
        });
}

async function isMarketOpen(date) {
    return rp({
        uri: `${process.env.FUGLE_API_HOST}/market/is_open?date=${date}`,
        method: 'GET',
        json: true,
        encoding: null,
        timeout: 60000,
    })
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
            return {};
        });
}

async function getNotifyWatchlists(userId) {
    return rp({
        uri: `${process.env.FUGLE_API_HOST}/bot/notify_watchlists`,
        method: 'GET',
        qs: {
            userId: userId,
        },
        json: true,
        encoding: null,
        timeout: 30000,
    });
}

module.exports = {
    getContents,
    getSymbolNames,
    getUserIdsBySymbolIds,
    getUser,
    getAllUsers,
    isMarketOpen,
    getNotifyWatchlists,
};
