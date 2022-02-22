import webpack from 'webpack';
import merge from 'webpack-merge';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import 'webpack-dev-server';

import commonConfig from './webpack.common';

const devConfig: webpack.Configuration = merge(commonConfig, {
  entry: {
    extensionPanel: path.join(__dirname, '../src/extensionPanel/index.tsx'),
    devtoolsPanel: path.join(__dirname, '../src/devtoolsPanel/index.tsx'),
    background: path.join(__dirname, '../src/chromeService/index.ts'),
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
    new ReactRefreshWebpackPlugin()],
});

export default devConfig;
