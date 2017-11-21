const path = require('path');

module.exports = {
  entry: {
    app: ['./src/index.js', './css/main.sass'],
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.sass$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] }
    ],
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve('dist'),
  },

  resolve: {
    modules: [
      path.join('src'),
      path.join('node_modules'),
    ],
  },
};
