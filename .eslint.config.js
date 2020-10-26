'use strict';

module.exports = {
    'parser': 'babel-eslint',
    'env': {
        'browser': true,
        'es6': true,
        'mocha': true,
        'amd': true,
        'node': true
    },
    'globals': {
        'expect': true
    },
    'plugins': [
        'react',
        'mocha'
    ],
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:mocha/recommended'
    ],
    'rules': {
        'no-debugger': 'warn',
        'no-console': 'warn',
        'no-alert': 'warn',
        'new-cap': 'off',
        'strict': 'off',
        'no-underscore-dangle': 'off',
        'no-use-before-define': 'off',
        'eol-last': 'off',
        'no-unused-vars': ['warn', {
            'ignoreRestSiblings': true
        }],

        'quotes': ['warn', 'single'],
        'no-template-curly-in-string': 'warn',
        'object-curly-spacing': ['warn', 'always'],
        'keyword-spacing': 'warn',
        'semi': 'warn',

        'class-methods-use-this': 'off',
        'complexity': ['off', {
            'max': 2
        }],
        'curly': 'off',
        'eqeqeq': ['off', 'always'],
        'no-magic-numbers': 'off',
        'radix': 'warn',
        'yoda': ['off', 'always'],

        'brace-style': 'warn',
        'camelcase': 'off',
        'comma-dangle': ['warn', 'never'],
        'comma-spacing': ['warn', {
            'before': false,
            'after': true
        }],
        'no-var': 'off',
        'object-property-newline': 'warn',
        'no-case-declarations': 'warn',

        'jsx-quotes': ['warn', 'prefer-double'],

        'react/jsx-no-undef': 'warn',
        'react/jsx-uses-react': 'warn',
        'react/jsx-uses-vars': 'warn',
        'react/jsx-curly-spacing': 'warn',
        'react/sort-comp': 'warn',
        'react/jsx-closing-bracket-location': 'warn',
        'react/no-deprecated':  'warn',

        'mocha/no-setup-in-describe': 'off'
    },
    'settings': {
        'react': {
            'version': 'detect'
        }
    }
};
