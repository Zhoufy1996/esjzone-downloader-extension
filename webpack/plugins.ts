import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const plugins: webpack.Configuration['plugins'] = [
  new HtmlWebpackPlugin({
    template: path.join(__dirname, '../public/extensionPanel.html'),
    title: 'extensionPanel',
    favicon: path.join(__dirname, '../public/favicon.ico'),
    filename: 'extensionPanel.html',
    minify: true,
  }),
];

export default plugins;
