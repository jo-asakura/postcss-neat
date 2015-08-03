'use strict';

import variables from '../core/variables.es6.js';
import functions from '../core/functions.es6.js';

// Specifies the number of columns an element should span. If the selector is nested the number of columns
// of its parent element should be passed as an argument as well.
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
// @example - LESS Usage
//   .element {
//     @mixin span-columns 6;
//
//    .nested-element {
//      @mixin span-columns 2 6;
//    }
//  }
//
// @example - CSS Output
//   .element {
//     display: block;
//     float: left;
//     margin-right: 2.3576516%;
//     width: 48.8211742%;
//   }
//
//   .element:last-child {
//     margin-right: 0;
//   }
//
//   .element .nested-element {
//     display: block;
//     float: left;
//     margin-right: 4.82915791%;
//     width: 30.11389472%;
//   }
//
//   .element .nested-element:last-child {
//     margin-right: 0;
//   }

const generateArray = (length = 0) => {
  return Array.from(new Array(length), (x, i) => i);
};

let showGrid = (columns, containerColumns, direction, options = variables) => {
  containerColumns = containerColumns || options.neatGridColumns;
  direction = direction || options.neatDefaultDirection;

  let columnsCount = +(containerColumns / columns);
  var directions = functions.getDirection(direction);
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
