const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = Object.assign({}, common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
});
