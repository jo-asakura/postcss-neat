'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _coreVariablesEs6Js = require('../core/variables.es6.js');

var _coreVariablesEs6Js2 = _interopRequireDefault(_coreVariablesEs6Js);

var _coreFunctionsEs6Js = require('../core/functions.es6.js');

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

var _coreFunctionsEs6Js2 = _interopRequireDefault(_coreFunctionsEs6Js);

var generateArray = function generateArray() {
  var length = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

  return Array.from(new Array(length), function (x, i) {
    return i;
  });
};

var showGrid = function showGrid(columns, containerColumns, direction) {
  var options = arguments.length <= 3 || arguments[3] === undefined ? _coreVariablesEs6Js2['default'] : arguments[3];

  containerColumns = containerColumns || options.neatGridColumns;
  direction = direction || options.neatDefaultDirection;

  var columnsCount = +(containerColumns / columns);
  var directions = _coreFunctionsEs6Js2['default'].getDirection(direction);
  var columnWidth = _coreFunctionsEs6Js2['default'].flexWidth(columns, containerColumns, options.neatColumnWidth, options.neatGutterWidth);
  var columnGutter = _coreFunctionsEs6Js2['default'].flexGutter(containerColumns, options.neatColumnWidth, options.neatGutterWidth);

  var gradient = generateArray(columnsCount).reduce(function (memo, idx) {
    var startColor = columnWidth * idx + columnGutter * idx;
    var endColor = columnWidth * (idx + 1) + columnGutter * idx;
    var startBlank = endColor;
    var endBlank = columnWidth * (idx + 1) + columnGutter * (idx + 1);
    memo.push(options.debugGridColor + ' ' + _coreFunctionsEs6Js2['default'].percentage(startColor) + ', ' + options.debugGridColor + ' ' + _coreFunctionsEs6Js2['default'].percentage(endColor));
    if (idx < columnsCount - 1) {
      memo.push('transparent ' + _coreFunctionsEs6Js2['default'].percentage(startBlank) + ', transparent ' + _coreFunctionsEs6Js2['default'].percentage(endBlank));
    }
    return memo;
  }, [directions.direction === 'right' ? 'to right' : 'to left']);

  return {
    '&:after': {
      'background': 'linear-gradient(' + gradient.join(',') + ')',
      'height': '100%',
      'width': '100%'
    }
  };
};

exports['default'] = showGrid;
module.exports = exports['default'];
//# sourceMappingURL=../grid/show-grid.es6.js.map