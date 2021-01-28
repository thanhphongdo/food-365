
const request = require('request-promise');
const Promise = require('bluebird');
const Cheerio = require('cheerio');
module.exports = class Load {
    loadHTMLByGet(url) {
        return request(url, {});
    }
    load(url) {
        return this.loadHTMLByGet(url).then(res => {
            return Cheerio.load(res);
        }).catch(err => {
            return Promise.reject(err);
        });
    }
    loadResponse(url) {
        return this.loadHTMLByGet(url).then(res => {
            return res;
        }).catch(err => {
            return Promise.reject(err);
        });
    }
}