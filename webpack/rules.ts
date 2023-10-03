import webpack from 'webpack';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

/** 处理 js, ts */

const rules: webpack.RuleSetRule[] = [
  {
    test: /\.css/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: 'css-loader', // translates CSS into CommonJS，遍历 CSS 文件, 然后找到 url() 表达式然后处理他们
        options: {
          sourceMap: true,
        },
      },
    ],
  },
  {
    test: /\.[jt]s$/,
    use: [
      {
        loader: 'babel-loader',
      },
    ],
    exclude: [path.join(process.cwd(), 'node_modules')],
  },
];

export default rules;
