// @flow

const isProd = process.env.NODE_ENV === 'production';

export const dom = {
  create: (type) => document.createElement(type),

  img: (src, title) => {
    const element = dom.create('img');
    element.src = src;
    element.title = title || src;
    return element;
  },

  script: (src) => {
    const element = dom.create('script');
    element.src = src;
    return element;
  },

};

export const log = {};
['debug', 'log', 'info', 'warn', 'error'].forEach(level => {
  log[level] = isProd ? () => {} : (...args) => console[level](...args);
});

export default {
  dom,
  log,
};
