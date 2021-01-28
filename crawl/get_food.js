const uuid = require('uuid');
const Loader = require('./load');

const domain = 'http://www.amthuc365.vn';
const loader = new Loader();

function loadPage(page) {
    const url = `${domain}/cong-thuc/trang-${page}.html`;
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

module.exports = {
    loadAllPage
}