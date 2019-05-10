var webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
var copyWebpackPlugin = require('copy-webpack-plugin');
const baseConfig = require('../../../webpack/webpack.base.js');
var GlobalizePlugin = require('globalize-webpack-plugin');
var production = process.env.NODE_ENV === 'production';

module.exports = merge(baseConfig, {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './example/main.ts'
  ],
  output: {
    publicPath: '/assets/',
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: './example'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new copyWebpackPlugin([
      {
        from:
          '../../node_modules/@angular/material/prebuilt-themes/indigo-pink.css'
      }
    ]),
    new GlobalizePlugin({
      production: production,
      developmentLocale: 'en',
      supportedLocales: ['de', 'en'],
      messages: 'messages/[locale].json',
      output: 'i18n/[locale].[chunkhash].js'
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader?exportAsEs6Default'
      }
    ]
  },
  resolve: {
    // manually link to angular path in case of dev
    modules: [
      path.resolve(__dirname, '../../angular/node_modules'),
      'node_modules'
    ],
    alias: {
      cldr$: 'cldrjs',
      cldr: 'cldrjs/dist/cldr'
    }
  }
});
