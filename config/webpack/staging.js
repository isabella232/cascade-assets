const crypto = require('crypto')

process.env.NODE_ENV = process.env.NODE_ENV || 'staging'

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const environment = require('./environment');

var current_date = (new Date()).valueOf().toString();
var randomJs = Math.random().toString();
var randomCss = Math.random().toString();
var hashJs = crypto.createHash('sha1').update(current_date + randomJs).digest('hex');
var hashCss = crypto.createHash('sha1').update(current_date + randomCss).digest('hex');

environment.plugins.append(
  'MiniCssExtractPlugin',
  new MiniCssExtractPlugin({ filename: `master-webpack-${hashCss}.css` })
);

const config = environment.toWebpackConfig();
config.output.filename = `master-webpack-${hashJs}.js`

module.exports = config;