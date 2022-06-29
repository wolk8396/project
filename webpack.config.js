const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: ['./src/index.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new HTMLWebpackPlugin({
            filename: 'sign-in.html',
            template: './src/components/sign-in/sign-in.html'
        }),
        new HTMLWebpackPlugin({
            filename: 'shop.html',
            template: './src/components/shop/main_page/shop.html'
        }),
        new HTMLWebpackPlugin({
            filename: 'basket.html',
            template: './src/components/shop/basket/basket.html'
        }),
        new HTMLWebpackPlugin({
            filename: 'books-information.html',
            template: './src/components/shop/information/books-information.html'
        }),
        new HTMLWebpackPlugin({
            filename: 'sign-up.html',
            template: './src/components/sign-up/sign-up.html'
        }),
        new HTMLWebpackPlugin({
            filename: 'account.html',
            template: './src/components/shop/account/account.html'
        }),
        new HTMLWebpackPlugin({
            filename: 'search.html',
            template: './src/components/shop/search-products/search.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            sources: true
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        static:{
            directory: path.join(__dirname, 'src')
        },
        compress: true,
        port: 4200
    }
};
