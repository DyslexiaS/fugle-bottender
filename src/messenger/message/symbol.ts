import { Button, Message, Element } from '.';

/* eslint no-underscore-dangle: 0 */
const _ = require('lodash');
const rp = require('request-promise');
/*
var relations = require('../lib/card_relations');
var fugleApi = require('../lib/api_bridge');
var chartGen = require('../lib/chart/generator');
*/
const config = require('../../config');

/*
function getMappingCardNames(cardSpecIds, limit) {
    var names = cardSpecIds.map((cardSpecId) => {
        return relations[cardSpecId];
    });
    names = _.uniq(_.flatten(names));
    names = names.sort(() => {
        return (Math.round(Math.random()) - 0.5);
    }).slice(0, limit);
    return names;
}
*/

export const defaultInfo = async (complex: any) => {
    const { symbolInfo, summary } = complex;
    const { symbolId, symbolName } = symbolInfo;
    const { url: kchartURL } = await rp(`https://picture.fugle.tw/api/render?s=${symbolId}&c=FCRD000002`, { json: true });
    return [
        new Element({
            title: `${symbolName} (${symbolId}) 近3月價量走勢`,
            image_url: kchartURL,
            buttons: [
                new Button({ type: 'postback', title: '加入自選', payload: 'ADD_TO_WATCHLIST' }),
                new Button({ type: 'web_url', title: '交易', url: `${config.fugleServer}/bot-redirect.html?path=trade&params=${encodeURIComponent(`symbol_id**${symbolId}`)}&t=${(new Date()).getTime()}` }),
                new Button({ type: 'web_url', title: '到Fugle看更多', url: `${config.fugleServer}/ai/${symbolId},kchart` }),
            ],
        })
    ];

/*

    const imageBaseUrl = 'https://s3-ap-northeast-1.amazonaws.com/fugle-bot';
    var nowDate = new Date();
    var ts = nowDate.getTime();

    const attachments = [];
    const textData = {
        text: summary.subtitle,
    };
    // generate k-chart and basicInfo img
    const promises = [
        fugleApi.getData([`FCNT000002?symbol_id=${symbolId}`]).then((data) => {
            return chartGen.genChartAndUploadToS3(JSON.stringify(data[0]), symbolId, {
                botSource: botSource,
                chartType: 'candle',
            });
        }),
    ];
    if ('subtitle' in summary) {
        promises.push(
            chartGen.genChartAndUploadToS3(
                JSON.stringify(textData),
                symbolId,
                {
                    botSource: botSource,
                    chartType: 'basicInfo',
                }
            )
        );
    }

    return Promise.all(promises).then(() => {
        const card = new builder.HeroCard(session)
            .title(`${symbolName} (${symbolId}) 近3月價量走勢`)
            .subtitle('')
            .images([
                builder.CardImage.create(
                    session, `${imageBaseUrl}/candle/${symbolId}.${botSource}.jpg?ts=${ts}`
                ).tap(
                    builder.CardAction.showImage(
                        session,
                        `${imageBaseUrl}/candle/${symbolId}.${botSource}.jpg?ts=${ts}`
                    )
                ),
            ])
            .buttons([
                builder.CardAction.dialogAction(
                    session, 'ADD_TO_WATCHLIST', symbolId, '加入自選'
                ),
                builder.CardAction.openUrl(
                    session, `${config.fugleServer}/bot-redirect.html?path=trade&params=${encodeURIComponent(`symbol_id**${symbolId}`)}&t=${(new Date()).getTime()}`, '交易'
                ),
                builder.CardAction.openUrl(
                    session, `${config.fugleServer}/ai/${symbolId},kchart`, '到Fugle看更多'
                ),
            ]);
        attachments.push(card);
    })
    .then(() => {
        const card = new builder.HeroCard(session)
            .title(summary.title)
            .subtitle('')
            .images([
                builder.CardImage.create(
                    session, `${imageBaseUrl}/basicInfo/${symbolId}.${botSource}.jpg?ts=${ts}`
                ).tap(
                    builder.CardAction.showImage(
                        session,
                        `${imageBaseUrl}/basicInfo/${symbolId}.${botSource}.jpg?ts=${ts}`
                    )
                ),
            ])
            .buttons([
                builder.CardAction.dialogAction(
                    session, 'SEARCH_SYMBOL', `${symbolId} 營收`, '營收'
                ),
                builder.CardAction.dialogAction(
                    session, 'SEARCH_SYMBOL', `${symbolId} 融資融券`, '融資券'
                ),
                builder.CardAction.dialogAction(
                    session, 'SEARCH_SYMBOL', `${symbolId} 法人買賣超`, '法人買賣'
                ),
            ]);
        attachments.push(card);
    })
    .then(() => {
        const resultMsg = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(attachments);
        return resultMsg;
    });
    */
};

/*
export const imageInfo = (session, searchText, cards, botSource) => {
    const symbolIds = [];
    const symbolStrings = [];
    const cardSpecIds = [];
    // eliminate duplicated cards
    cards = cards.filter((card, idx) => {
        let exists = false;
        for (let i = idx + 1; i < cards.length; i++) {
            const compare = cards[i];
            if (card.card_spec_id === compare.card_spec_id && card.symbol_id === compare.symbol_id) {
                exists = true;
            }
        }
        return !exists;
    });

    const resultMsgs = [];
    // images
    cards.forEach((card) => {
        symbolIds.push(card.symbol_id);
        symbolStrings.push(`${card.symbol_name}(${card.symbol_id})`);
        cardSpecIds.push(card.card_spec_id);
        resultMsgs.push(
            new builder.Message(session)
            .attachments([{
                contentType: 'image/jpeg',
                contentUrl: card.chart_path
            }])
        );
    });
    // suffix info
    const moreButtons = getMappingCardNames(cardSpecIds, 2).map((name) => {
        return builder.CardAction.dialogAction(
            session, 'SEARCH_SYMBOL', `${_.uniq(symbolIds).join(',')} ${name}`, name
        );
    });
    const urlQuery = encodeURIComponent(searchText);
    const attachments = [
        new builder.HeroCard(session)
            .title(_.uniq(symbolStrings).join(' '))
            .buttons([
                builder.CardAction.dialogAction(
                    session, 'ADD_TO_WATCHLIST', _.uniq(symbolIds).join(','), '加入自選'
                ),
                builder.CardAction.openUrl(
                    session, `${config.fugleServer}/ai/${urlQuery}`, '到Fugle看更多'
                ),
            ]),
        new builder.HeroCard(session)
            .title('►　您還可以查詢...')
            .buttons(moreButtons),
    ];
    resultMsgs.push(
        new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(attachments)
    );
    return resultMsgs;
}
*/
