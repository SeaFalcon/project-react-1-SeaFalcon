const path = require('path');

module.exports = {
  entry: {
    index: path.resolve(__dirname, './src/index.jsx'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: {
      index: 'index.html',
    },
  },
};
