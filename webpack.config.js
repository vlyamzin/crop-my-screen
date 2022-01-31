const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = () => {
  const rest = {
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
    ]
  };

  return [
    {
      entry: {
        'crop-my-screen': './src/index.js',
      },
      optimization: {
        minimize: false
      },
      output: {
        library: {
          type: 'umd'
        },
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'umd',
        clean: true
      },
      ...rest
    },
    {
      entry: {
        'crop-my-screen.min': './src/index.js'
      },
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: {
          name: 'CropMyScreen',
          type: 'var',
          export: 'default'
        },
      },
      optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
          include: /\.min\.js$/
        })],
      },
      ...rest
    }
  ];
};
