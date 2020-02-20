// const util = require('../lib/message/util');
const { withProps } = require('bottender');
const { handleHelp } = require('./general');

const handleTelegramCallbackQuery = async (context, props) => {
    const { data: queryData } = context.event.callbackQuery;
    if (queryData.match(/^HELP/i)) {
        const data = queryData.match(/^HELP_(.+)$/i);
        return withProps(handleHelp, { data: data && data.length ? data[1] : null });
    }
};

module.exports = {
    handleTelegramCallbackQuery,
};
