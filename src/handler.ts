interface Context {
    event: any;
    sendText(...args: any[]): void;
}

export let entry = async (context: Context) => {
    console.log(context.event);
    if (context.event.isText) {
        await context.sendText(`Hello World ${context.event.text}`);
    }
};
