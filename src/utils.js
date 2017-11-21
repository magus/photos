// @flow

const isProd = process.env.NODE_ENV === 'production';

const utils = {};

['debug', 'log', 'info', 'warn', 'error'].forEach(level => {
  utils[level] = isProd ? () => {} : (...args) => console[level](...args);
});

export default utils;
