const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => {
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
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        'babel-loader',
                        'eslint-loader'
                    ]
                },
            ],
        },
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
