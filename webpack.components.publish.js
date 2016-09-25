var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var path = require('path');
var config = require('./config');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
  entry: {
    AsTreeMenu: [
      './scripts/components/AsTreeMenu/index'
    ]
  },
  output: {
    path: path.join(config.buildPath, 'components'),
    filename: '[name].webpack.js',
    publicPath: '/scripts/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel?presets[]=react&presets[]=es2015',
      include: [path.join(__dirname, 'scripts')]
    }, {
      test: /\.scss$/,
      loader: 'style!css!postcss!sass'
    }, {
      test: /\.css$/,
      loader: 'style!css!postcss'
    }]
  },
  postcss: [autoprefixer()],
  plugins: [commonsPlugin]
};
