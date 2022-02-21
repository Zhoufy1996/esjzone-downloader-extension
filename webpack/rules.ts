import webpack from 'webpack';
import path from 'path';

/** 处理js ts */

const rules: webpack.RuleSetRule[] = [
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
