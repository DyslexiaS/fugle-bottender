module.exports = {
    session: {
        driver: 'memory',
        stores: {
            memory: {
                maxSize: 50000,
            },
            file: {
                dirname: '.sessions',
            },
            redis: {
                port: 6379,
                host: '127.0.0.1',
                password: 'auth',
                db: 0,
            },
            mongo: {
                url: 'mongodb://localhost:27017',
                collectionName: 'sessions',
            },
        },
    },
    initialState: {
        user: {},
        watchlist: {},
    },
    channels: {
        messenger: {
            enabled: false,
            path: '/webhooks/messenger',
            pageId: process.env.MESSENGER_PAGE_ID,
            accessToken: process.env.MESSENGER_ACCESS_TOKEN,
            appId: process.env.MESSENGER_APP_ID,
            appSecret: process.env.MESSENGER_APP_SECRET,
            verifyToken: process.env.MESSENGER_VERIFY_TOKEN,
        },
        line: {
            enabled: false,
            path: '/webhooks/line',
            accessToken: process.env.LINE_ACCESS_TOKEN,
            channelSecret: process.env.LINE_CHANNEL_SECRET,
        },
        telegram: {
            enabled: true,
            path: '/webhooks/telegram',
            accessToken: process.env.TELEGRAM_ACCESS_TOKEN,
        },
        slack: {
            enabled: false,
            path: '/webhooks/slack',
            accessToken: process.env.SLACK_ACCESS_TOKEN,
            verificationToken: process.env.SLACK_VERIFICATION_TOKEN,
        },
        viber: {
            enabled: false,
            path: '/webhooks/viber',
            accessToken: process.env.VIBER_ACCESS_TOKEN,
            sender: {
                name: 'xxxx',
            },
        },
    },
};