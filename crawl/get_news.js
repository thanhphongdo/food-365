const uuid = require('uuid');
const Loader = require('./load');

const domain = 'http://www.amthuc365.vn';
const loader = new Loader();

function loadPage(page) {
    const url = `${domain}/che-bien-mon-ngon.html&page=${page}`;
    return loader.load(url).then($ => {
        const foods = [];
        $('.it-new_bottom').each((index, item) => {
            let food = {
                id: uuid.v4()
            };
            food.url = domain + $(item).find('.it-img_bottom').find('a').attr('href');
            food.img = $(item).find('.it-img_bottom').find('img').attr('src');
            food.title = $(item).find('.it-body_bottom').find('h3').text().trim();
            food.content = $(item).find('.it-body_bottom').find('p').text().trim();
            foods.push(food);
        });
        return foods;
    }).error(err => {
        console.log(err);
    });
}

function loadGroupPage(fromPage, toPage) {
    const loadPromise = [];
    for (let page = fromPage; page < toPage; page++) {
        loadPromise.push(loadPage(page));
    }
    return Promise.all(loadPromise);
}

var foods = [];
function loadAllPage(page, maxPage) {
    if (!page) {
        page = 1;
    }
    return loadGroupPage(page, page + 10).then(data => {
        console.log(`${page} - ${page + 10}`);
        data.forEach(item => {
            foods.push(item);
        })
        page = page + 10;
        if (page >= maxPage) {
            return foods;
        } else {
            return loadAllPage(page, maxPage);
        }
    });
}

function loadNewsDetail(url) {
    const data = [];
    // `${domain}/${url}`
    return loader.load(url).then($ => {
        data.push({
            type: 'text',
            html: `<div>${$('.intro').html()}</div>`
        });
        // let content = $('.tinimce-content__new');
        // if(content.children().length == 1){
        //     content = $('.tinimce-content__new').children().first();
        // }
        let content = [];
        let contentEle = $('.tinimce-content__new');
        for (var i = 0; i < 3; i++) {
            if (contentEle.children().length == 1 && contentEle.children().first().prop('tagName') == 'DIV') {
                contentEle = contentEle.children().first();
            }
        }
        if (contentEle.find('table').length) {
            return [];
        }
        contentEle.children().each((index, item) => {
            if ($(item).prop('tagName') == 'DIV') {
                if (!$(item).children().length || $(item).children().length == 1) {
                    content.push(item);
                } else {
                    $(item).children().each((index, item) => {
                        content.push(item);
                    });
                }
            } else {
                content.push(item);
            }
        });
        content.forEach((item, index) => {
            if ($(item).html().indexOf('img') >= 0) {
                data.push({
                    type: 'image',
                    src: $(item).find('img').attr('src')
                })
            } else {
                data.push({
                    type: 'text',
                    html: `<${$(item).prop('tagName').toLowerCase()}>${$(item).html()}</${$(item).prop('tagName').toLowerCase()}>`
                })
            }
        });
        const groupHtml = [];
        data.forEach(item => {
            if (item.type == 'text') {
                let currentItem = groupHtml[groupHtml.length - 1];
                if (!currentItem || currentItem.type != 'text') {
                    currentItem = {
                        type: 'text',
                        html: ''
                    }
                    groupHtml.push(currentItem);
                }
                currentItem.html += item.html;
            }
            if (item.type == 'image') {
                let currentItem = {
                    id: uuid.v4(),
                    type: 'image',
                    src: item.src
                }
                groupHtml.push(currentItem);
            }
        });
        return groupHtml;
    }).error(err => {
        console.log(err);
    });
}

// loadNewsDetail();

module.exports = {
    loadAllPage,
    loadNewsDetail
}