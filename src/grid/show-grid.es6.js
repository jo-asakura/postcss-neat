'use strict';

import variables from '../core/variables.es6.js';
import functions from '../core/functions.es6.js';

// Creates a debugging grid for the parent of columns. Works in conjunction with `@neat-outer-container`.
//
// @columns
//   The unitless number of columns the element spans (required).
//   `@columns` also accepts decimals for when it's necessary to break out of the standard grid.
//   E.g. Passing `2.4` in a standard 12 column grid will divide the row into 5 columns.
//
// @container-columns
//   The number of columns the parent element spans. If is not passed, it is equal to `@neat-grid-columns`,
//   the total number of columns in the grid.
//
// @example - PostCSS Usage
//    .element {
//      @neat-outer-container;
//      @neat-show-grid 4 12;
//    }
//
// @example - CSS Output
//    .element {
//      *zoom: 1;
//      max-width: 128em;
//      margin-left: auto;
//      margin-right: auto;
//    }
//    .element:before,
//    .element:after {
//      content: " ";
//      display: table;
//    }
//    .element:after {
//      clear: both;
//      background: linear-gradient(to right,
//        #ecf0f1 0, #ecf0f1 31.7615656%,
//        transparent 31.7615656%, transparent 34.1192172%,
//        #ecf0f1 34.1192172%, #ecf0f1 65.88078280%,
//        transparent 65.88078280%, transparent 68.2384344%,
//        #ecf0f1 68.2384344%, #ecf0f1 100%);
//      height: 100%;
//      width: 100%;
//    }
//

const generateArray = (length = 0) => {
  return Array.from(new Array(length), (x, i) => i);
};

let showGrid = (columns, containerColumns, direction, options = variables) => {
  containerColumns = containerColumns || options.neatGridColumns;
  direction = direction || options.neatDefaultDirection;

  let columnsCount = +(containerColumns / columns);
  let directions = functions.getDirection(direction);
  let columnWidth = functions.flexWidth(columns, containerColumns, options.neatColumnWidth, options.neatGutterWidth);
  let columnGutter = functions.flexGutter(containerColumns, options.neatColumnWidth, options.neatGutterWidth);

  let gradient = generateArray(columnsCount).reduce((memo, idx) => {
    let startColor = columnWidth * idx + columnGutter * idx;
    let endColor = columnWidth * (idx + 1) + columnGutter * idx;
    let startBlank = endColor;
    let endBlank = columnWidth * (idx + 1) + columnGutter * (idx + 1);
    memo.push(`${options.debugGridColor} ${functions.percentage(startColor)}, ${options.debugGridColor} ${functions.percentage(endColor)}`);
    if (idx < columnsCount - 1) {
      memo.push(`transparent ${functions.percentage(startBlank)}, transparent ${functions.percentage(endBlank)}`);
    }
    return memo;
  }, [directions.direction === 'right' ? 'to right' : 'to left']);

  return {
    '&:after': {
      'background': `linear-gradient(${gradient.join(',')})`,
      'height': '100%',
      'width': '100%'
    }
  };
};

export default showGrid;
