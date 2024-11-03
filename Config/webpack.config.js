import path from 'node:path';
import { fileURLToPath } from 'node:url';

import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'app.js',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../templates/index.html'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-syntax-jsx'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        fallback: {
            crypto: 'crypto-browserify',
            vm: 'vm-browserify',
            stream: 'stream-browserify',
            assert: 'assert',
            buffer: 'buffer',
            process: 'process/browser',
        },
    },
    devServer: {
        historyApiFallback: true,
        open: true,
    },
};

export default config;
