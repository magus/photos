const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = Object.assign({}, common, {
  plugins: [
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
});
