import { LineContext } from 'bottender-types';

export let entry = async (context: LineContext) => {
    console.log(context.event);
    if (context.event.isText) {
        await context.sendText(`Hello World ${context.event.text}`);
    }
};
