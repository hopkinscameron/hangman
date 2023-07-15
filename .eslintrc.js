module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: './tsconfig.json',
        createDefaultProgram: true,
      },
      extends: [
        'plugin:@angular-eslint/recommended',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
      ],
      rules: {
        // the recommended rules only set this as 'warn'
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
        '@typescript-eslint/await-thenable': 'error',
        // Pulled from previous tsconfig rules
        'object-shorthand': [2, 'properties'],
        'quote-props': ['error', 'as-needed'],
        quotes: ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
        'no-eval': 'error',
        'space-before-function-paren': ['error', {
          'anonymous': 'always',
          'named': 'never',
          'asyncArrow': 'always'
        }],
        'no-param-reassign': 'error',
        indent: ['error', 2, { 'SwitchCase': 1 }],
        'prefer-arrow-callback': 'error',
        'arrow-parens': [2, 'as-needed', { 'requireForBlockBody': true }],
        'no-duplicate-imports': 'error',
        'one-var': ['error', 'never'],
        'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
        'eqeqeq': ['error', 'always', { 'null': 'ignore' }],
        curly: ['error', 'multi-line'],
        'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
        'no-else-return': 'error',
        'spaced-comment': ['error', 'always'],
        'eol-last': ['error', 'always'],
        'space-in-parens': ['error', 'never'],
        'array-bracket-spacing': ['error', 'never'],
        'object-curly-spacing': ['error', 'always'],
        'max-len': ['error', { 'code': 160 }],
        'comma-dangle': ['error', 'always-multiline'],
        semi: ['error', 'always'],
        'no-new-wrappers': 'error',
        'consistent-this': 'error',
        // likely mistakes
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'no-extra-parens': 'off',
        '@typescript-eslint/no-extra-parens': ['error'],
        'no-template-curly-in-string': 'error',
        'no-unneeded-ternary': 'error',
        // best practices
        'block-scoped-var': 'error',
        complexity: ['error', 10],
        'default-param-last': ['error'],
        'dot-location': ['error', 'property'],
        'dot-notation': 'error',
        'max-statements': ['error', 40],
        "no-empty-function": "off",
        "@typescript-eslint/no-empty-function": ["error"],
        'no-lone-blocks': 'error',
        'no-self-compare': 'error',
        'no-useless-concat': 'error',
        'require-await': 'error',
        camelcase: 'off',
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'default',
            format: ['camelCase'],
          },
          {
            selector: 'parameter',
            format: ['camelCase'],
            modifiers: ['unused'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'variable',
            format: ['camelCase'],
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
          {
            selector: 'property',
            format: ['camelCase'],
          },
          {
            selector: 'objectLiteralProperty',
            format: [],
            modifiers: ['requiresQuotes'],
            custom: {
              regex: '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
              match: true,
            },
          },
          {
            selector: 'classProperty',
            format: ['camelCase'],
            modifiers: ['private'],
          },
          {
            selector: 'enumMember',
            format: ['PascalCase'],
          },
        ],
        // stylistic
        'comma-spacing': 'error',
        'comma-style': 'error',
        'key-spacing': 'error',
        'keyword-spacing': 'error',
        'no-lonely-if': 'error',
        'no-multiple-empty-lines': 'error',
        'no-trailing-spaces': 'error',
        'prefer-template': 'error',
        // EMCA 6
        'arrow-spacing': 'error',
        'no-useless-constructor': 'off',
        'prefer-object-has-own': 'error',
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/member-ordering': [
          'error',
          {
            'default': [
              'signature',
              'field',
              'constructor',
              'method',
            ],
          },
        ],
        '@angular-eslint/contextual-decorator': 'error',
        '@angular-eslint/no-lifecycle-call': 'error',
        '@angular-eslint/use-component-view-encapsulation': 'error',
        '@angular-eslint/use-lifecycle-interface': 'error',
      },
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {
        '@angular-eslint/template/eqeqeq': ['error', {
          'allowNullOrUndefined': true,
        }],
        '@angular-eslint/template/no-any': 'error',
        '@angular-eslint/template/no-duplicate-attributes': 'error',
        '@angular-eslint/template/no-negated-async': 'error',
      },
    }
  ],
};
