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

  swipe: (area, onSwipe) => {
    const coords = {
      sx: 0,
      sy: 0,
      ex: 0,
      ey: 0,
    };

    function calculateSwipe() {
      const { sx, sy, ex, ey } = coords;

      if (ex < sx) return onSwipe('left');
      if (ex > sx) return onSwipe('right');
      if (ey < sy) return onSwipe('down');
      if (ey > sy) return onSwipe('up');

      return onSwipe('tap');
    }

    area.addEventListener('touchstart', (event) => {
      coords.sx = event.changedTouches[0].screenX;
      coords.sy = event.changedTouches[0].screenY;
    }, false);

    area.addEventListener('touchend', (event) => {
      coords.ex = event.changedTouches[0].screenX;
      coords.ey = event.changedTouches[0].screenY;
      calculateSwipe();
    }, false);
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
