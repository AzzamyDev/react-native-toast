module.exports = {
  extends: ['@react-native', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'error',
    'react-hooks/exhaustive-deps': 'off',
  },
  ignorePatterns: ['node_modules/', 'lib/'],
};
