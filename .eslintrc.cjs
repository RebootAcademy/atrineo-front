module.exports = {
  root: true,
  env: { browser: true, es2020: true, "node": true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: [
    'react-refresh', 
    '@stylistic/js'
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    semi: ["error", "never"],
    "indent": ["error", 2],
  },
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "node": {
        "paths": [
          "src"
        ],
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx"
        ]
      }
    }
  },
}
