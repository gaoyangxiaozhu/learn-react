var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var path = require('path');
var config = require('./config');
module.exports = {
  entry: {
    'treemenu': [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/dev-server',
      './scripts/treemenu.jsx'
    ]
  },
  output: {
    path: path.resolve(config.buildPath, 'build'),
    filename: '[name].entry.js',
    publicPath: '/scripts/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loaders: ['react-hot', 'babel?presets[]=react&presets[]=es2015'],
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
