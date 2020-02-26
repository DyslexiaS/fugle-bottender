const rp = require('request-promise');
const Promise = require('bluebird');
const phantom = require('phantom');
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
const crypto = require('crypto');

function md5(data) {
    return crypto
        .createHash('md5')
        .update(data)
        .digest('hex');
}

async function genChart(html, symbolId, fileHash, chartOptions) {
    const { botSource, chartType, chartWidth, chartHeight } = chartOptions;
    const dirName = `${__dirname}/${chartType}`;
    let instance;
    try {
        instance = await phantom.create();
        let page = await instance.createPage();
        page = await page
            .property('viewportSize', {
                width: chartWidth,
                height: chartHeight,
            })
            .then(() => {
                return page;
            });
        await page.open(`${dirName}/index.temp.${symbolId}.${botSource}.html`);
        await page.property('content');
        await page.render(`${symbolId}-${fileHash}.${chartType}.${botSource}.jpg`, {
            format: 'jpeg',
            quality: '100',
        });
        page.close();
        instance.exit();
    } catch (error) {
        console.log(error);
        instance.exit();
    }
}

function uploadPromise(symbolId, fileHash, chartOptions) {
    const { botSource, chartType } = chartOptions;
    const buffer = fs.readFileSync(`${symbolId}-${fileHash}.${chartType}.${botSource}.jpg`);
    const bucketName = process.env.S3_BUCKET;
    const objectParams = {
        Bucket: bucketName,
        Key: `${chartType}/${symbolId}.${botSource}.jpg`,
        ACL: 'public-read',
        Body: buffer,
    };
    return new S3({
        apiVersion: '2006-03-01',
    })
        .putObject(objectParams)
        .promise()
        .then(() => {
            return `https://s3-ap-northeast-1.amazonaws.com/${bucketName}/${chartType}/${symbolId}.${botSource}.jpg`;
        });
}

// chartType: revenue
async function genChartAndUploadToS3(jsonString, symbolId, chartOptions) {
    const { botSource, chartType } = chartOptions;
    if (!chartOptions.chartType || !chartOptions.botSource) {
        console.log('Chart type or bot source is not specified!');
        return Promise.resolve();
    }
    // check width & height params
    const { chartWidth, chartHeight } = chartOptions;
    chartOptions = Object.assign(chartOptions, {
        chartWidth: chartWidth || (botSource === 'facebook' ? 600 : 474),
        chartHeight: chartHeight || 314,
    });
    const fileHash = md5(jsonString);
    const filename = `${symbolId}-${fileHash}.${chartType}.${botSource}.jpg`;
    try {
        fs.statSync(filename);
        console.log(`${filename} file exists.`);
        return Promise.resolve(true);
    } catch (e) {
        console.log(`${filename} file does not exist.`);
    }
    const dirName = `${__dirname}/${chartType}`;
    const indexhtml = fs
        .readFileSync(`${dirName}/index.html`)
        .toString()
        .replace('{rawdata}', jsonString);
    try {
        fs.writeFileSync(`${dirName}/index.temp.${symbolId}.${botSource}.html`, indexhtml, 'utf-8');
        await genChart(indexhtml, symbolId, fileHash, chartOptions);
        await uploadPromise(symbolId, fileHash, chartOptions);
    } catch (err) {
        console.log(err);
    } finally {
        fs.unlinkSync(`${dirName}/index.temp.${symbolId}.${botSource}.html`);
    }
}

if (require.main === module) {
    const symbolId = '2330';
    rp(`https://www.fugle.tw/api/v1/data/new_content/FCNT000006?symbol_id=${symbolId}`)
        .then(jsonContent => {
            genChartAndUploadToS3(jsonContent, symbolId, {
                botSource: 'facebook',
                chartType: 'revenue',
            });
        })
        .then(() => {
            return rp(
                `https://www.fugle.tw/api/v1/data/new_content/FCNT000006?symbol_id=${symbolId}`,
            );
        })
        .then(jsonContent => {
            genChartAndUploadToS3(jsonContent, symbolId, {
                botSource: 'line',
                chartType: 'revenue',
            });
        })
        .then(() => {
            console.log('done');
        });
}

module.exports = {
    genChartAndUploadToS3,
};
