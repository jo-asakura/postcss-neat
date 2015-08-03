'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _coreVariablesEs6Js = require('../core/variables.es6.js');

var _coreVariablesEs6Js2 = _interopRequireDefault(_coreVariablesEs6Js);

var _coreFunctionsEs6Js = require('../core/functions.es6.js');

// Creates a debugging grid for the parent of columns. Works in conjunction with `@neat-outer-container`.
//
// @columns
//   The unitless number of columns the element spans. If is not passed, it is equal to `@neatElementColumns`.
//   `@columns` also accepts decimals for when it's necessary to break out of the standard grid.
//   E.g. Passing `2.4` in a standard 12 column grid will divide the row into 5 columns.
//
// @container-columns
//   The number of columns the parent element spans. If is not passed, it is equal to `@neatGridColumns`,
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
//      bottom: 0;
//      display: block;
//      left: 0;
//      position: absolute;
//      right: 0;
//      top: 0
//    }
//

var _coreFunctionsEs6Js2 = _interopRequireDefault(_coreFunctionsEs6Js);

var generateArray = function generateArray() {
  var length = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

  return Array.from(new Array(length), function (x, i) {
    return i;
  });
};

var showGrid = function showGrid(columns, containerColumns, direction) {
  var options = arguments.length <= 3 || arguments[3] === undefined ? _coreVariablesEs6Js2['default'] : arguments[3];

  columns = columns || options.neatElementColumns;
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
      'bottom': '0',
      'display': 'block',
      'left': '0',
      'position': 'absolute',
      'right': '0',
      'top': '0'
    }
  };
};

exports['default'] = showGrid;
module.exports = exports['default'];
//# sourceMappingURL=../grid/show-grid.es6.js.map