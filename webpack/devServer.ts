import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import devConfig from './webpack.dev';

const compiler = Webpack(devConfig);
const devServerOptions = {
  ...devConfig.devServer,
  open: true,
  devMiddleware: {
    writeToDisk: true,
  },
};
const server = new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {
  console.log('Starting server...');
  await server.start();
};

runServer();
