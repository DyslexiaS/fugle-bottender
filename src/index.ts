const express = require('express');
const bodyParser = require('body-parser');
const { MessengerBot, LineBot } = require('bottender');
const { registerRoutes } = require('bottender/express');
import * as lineHandler from './line/handler';
import * as messengerHandler from './messenger/handler';
const config = require('./bottender.config');

const server = express();

interface MyRequest {
    rawBody: any;
}

server.use(
    bodyParser.json({
        verify: (req: MyRequest, res: Response, buf: Buffer) => {
            req.rawBody = buf.toString();
        },
    })
);

const bots = {
    messenger: new MessengerBot(config.messenger).onEvent(messengerHandler.entry),
    line: new LineBot(config.line).onEvent(lineHandler.entry),
};

registerRoutes(server, bots.messenger, { path: '/messenger', verifyToken: config.messenger.verifyToken });
registerRoutes(server, bots.line, { path: '/line' });

server.listen(4000, () => {
    console.log('server is listening on 4000 port...');
});
