const prettierConfig = {
    singleQuote: true, // 单引号
    printWidth: 120, // 最长长度
    tabWidth: 4, // tab长度
    semi: true, // 分号
    bracketSpacing: true, // 括号空格
    useTabs: false, // 使用tab
    trailingCommas: "always", // 尾逗号
    alwaysParens: "always", // 单行箭头函数的参数添加圆括号
    // requirePragma: true, // 文件头部添加格式化注释
    insertPragma: false, // @format的特殊注释
    functionParenNewline: true,
};

module.exports = prettierConfig;
