var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './UI/src/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'public', 'static'),
    filename: 'app.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js|\.jsx$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'UI', 'src')
    },
    { 
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }

	]
}

};
