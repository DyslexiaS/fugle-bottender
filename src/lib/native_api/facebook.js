const Promise = require('bluebird');
const request = require('request-promise');

const fbMessengerToken = process.env.MESSENGER_ACCESS_TOKEN;
const MAX_CHAR_LENGTH = 300;

function callSendAPI(messageData) {
    return request({
        url: 'https://graph.facebook.com/v3.2/me/messages',
        qs: {
            access_token: fbMessengerToken,
        },
        method: 'POST',
        json: messageData,
    })
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            if ((error.statusCode === 403 || error.statusCode === 400) && error.error) {
                console.log(error.error);
            } else {
                console.error(error);
            }
        });
}

exports.sendText = function(userId, text, quickReplies) {
    var regExp = new RegExp(`(.|[\\r\\n]){1,${MAX_CHAR_LENGTH}}`, 'gi');
    var messages = text.match(regExp);
    return Promise.each(messages, message => {
        var messageData = {
            recipient: {
                id: userId,
            },
            message: {
                text: message,
                quick_replies: quickReplies,
            },
        };
        return callSendAPI(messageData);
    });
};

exports.sendGenericTemplate = function(userId, elements) {
    var messageData = {
        recipient: {
            id: userId,
        },
        message: {
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'generic',
                    elements: elements,
                },
            },
        },
    };
    return callSendAPI(messageData);
};

exports.sendButtonTemplate = function(userId, text, buttons) {
    var messageData = {
        recipient: {
            id: userId,
        },
        message: {
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'button',
                    text: text,
                    buttons: buttons,
                },
            },
        },
    };
    return callSendAPI(messageData);
};

exports.sendAction = function(userId, action) {
    var messageData = {
        recipient: {
            id: userId,
        },
        sender_action: action,
    };
    return callSendAPI(messageData);
};
