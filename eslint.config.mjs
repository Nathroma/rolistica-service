import eslint from '@eslint/js';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

import stylistic from '@stylistic/eslint-plugin';
import perfectionist from 'eslint-plugin-perfectionist';
import unusedImports from 'eslint-plugin-unused-imports';

const qualityConfig = {
    name: 'Rolistica Quality rules',
    rules: {
        'block-scoped-var': 'error',
        'curly': 'error',
        'eqeqeq': ['error', 'smart'],
        'no-extend-native': 'error',
        'no-param-reassign': 'warn',
        'no-unused-vars': 'off',
        'no-undef': 'off',
        'no-console': 'warn',
        'no-implicit-coercion': 'error',
        '@typescript-eslint/strict-boolean-expressions': 'error',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                args: 'all',
                argsIgnorePattern: '^_',
                caughtErrors: 'all',
                caughtErrorsIgnorePattern: '^_',
                destructuredArrayIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                ignoreRestSiblings: true,
            },
        ],
        '@typescript-eslint/no-empty-object-type': 'off',
        '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    },
};

const formatterConfig = {
    name: 'Rolistica Code formatter',
    plugins: {
        '@stylistic': stylistic,
        'perfectionist': perfectionist,
        'unused-imports': unusedImports,
    },
    rules: {
        'camelcase': [
            'warn',
            {
                properties: 'never',
                ignoreDestructuring: true,
                ignoreImports: true,
            },
        ],
        '@stylistic/keyword-spacing': 'error',
        '@stylistic/space-unary-ops': 'error',
        '@stylistic/quote-props': ['error', 'consistent-as-needed'],
        '@stylistic/object-curly-newline': ['error', { consistent: true, multiline: true }],
        '@stylistic/object-curly-spacing': ['error', 'always'],
        '@stylistic/no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
        '@stylistic/eol-last': ['error', 'always'],
        '@stylistic/no-trailing-spaces': ['error'],
        '@stylistic/computed-property-spacing': ['error', 'never'],
        '@stylistic/brace-style': ['error', '1tbs'],
        '@stylistic/indent': [
            'error',
            4,
            {
                SwitchCase: 1,
                flatTernaryExpressions: true,
            },
        ],
        '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
        '@stylistic/arrow-parens': ['error', 'always'],
        '@stylistic/semi': ['error', 'always'],
        '@stylistic/semi-spacing': 'error',
        '@stylistic/rest-spread-spacing': 'error',
        '@stylistic/padding-line-between-statements': [
            'error',
            {
                blankLine: 'always',
                prev: '*',
                next: ['enum', 'interface', 'type', 'return'], // empty line before this keywords
            },
            { blankLine: 'always', prev: 'import', next: '*' }, // empty line after imports
            { blankLine: 'any', prev: 'import', next: 'import' }, // whatever line between
            { blankLine: 'never', prev: 'return', next: '*' },
        ],
        '@stylistic/array-bracket-spacing': ['error', 'never'],
        '@stylistic/key-spacing': ['error'],
        '@stylistic/arrow-spacing': ['error'],
        '@stylistic/space-infix-ops': 'error', // space arround '=' & consorts
        '@stylistic/type-annotation-spacing': 'error', // space in type: string
        '@stylistic/no-multi-spaces': ['error'],
        '@stylistic/no-multiple-empty-lines': 'error',
        '@stylistic/max-len': [
            'error',
            {
                code: 120,
                ignorePattern: '^(import .+[\'"];)|(const \\S+ = require\\(.+\\);)',
                ignoreComments: true,
                ignoreTrailingComments: true,
                ignoreUrls: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true,
            },
        ],
        'perfectionist/sort-imports': [
            'error',
            {
                groups: [
                    'react',
                    'type',
                    ['builtin', 'external'],
                    'internal-type',
                    'internal',
                    ['parent-type', 'sibling-type', 'index-type'],
                    ['parent', 'sibling', 'index'],
                    'object',
                    'unknown',
                ],
                customGroups: {
                    value: {
                        react: ['^react$', '^react-.+'],
                    },
                    type: {
                        react: ['^react$', '^react-.+'],
                    },
                },
            },
        ],
        'unused-imports/no-unused-imports': 'error',
    },
};

const eslintConfig = [
    {
        name: 'Ignore',
        ignores: ['**/dist/'], // keep it alone to be applied globally
    },
    eslint.configs.recommended,
    ...typescriptEslint.configs.recommended,
    {
        name: 'Setup',
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.builtin,
            },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: process.cwd(),
            },
        },
    },
    qualityConfig,
    formatterConfig,
    {
        name: 'override',
        rules: {
            '@stylistic/max-len': [
                'error',
                {
                    code: 120,
                    ignorePattern: '^(import .+[\'"];)|(const \\S+ = require\\(.+\\);)',
                    ignoreComments: true,
                    ignoreTrailingComments: true,
                    ignoreUrls: true,
                    ignoreStrings: true,
                    ignoreTemplateLiterals: true,
                    ignoreRegExpLiterals: true,
                },
            ],
        },
    },
];

export default eslintConfig;
