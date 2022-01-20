const path = require('path');
const version = require('./package.json').version;
const ESLintPlugin = require('eslint-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const filename = isProduction ? `crop-my-screen.${version}.min.js` : `crop-my-screen.${version}.js`;

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: filename,
      libraryTarget: 'var',
      libraryExport: 'default',
      library: 'CropMyScreen',
      clean: true
    },
    devtool: isProduction ? undefined : 'source-map',
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          extractComments: true,
        }),
      ],
    },
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
        {
          test: /\.svg$/,
          use: ['svg-inline-loader',]
        }
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
