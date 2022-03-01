import webpack from 'webpack';
import ESLintPlugin from 'eslint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const plugins: webpack.Configuration['plugins'] = [
  new ESLintPlugin(),
  new MiniCssExtractPlugin({
    filename: 'static/css/[name].css',
  }),
];

export default plugins;
