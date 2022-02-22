import webpack from 'webpack';
import merge from 'webpack-merge';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import 'webpack-dev-server';

import commonConfig from './webpack.common';

const devConfig: webpack.Configuration = merge(commonConfig, {
  entry: {
    content: path.join(__dirname, '../src/content/index.tsx'),
    background: path.join(__dirname, '../src/background/index.ts'),
    popup: path.join(__dirname, '../src/popup/index.tsx'),
    devtoolsPanel: path.join(__dirname, '../src/devtoolsPanel/index.tsx'),
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    hot: true,
    port: 5000,
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [require.resolve('react-refresh/babel')],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/popup.html'),
      title: 'popup',
      favicon: path.join(__dirname, '../public/favicon.ico'),
      filename: 'popup.html',
      minify: true,
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/devtoolsPanel.html'),
      title: 'devtoolsPanel',
      favicon: path.join(__dirname, '../public/favicon.ico'),
      filename: 'devtoolsPanel.html',
      minify: true,
      chunks: ['devtoolsPanel'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/content.html'),
      title: 'content',
      favicon: path.join(__dirname, '../public/favicon.ico'),
      filename: 'content.html',
      minify: true,
      chunks: ['content'],
    }),
    new ReactRefreshWebpackPlugin()],
});

export default devConfig;
