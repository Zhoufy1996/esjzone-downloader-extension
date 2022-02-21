module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'airbnb',
        'airbnb-typescript',
        'plugin:react/jsx-runtime'
    ],
    parserOptions: {
        project: './tsconfig.json'
    },
    ignorePatterns: ['.eslintrc.js', 'babel.config.js'],
    rules: {
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true,
            },
        ],
        "react/function-component-definition": ["error", {
            "namedComponents": ["function-declaration" , "function-expression" , "arrow-function"],
            "unnamedComponents":  ["function-expression" , "arrow-function"]
        }]
    }
};