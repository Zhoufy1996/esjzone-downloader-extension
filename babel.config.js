const babelConfig = (api) => {
    api.cache(true);
    // 先插件后预设

    // 从后往前
    const presets = [['@babel/preset-react', {
        "runtime": "automatic"
    }], '@babel/preset-typescript'];

    // 从前往后
    const plugins = ['@babel/plugin-proposal-optional-chaining'];
    return {
        presets,
        plugins,
    };
};

module.exports = babelConfig;
