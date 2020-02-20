module.exports = async (context, props) => {
    await context.sendChatAction('typing');
    return props.next;
};
