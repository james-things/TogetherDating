/* eslint-disable global-require */
module.exports = {
  reactScriptsVersion: 'react-scripts',
  style: {
    postcssOptions: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('babel-core/register'),
        require('babel-polyfill'),
      ],
    },
  },
};
