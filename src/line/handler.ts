export let entry = async (context: any) => {
    console.log(context.event);
    if (context.event.isText) {
        await context.sendText(`Hello World ${context.event.text}`);
    }
};
