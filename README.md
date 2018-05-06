# Webpack для SPA сайта :<br />
1. npm i : Импортировать необходимые модули.Зависимости указаны в файле package.json
2. создать папку **frontend_archive** (эта папка включена в .gitignore, поэтому не отражается на git)

ЗАГОЛОВОК HTML СТРАНИЦЫ - const titleHTML = 'ЗАГОЛОВОК';

!!! ПРИ ВНЕСЕНИЕ ИЗМЕНЕНИЙ В JS ФАЙЛЫ - ПЕРЕЗАГРУЗИТЬ = npm run devser

# ЗАПУСКАТЬ ТОЛЬКО ЧЕРЕЗ npm run скрипт!

# ![#c5f015](https://placehold.it/15/c5f015/000000) `npm run devser`<br/> http://localhost:8080/webpack-dev-server/ <br/>1. ЗАПУСТИТ webpack-dev-server --inline --hot
# ![#c5f015](https://placehold.it/15/c5f015/000000) `npm run build`<br/> http://127.0.0.1:3000/ <br/> 1. В ПАПКЕ public СОЗДАСТ ФАЙЛЫ С ХЕШОМ В ИМЕНИ <br/> 2. ЗАПУСТИТ node-static
# ![#c5f015](https://placehold.it/15/c5f015/000000) `npm run buildProd`<br/> 1. АРХИВАЦИЯ frontend В frontend_archive <br/>2. МИНИМИЗАЦИЯ css & js ФАЙЛОВ!!!
# ![#c5f015](https://placehold.it/15/c5f015/000000) `npm run prod` <br/> 1.ЗАПУСТИТ node-static С МИНИФИЦИРОВАННЫМИ ФАЙЛАМИ

scripts в package.json:<br />
1. "error": "webpack --display-error-details",
2. "info": "webpack --display-modules",
3. "infov": "webpack --display-modules –v",
4. "time": "webpack --profile --display-modules",
5. "timev": "webpack --profile --display-modules --display-reasons",
6. "devser": "set NODE_ENV=devser&set NODE_ARCH=0&webpack-dev-server --inline --hot",
7. "build": "set NODE_ENV=testser&set NODE_ARCH=0&webpack&node server.js",
8. "buildProd": "node archive-mini.js"
9. "prod": "node prod-server.js"

Плагины:
1. NoErrorsPlugin – не добавляет в сборку файлы с ошибками
2. rimraf - удаляет старые js файлы из папки
3. assetsPlugin - СОЗДАЕТ ФАЙЛ assets.json С ИНФОРМАЦИЕЙ О СБОРКЕ (hesh)
4. HtmlWebpackPlugin - создает index.html файл с подключенным внутри и обновленным app.[hash].js
5. CopyWebpackPlugin - копирует файлы
6. ExtractTextPlugin - создает CSS файл