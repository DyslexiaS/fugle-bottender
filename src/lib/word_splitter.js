const _ = require('lodash');
const tokens = require('./token');

let terms = tokens.map(x => {
    return x.terms.map(d => {
        return [d, x.mapTo[0].card_spec_id];
    });
});
terms = _.flatten(terms);
const termsKey = terms.map(x => {
    return x[0];
});
const stopWords = [
    '請告訴',
    '請問',
    '可以嗎',
    '好嗎',
    '請幫我查',
    '幫我查',
    '我想要看',
    '我想看',
    '我',
    '告訴',
    '想要知道',
    '想知道',
    '你知道',
    '想要',
    '嗎',
    '啊',
    '是什麼',
    '是多少',
    '什麼',
    '呀',
];

const extractor = testWord => {
    const hit = [];
    stopWords.forEach(stopWord => {
        testWord = testWord.replace(stopWord, '');
    });
    termsKey.forEach(key => {
        if (testWord.indexOf(`的${key}`) >= 0) {
            hit.push(key);
            testWord = testWord.replace(`的${key}`, '');
        }
        if (testWord.indexOf(key) >= 0) {
            hit.push(key);
            testWord = testWord.replace(key, '');
        }
    });
    return {
        remain: testWord,
        types: hit,
    };
};

if (require.main === module) {
    extractor('我想知道台積電EPS');
    extractor('告訴我台積電的EPS');
    extractor('我想知道台積電營收');
    extractor('告訴我台積電董事長');
    extractor('告訴我台積電地址');
    extractor('台積電的地址');
}

module.exports = {
    extractor,
};
