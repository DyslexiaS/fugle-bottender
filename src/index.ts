const express = require('express');
const bodyParser = require('body-parser');
const { MessengerBot, LineBot, middleware } = require('bottender');
const { registerRoutes } = require('bottender/express');
import * as lineHandler from './line/handler';
import * as messengerHandler from './messenger/handler';
import { typing } from './messenger/middleware/typing_action';
import { fullwidth } from './messenger/middleware/fullwidth';
import { log } from './messenger/middleware/logger';
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
    messenger: new MessengerBot(config.messenger).onEvent(
        middleware([
            typing,
            fullwidth,
            log,
            messengerHandler.entry,
        ])
    ),
    line: new LineBot(config.line).onEvent(lineHandler.entry),
};

registerRoutes(server, bots.messenger, { path: '/messenger', verifyToken: config.messenger.verifyToken });
registerRoutes(server, bots.line, { path: '/line' });

server.listen(4000, () => {
    console.log('server is listening on 4000 port...');
});
