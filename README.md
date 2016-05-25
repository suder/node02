```chef
node app.js ru
```

Вернёт */ru.html*

Кусок за это отвечающий:

```javascript
...
if (process.argv[2] == 'en' || process.argv[2] == 'ru') {
        page = process.argv[2] + '.html';
    }
...
```

Если ничего не указано в параметрах, или укажано не *ru | en*, то выдаём в зависимости от локали.

```javascript
...
if (process.env.LANG != "ru_RU.UTF-8"){
        page = 'en.html';
    }
...
```

... точнее, если она отлична от *ru_RU.UTF-8*, то выдаём *en.html*