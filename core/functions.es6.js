'use strict';

import config from './variables.es6.js';

let functions = {
  // Convert to percentage
  percentage(value = 0) {
    value = +value;
    return `${value < 1 ? (value * 100).toFixed(8) : value}%`;
  },

  // Simple clearfix
  clearfix() {
    return {
      '*zoom': 1,
      '&:before, &:after': {
        'content': '" "',
        'display': 'table'
      },
      '&:after': {
        'clear': 'both'
      }
    };
  }
};

functions = Object.assign(functions, {
  // Sets layout direction and layout opposite direction to `@direction`
  // and `@opposite-direction` accordingly.
  getDirection(layout = 'LTR') {
    return {
      direction: layout === 'LTR' ? 'right' : 'left',
      oppositeDirection: layout === 'LTR' ? 'left' : 'right'
    };
  },

  // Sets neat grid column's width to `@column-width`.
  flexWidth(columns, containerColumns, column = config.neatColumnWidth, gutter = config.neatGutterWidth) {
    columns = +columns;
    containerColumns = +containerColumns;
    column = +column.replace('em', '');
    gutter = +gutter.replace('em', '');

    var tmpWidth = columns * column + (columns - 1) * gutter;
    var tmpContainerWidth = containerColumns * column + (containerColumns - 1) * gutter;

    return tmpWidth / tmpContainerWidth; // columnWidth
  },

  // Sets neat grid column's gutter (the white space between two columns) to `@column-gutter`.
  flexGutter(containerColumns = config.neatGridColumns, column = config.neatColumnWidth, gutter = config.neatGutterWidth) {
    containerColumns = +containerColumns;
    column = +column.replace('em', '');
    gutter = +gutter.replace('em', '');

    var tmpContainerWidth = containerColumns * column + (containerColumns - 1) * gutter;

    return gutter / tmpContainerWidth; // columnGutter
  }
});

export default functions;
