const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'main.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html')
    }),
    new MiniCssExtractPlugin({
        filename: "style.css",
    }),
    new MomentLocalesPlugin(),
    ],
    module: {
        rules:
            [
                {
                    test: /\.html$/i,
                    loader: "html-loader",
                },
                {
                    test: /\.(c|sa|sc)ss$/i,
                    //use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
                    use: ['style-loader', "css-loader", "sass-loader"]
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.(gif|png|jpe?g|svg)$/i,
                    use: [
                        'file-loader',
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                name: 'img.[hash].[ext]',
                                outputPath: 'images',
                            }
                        }
                    ]
                }

            ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
};