const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra');
// const download = require('download');
var download = require('download-file')

const getFood = require('./crawl/get_food');

// getFood.loadAllPage(1, 570).then(data => {
//     const foods = [];
//     data.forEach(pageData => {
//         pageData.forEach(item => {
//             foods.push(item);
//         });
//     });
//     // console.log(foods.length);
//     fsExtra.writeJSON('./crawl/data/foods.json', foods);
// }).catch(err => {
//     console.log(err);
// });


const foods = require('./crawl/data/foods.json');
// const errors = [];
// foods.forEach((item, index) => {
//     setTimeout(() => {
//         var options = {
//             directory: './crawl/data/images',
//             filename: `${item.id}.jpg`
//         }

//         download(item.img, options, function (err) {
//             if (err) {
//                 console.log('ERROR - ' + item.img);
//                 errors.push(item.img);
//             }
//         })
//     }, Math.ceil(index / 5) * 1000);
// });

// foods.forEach(item => {
//     fsExtra.pathExists(`./crawl/data/images/${item.id}.jpg`).then(data => {
//         if (!data) {
//             var options = {
//                 directory: './crawl/data/images',
//                 filename: `${item.id}.jpg`
//             }

//             download(item.img, options, function (err) {
//                 if (err) {
//                     console.log('ERROR - ' + item.img);
//                 }
//             })
//         }
//     }).catch(err => {
//         console.log(err);
//     })
// })


const getNews = require('./crawl/get_news');

// getNews.loadAllPage(1, 45).then(data => {
//     const foods = [];
//     data.forEach(pageData => {
//         pageData.forEach(item => {
//             foods.push(item);
//         });
//     });
//     // console.log(foods.length);
//     fsExtra.writeJSON('./crawl/data/news.json', foods);
// }).catch(err => {
//     console.log(err);
// });

const news = require('./crawl/data/news.json');
// news.forEach((item, index) => {
//     setTimeout(() => {
//         var options = {
//             directory: './crawl/data/news',
//             filename: `${item.id}.jpg`
//         }

//         download(item.img, options, function (err) {
//             if (err) {
//                 console.log('ERROR - ' + item.img);
//             }
//         })
//     }, Math.ceil(index / 5) * 1000);
// });
// const newsDetails = [];
// news.forEach((item, index) => {
//     setTimeout(() => {
//         getNews.loadNewsDetail(item.url).then((data) => {
//             if (data && data.length) {
//                 newsDetails.push(data);
//                 fsExtra.writeJSON(`./crawl/data/news-details/${item.id}.json`, data);
//                 fsExtra.writeJSON(`./crawl/data/news-details.json`, newsDetails);
//             }
//         });
//     }, Math.ceil(index / 2) * 1200);
// });


const newsDetails = require('./crawl/data/news-details.json');

var countError = 0;
newsDetails.forEach(item => {
    item.forEach((item, index) => {
        if (item.type == 'text' || !item.src) {
            return;
        }
        setTimeout(() => {
            fsExtra.pathExists(`./crawl/data/news/details/${item.id}.jpg`).then(data => {
                if (!data) {
                    var options = {
                        directory: './crawl/data/news/details',
                        filename: `${item.id}.jpg`
                    }

                    download(item.src, options, function (err) {
                        if (err) {
                            countError++;
                            console.log('ERROR - ' + countError + ' - ' + item.src);
                        }
                    })
                }
            }).catch(err => {
                console.log(err);
            });
        }, index * 500);
    });
})