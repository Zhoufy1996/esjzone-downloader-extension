import webpack from 'webpack';
import merge from 'webpack-merge';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import commonConfig from './webpack.common';

const devConfig: webpack.Configuration = merge(commonConfig, {
  entry: {
    extensionPanel: {
      import: path.join(__dirname, '../src/extensionPanel/index.tsx'),
      dependOn: 'shared',
    },
    devtoolsPanel: {
      import: path.join(__dirname, '../src/devtoolsPanel/index.tsx'),
      dependOn: 'shared',
    },
    background: path.join(__dirname, '../src/chromeService/index.ts'),
    shared: ['react', 'react-dom'],
  },
  output: {
    filename: 'static/js/[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  mode: 'production',
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
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
      chunks: ['shared', 'extensionPanel'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/devtoolsPanel.html'),
      title: 'devtoolsPanel',
      favicon: path.join(__dirname, '../public/favicon.ico'),
      filename: 'devtoolsPanel.html',
      minify: true,
      chunks: ['shared', 'devtoolsPanel'],
    }),
    new ReactRefreshWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../public/manifest.json'),
          to: path.join(__dirname, '../dist'),
        },
        {
          from: path.join(__dirname, '../public/logo192.png'),
          to: path.join(__dirname, '../dist'),
        },
        {
          from: path.join(__dirname, '../public/logo512.png'),
          to: path.join(__dirname, '../dist'),
        },
        {
          from: path.join(__dirname, '../public/devtools.html'),
          to: path.join(__dirname, '../dist'),
        },
        {
          from: path.join(__dirname, '../public/devtools.js'),
          to: path.join(__dirname, '../dist'),
        },
      ],
    }),
  ],
});

export default devConfig;
