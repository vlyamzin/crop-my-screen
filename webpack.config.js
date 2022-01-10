const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = () => {
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'crop-my-screen.js',
      libraryTarget: 'var',
      libraryExport: 'default',
      library: 'CropMyScreen',
      clean: true
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
          ]
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new ESLintPlugin({
        exclude: [
          'node_modules',
          'dist'
        ],
        files: 'src'
      })
    ],
    devServer: {
      port: 8765,
      host: '127.0.0.1',
      static: {
        directory: __dirname,
      },
      devMiddleware: {
        publicPath: '/dist'
      }
    }
  };
};
