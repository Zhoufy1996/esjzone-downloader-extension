import webpack from 'webpack';
import merge from 'webpack-merge';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import commonConfig from './webpack.common';

const devConfig: webpack.Configuration = merge(commonConfig, {
  entry: {
    background: {
      import: path.join(__dirname, '../src/background/index.ts'),
    },
    popup: {
      import: path.join(__dirname, '../src/popup/index.tsx'),
      dependOn: 'shared',
    },
    content: {
      import: path.join(__dirname, '../src/content/index.ts'),
    },
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
      template: path.join(__dirname, '../public/popup.html'),
      title: 'popup',
      favicon: path.join(__dirname, '../public/favicon.ico'),
      filename: 'popup.html',
      minify: true,
      chunks: ['shared', 'popup'],
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
      ],
    }),
  ],
});

export default devConfig;
