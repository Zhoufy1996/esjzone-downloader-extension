import webpack from 'webpack';
import path from 'path';

/** 处理js ts */

const rules: webpack.RuleSetRule[] = [
  {
    test: /\.(j|t)s(x?)$/,
    use: [
      {
        loader: 'eslint-loader',
        options: {
          // fix: true,
          emitError: true,
          emitWarning: true,
        },
      },
    ],
    enforce: 'pre',
    exclude: [path.join(process.cwd(), 'node_modules')],
  },
  {
    test: /\.ts(x?)$/,
    use: [
      {
        loader: 'babel-loader',
      },
    ],
    exclude: [path.join(process.cwd(), 'node_modules')],
  },
];

export default rules;
