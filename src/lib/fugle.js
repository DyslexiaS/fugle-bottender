const rp = require('request-promise');

async function getSymbolNames(symbolIds) {
    const options = {
        method: 'POST',
        uri: `${process.env.FUGLE_API_HOST}/data/symbols/names`,
        body: { symbolIds },
        json: true,
    };
    return rp(options);
}

/* get user info by symbolIds (which in user's notification-enabled watchlist) */
function getUserIdsBySymbolIds(symbolIds) {
    return rp({
        uri: `${process.env.FUGLE_API_HOST}/bot/users-by-symbols`,
        method: 'POST',
        body: {
            symbolIds,
        },
        json: true,
        encoding: null,
        timeout: 20000,
    })
        .then((results) => {
            return results; // [{ id, address, symbols }]
        })
        .catch((err) => {
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
        .then((results) => {
            return results; // [{ id, channel_id }]
        })
        .catch((err) => {
            console.log(err);
            return [];
        });
}

module.exports = {
    getSymbolNames,
    getUserIdsBySymbolIds,
    getUser,
    getAllUsers,
};
