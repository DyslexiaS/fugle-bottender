import * as util from '../message/util';
import { HELPBTNS } from '../../lib/constants';
import { Button, Message, QuickReply } from '../message/index';

export const smile = async (context: any) => {
    const message = util.smile();
    await context.sendMessage(message);
};

export const greeting = async (context: any) => {
    const { title, buttons } = util.greeting();
    await context.sendButtonTemplate(title, buttons);
};

export const thanks = async (context: any) => {
    const message = util.thanks();
    await context.sendMessage(message);
};

export const help = async (context: any, type: string) => {
    if (type === 'HELP_WATCHLIST') {
        const message = util.helpWatchlist();
        await context.sendMessage(message);
        const quickReplies = Object.keys(HELPBTNS).filter((key) => {
            return key !== 'HELP_WATCHLIST';
        })
        .map((key) => {
            return new QuickReply('text', HELPBTNS[key], key);
        });
        await context.sendMessage(new Message('查詢其他項目:', quickReplies));
    } else if (type === 'HELP_LINKING') {
        const message = util.helpLinking();
        await context.sendMessage(message);
        const quickReplies = Object.keys(HELPBTNS).filter((key) => {
            return key !== 'HELP_LINKING';
        })
        .map((key) => {
            return new QuickReply('text', HELPBTNS[key], key);
        });
        await context.sendMessage(new Message('查詢其他項目:', quickReplies));
    } else if (type === 'HELP_INFO') {
        const message = util.helpInfo();
        await context.sendMessage(message);
        const quickReplies = Object.keys(HELPBTNS).filter((key) => {
            return key !== 'HELP_INFO';
        })
        .map((key) => {
            return new QuickReply('text', HELPBTNS[key], key);
        });
        await context.sendMessage(new Message('查詢其他項目:', quickReplies));
    } else {
        const text = '請問您想瞭解哪部分的功能呢?';
        const quickReplies = Object.keys(HELPBTNS).map((key) => {
            return new QuickReply('text', HELPBTNS[key], key);
        });
        await context.sendMessage(new Message(text, quickReplies));
    }
};

export const notFound = async (context: any) => {
    const { title, buttons } = util.notFound();
    await context.sendButtonTemplate(title, buttons);
};

export const dataNotFound = async (context: any) => {
    const message = util.dataNotFound();
    await context.sendMessage(message);
};
export const groupAlert = async (context: any) => {
    const message = util.groupAlert();
    await context.sendMessage(message);
};
