const {
  override,
  fixBabelImports,
  overrideDevServer,
  addBabelPlugin,
  watchAll,
  useEslintRc,
} = require('customize-cra');
const path = require('path');

module.exports = {
  webpack: override(
    useEslintRc(path.resolve(__dirname, '.eslintrc.js')),
    addBabelPlugin('@babel/plugin-proposal-optional-chaining'),
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
    }),
  ),
  devServer: overrideDevServer(
    config => ({
      ...config,
      proxy: {
        '/api': {
          target: process.env.REACT_APP_API_DOMAIN,
          changeOrigin: true,
        },
      },
      compress: false,
    }),
    watchAll(),
  ),
};
