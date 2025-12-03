module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // 定义ESLint的解析器
  plugins: ['@typescript-eslint', 'react', 'react-hooks'], // 定义了该eslint文件所依赖的插件
  extends: ['alloy', 'alloy/typescript', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'plugin:react-hooks/recommended', 'plugin:react/recommended'],
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  globals: {
    // Your global variables (setting to false means it's not allowed to be reassigned)
    //
    // myGlobal: false
  },
  rules: {
    '@typescript-eslint/no-explicit-any': ['off'], //cz
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['off'], //warn-cz
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'react/no-find-dom-node': 'off',
    'react/sort-comp': 0,
    'max-classes-per-file': ['error', 3],
    'no-restricted-syntax': 0,
    //
    '@typescript-eslint/no-loop-func': ['error'],
    '@typescript-eslint/no-redeclare': ['error'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['warn'],
    '@typescript-eslint/camelcase': 'off',
    camelcase: 'off',
    'import/no-unresolved': 0,
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(useMyCustomHook|useMyOtherCustomHook)'
      }
    ],
    'max-params': [0, 5],
    'no-cond-assign': [2, 'always'],
    'react/prop-types': 0,
    'guard-for-in': 0,
    complexity: 0
  },

  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      spread: true,
      restParams: true,
      jsx: true
    }
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    },
    react: {
      pragma: 'React',
      version: 'detect'
    }
  }
}
