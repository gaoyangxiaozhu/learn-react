var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var path = require('path');
var config = require('./config');

module.exports = {
  entry: {
    "treemenu": [
        './scripts/treemenu'
    ],
    checkbox: [
        './scripts/checkbox'
    ],
    "tabpage":[
        './scripts/tabpage'
    ],
    "table":[
        './scripts/table'
    ]
  },
  output: {
    path: config.buildPath,
    filename: '[name].entry.js',
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
  postcss:[autoprefixer()],
  plugins: []
};
