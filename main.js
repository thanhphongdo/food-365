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
