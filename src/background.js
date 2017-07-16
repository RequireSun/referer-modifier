import * as CONFIG from './CONFIG.json';

chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
    let userSettings;
    try {
        userSettings = JSON.parse(localStorage.getItem(CONFIG['storage_key']) || '{}') || {};
    } catch (ex) {
        userSettings = {};
    }

    if (userSettings['enabled']) {
        chrome.browserAction.setIcon({
            path: 'image/logo-run.png',
        });
    } else {
        chrome.browserAction.setIcon({
            path: 'image/logo.png',
        });
    }

    if (userSettings['enabled'] && userSettings['rules'] && userSettings['rules'].length) {
        let url = details.url;
        let headers = details.requestHeaders;

        return modifyHeader(headers, url, userSettings['rules']);
    }
}, {
    urls : ["<all_urls>"]
}, ["requestHeaders", "blocking"]);

function modifyHeader(_headers, _url, userSettings) {
    const blockingResponse = {};

    for (let i = 0, item; item = userSettings[i]; ++i) {
        if (item['enabled'] && 'change_referrer' === item['behavior'] && new RegExp(item['regex']).test(_url)) {
            let modified = false;

            _headers.forEach(function (it) {
                if ('Referer' === it['name']) {
                    it['value'] = item['content'];
                    modified = true;
                }
            });
            if (!modified) {
                _headers.push({
                    name: 'Referer',
                    value: item['content'],
                });
            }
            break;
        }
    }

    blockingResponse.requestHeaders = _headers;
    return blockingResponse;

    // var isXForward = false;
    // var isReferer = false;
    // var isUserAgent = false;
    //
    // var cfg = {
    //     randomIp: true,
    //     referer: 'https://qs.888.qq.com',
    //     userAgent: false,
    // };

    // _headers.forEach(function (item) {
    //     if ('X-Forward-For' === item['name'] && cfg['randomIp']) {
    //         item['value'] = [0, 0, 0, 0].map(function () {
    //             return Math.floor(Math.random() * 255);
    //         }).join('.');
    //
    //         isXForward = true;
    //     }
    //     if ('Referer' === item['name'] && cfg['referer']) {
    //         item['value'] = cfg['referer'];
    //
    //         isReferer = true;
    //     }
    //     if('User-Agent' === item['name'] && cfg['userAgent']){
    //         item['value'] = cfg['userAgent'];
    //
    //         isUserAgent = true;
    //     }
    // });
    //
    // if (!isXForward && cfg['randomIp']) {
    //     _headers.push({
    //         name: 'X-Forwarded-For',
    //         value: [0, 0, 0, 0].map(function () {
    //             return Math.floor(Math.random() * 255);
    //         }).join('.'),
    //     });
    //
    //     isXForward = true;
    // }
    // if (!isReferer && cfg['referer']) {
    //     _headers.push({
    //         name: 'Referer',
    //         value: cfg['referer'],
    //     });
    //
    //     isReferer = true;
    // }
    // if (!isUserAgent && cfg['userAgent']) {
    //     _headers['User-Agent'] = cfg['userAgent'];
    //
    //     isUserAgent = true;
    // }
}