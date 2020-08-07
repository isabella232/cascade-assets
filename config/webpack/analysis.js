process.env.NODE_ENV = process.env.NODE_ENV || 'analysis';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const environment = require('./environment');

environment.plugins.append(
  'BundleAnalyzer',
  new BundleAnalyzerPlugin()
);

environment.plugins.append(
  'MiniCssExtractPlugin',
  new MiniCssExtractPlugin({ filename: 'master-webpack.css' })
);

const config = environment.toWebpackConfig();
config.output.filename = 'master-webpack.js';

module.exports = config;