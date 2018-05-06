'use strict';
const NODE_ENV = process.env.NODE_ENV || 'devser';
const NODE_ARCH = process.env.NODE_ARCH || 0;

const webpack = require('webpack');
//assetsPlugin - СОЗДАЕТ ФАЙЛ assets.json С ИНФОРМАЦИЕЙ О СБОРКЕ (hesh)
const assetsPlugin = require('assets-webpack-plugin');
const rimraf = require('rimraf'); //УДАЛЯЕТ СТАРЫЕ JS ФАЙЛЫ ИЗ ПАПКИ
//HtmlWebpackPlugin - СОЗДАЕТ ФАЙЛ /index.html С ОБНОВЛЕННЫМ ПОДКЛЮЧЕННЫМ ФАЙЛОМ app.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");//СОЗДАЕТ CSS ФАЙЛ

// const JavaScriptObfuscator = require("webpack-obfuscator"); //ШИФРУЕТ КОД

const titleHTML = 'ЗАГОЛОВОК';

if (NODE_ENV == 'devser') {
  module.exports = {
    context: __dirname + '/frontend',

    entry: {  // --inline --hot
      main: './main'
    },

    output: {
      path:       __dirname + '/public',
      publicPath: '/',
      filename:   '[name].js'
    },

    module: {
      loaders: [{
        test:    /\.js$/,
        exclude: /node_modules/,
        include: __dirname + '/frontend',
        loader:  "babel?presets[]=es2015"
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test:   /\.jade$/,
        loader: "jade"
      }, {
        test:   /\.styl$/,
        loader: ExtractTextPlugin.extract('style', 'css!stylus?resolve url')
      }, {
        test:   /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
        loader: 'file?name=[path][name].[ext]?[hash]'
      }],
      // noParse:  wrapRegexp(/\/node_modules\/(angular\/angular)/, 'noParse')
    },

    plugins: [
      new ExtractTextPlugin('[name].css', {allChunks: true, disable: false})
    ],

    devServer: {
      contentBase: __dirname + '/backend',
      hot: true
    }
  };
}else if (NODE_ENV == 'testser'){
  module.exports = {
    context: __dirname + '/frontend',

    entry: {
      app: './main'
    },

    output: {
      path:     __dirname + '/public',
      publicPath: '/',  //   /js/app.js
      filename: "[name][chunkhash].js"
    },

    module: {
      loaders: [{
        test:    /\.js$/,
        exclude: /node_modules/,
        include: __dirname + '/frontend',
        loader:  "babel?presets[]=es2015"
      },{
        test: /\.json$/,
        loader: 'json-loader'
      },{
        test:   /\.jade$/,
        loader: "jade"
      }, {
        test:   /\.styl$/,
        loader: ExtractTextPlugin.extract('style', 'css!stylus?resolve url'),
      }, {
        test:   /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
        loader: 'file?name=[path][name][hash:6].[ext]'
      }]
    },

    plugins: [
      {
        apply: (compiler) => {
          rimraf.sync(compiler.options.output.path);
        }
      },
      new ExtractTextPlugin('[name][contenthash].css', {allChunks: true, disable: false}),
      new webpack.NoErrorsPlugin(),
      new assetsPlugin ({
        filename: 'assets.json',
        path: __dirname + '/public'
      }),
      new HtmlWebpackPlugin({title: titleHTML}),
      
    ],
  };
};