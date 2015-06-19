'use strict';

import neatCore from './neat-core.es6.js';

export default function (config = {}) {
  return {
    'fill-parent' () {
      return neatCore.fillParent();
    },
    'omega' (rule, query, direction) {
      return neatCore.omega(query, direction);
    },
    'outer-container' (rule, maxWidth) {
      return neatCore.outerContainer(maxWidth);
    },
    'pad' (rule, ...padding) {
      return neatCore.pad(padding);
    },
    'row' (rule, display) {
      return neatCore.row(display);
    },
    'shift' (rule, columns, containerColumns, direction) {
      return neatCore.shift(columns, containerColumns, direction);
    },
    'span-columns' (rule, columns, containerColumns, display, direction) {
      return neatCore.spanColumns(columns, containerColumns, display, direction);
    }
  };
};