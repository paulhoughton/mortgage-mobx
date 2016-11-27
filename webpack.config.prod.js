var webpack = require('webpack');

module.exports = {
  entry: [
    './src/index'
  ],
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      }
    }
    )
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader'
        },
      ]
    }, {
      test: /\.scss?$/,
      use: [
        { loader : 'style-loader'},
        { loader : 'css-loader' },
        { loader : 'sass-loader' }
      ]
    }]
  }
};

