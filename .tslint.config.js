'use strict';

const path = require ('path');
const eslintConfig = require('./.eslint.config.js');

module.exports = {
    ...eslintConfig,

    parser: '@typescript-eslint/parser',
    extends: [
        ...eslintConfig.extends,
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ],
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname
    },
    plugins: [
        'react',
        'mocha',
        '@typescript-eslint'
    ],
    rules: {
        ...eslintConfig.rules,

        '@typescript-eslint/no-use-before-define': [
            'error',
            {
                'functions': false
            }
        ],
        '@typescript-eslint/no-misused-promises': [
            'error',
            {
                'checksVoidReturn': false,
                'checksConditionals': false
            }
        ]
    }
};
