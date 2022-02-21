import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

const plugins: webpack.Configuration['plugins'] = [
  new HtmlWebpackPlugin({
    template: path.join(__dirname, '../public/extensionPanel.html'),
    title: 'extensionPanel',
    favicon: path.join(__dirname, '../public/favicon.ico'),
    filename: 'extensionPanel.html',
    minify: true,
    chunks: ['extensionPanel'],
  }),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, '../public/devtoolsPanel.html'),
    title: 'devtoolsPanel',
    favicon: path.join(__dirname, '../public/favicon.ico'),
    filename: 'devtoolsPanel.html',
    minify: true,
    chunks: ['devtoolsPanel'],
  }),
  new ESLintPlugin(),
];

export default plugins;
