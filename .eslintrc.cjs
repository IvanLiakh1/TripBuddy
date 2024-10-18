const config = {
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:unicorn/recommended',
        'plugin:cypress/recommended',
    ],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx'],
            },
            webpack: {
                config: './config/webpack.development.config.js',
            },
        },
        react: {
            version: "detect",
        },
    },
    plugins: ['simple-import-sort', 'react'],
    ignorePatterns: ['node_modules', 'package-lock.json', 'package.json','*.css'],
    rules: {
        'no-unused-vars': 'off',
        'no-undef': 'off',
        'unicorn/prefer-logical-operator-over-ternary': 'off',
        'unicorn/no-null': 'off',
        'unicorn/prefer-module': 'off',
        'unicorn/no-empty-file': 'off',
        'unicorn/prevent-abbreviations': 'off',
        'simple-import-sort/exports': 'error',
        'simple-import-sort/imports': 'error',
        'import/namespace': [2, { allowComputed: true }],
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'unicorn/filename-case': 'off',
        'unicorn/no-process-exit':'off',
        'react/no-unescaped-entities': 'off',
        'react/prop-types': 'off',
        'react/jsx-no-undef': 'off',


    },
    overrides: [
        {
            files: ['*rc.js', '*.config.js'],
            rules: {
                'no-unused-vars': 'off',
                'unicorn/prefer-logical-operator-over-ternary': 'off',
                'unicorn/prefer-module': 'off',
                'unicorn/no-empty-file': 'off',
                'simple-import-sort/exports': 'error',
                'simple-import-sort/imports': 'error',
                'import/namespace': [2, { allowComputed: true }],
                'import/first': 'error',
                'import/newline-after-import': 'error',
            },
        },
    ],
    globals: {
        Cypress: true,
    },
};

module.exports = config;
