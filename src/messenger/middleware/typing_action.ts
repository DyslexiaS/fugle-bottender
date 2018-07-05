export let typing = async (context: any, next: any) => {
    const { isText, isQuickReply, isPostback } = context.event;
    if (isText || isQuickReply || isPostback) {
        context.typing(600);
    }
    await next();
};
