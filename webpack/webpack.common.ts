import webpack from 'webpack';
import rules from './rules';
import plugins from './plugins';

const commonConfig: webpack.Configuration = {
    module: {
        rules,
    },
    plugins,
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
};

export default commonConfig;
