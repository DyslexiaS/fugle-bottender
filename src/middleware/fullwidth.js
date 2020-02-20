module.exports = async (context, props) => {
    const { isText } = context.event;
    if (isText) {
        let { text } = context.event;
        text = text.replace(/[\uff01-\uff5e]/g, ch => {
            return String.fromCharCode(ch.charCodeAt(0) - 0xfee0);
        });
        text = text.toUpperCase();
    }
    return props.next;
};
