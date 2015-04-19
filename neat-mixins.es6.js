'use strict';

import neatCore from './neat-core.es6.js';

export default {
  'fill-parent': function () {
    return neatCore.fillParent();
  },
  'omega': function (rule, query, direction) {
    return neatCore.omega(query, direction);
  },
  'outer-container': function (rule, maxWidth) {
    return neatCore.outerContainer(maxWidth);
  },
  'pad': function (rule, ...padding) {
    return neatCore.pad(padding);
  },
  'row': function (rule, display) {
    return neatCore.row(display);
  },
  'shift': function (rule, columns, containerColumns, direction) {
    return neatCore.shift(columns, containerColumns, direction);
  },
  'span-columns': function (rule, columns, containerColumns, display, direction) {
    return neatCore.spanColumns(columns, containerColumns, display, direction);
  }
};
