"use strict";

const http = require("http");
const fs = require('fs');
const url = require("url");
const path = require('path');

let mimeTypes = {
    '.js': 'text/javascript',
    '.html': 'text/html',
    '.css': 'text/css',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
};

let page = 'ru.html'; // По умолчанию индексная страница

http.createServer(function onRequest(request, response) {

    /* Если локаль не ru_RU, то индексная страница: en.html */
    if (process.env.LANG != "ru_RU.UTF-8") {
        page = 'en.html';
    }

    let pathname = url.parse(request.url).pathname;


    /* Если передали в качестве доп. параметра при вызове сервера en | ru */
    if (process.argv[2] == 'en' || process.argv[2] == 'ru') {
        page = process.argv[2] + '.html';
    }

    if (pathname == '/') {
        pathname = '/' + page;
    }

    pathname = pathname.substring(1, pathname.length);

    let extname = path.extname(pathname);
    let mimeType = mimeTypes[extname];

    console.log(`Запрос: ${pathname}`);

    if (extname == ".jpg" || extname == ".png") {
        let img = fs.readFileSync('app/' + pathname);
        response.writeHead(200, {
            'ContentType': mimeType
        });
        response.end(img, 'binary');
    } else {
        fs.readFile('app/' + pathname, 'utf-8', (err, data) => {
            if (err) {
                console.log(`Не могу прочитать: ${pathname}`);
            } else {
                //console.log(path.extname(pathname));
                response.writeHead(200, {
                    'Content-Type': mimeType
                });

                response.end(data);
            }
        })
    }
}).listen(8888);