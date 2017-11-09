const handler = async context => {
    console.log(context.event);
    if (context.event.isText) {
        await context.sendText(`Hello World ${context.event.text}`);
    }
};
  
module.exports = handler;