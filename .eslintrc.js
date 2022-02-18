module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'airbnb',
        'airbnb-typescript'
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
    }
};