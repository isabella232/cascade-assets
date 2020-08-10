process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const environment = require('./environment');

environment.plugins.append(
  'MiniCssExtractPlugin',
  new MiniCssExtractPlugin({ filename: 'css/master.css' })
);

const config = environment.toWebpackConfig()
config.output.filename = 'master-webpack.js'

module.exports = config;