'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); }

var _coreVariablesEs6Js = require('../core/variables.es6.js');

var _coreVariablesEs6Js2 = _interopRequireDefault(_coreVariablesEs6Js);

var _coreFunctionsEs6Js = require('../core/functions.es6.js');

var _coreFunctionsEs6Js2 = _interopRequireDefault(_coreFunctionsEs6Js);

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
// @display
//   Sets the display property of the element. By default it sets the display property of the element to `block`.
//   If passed `block-collapse`, it also removes the margin gutter by adding it to the element width.
//   If passed `table`, it sets the display property to `table-cell` and calculates the width of the
//   element without taking gutters into consideration. The result does not align with the block-based grid.
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

var spanColumns = function spanColumns(columns) {
  var containerColumns = arguments[1] === undefined ? _coreVariablesEs6Js2['default'].neatGridColumns : arguments[1];
  var display = arguments[2] === undefined ? _coreVariablesEs6Js2['default'].neatDefaultDisplay : arguments[2];
  var direction = arguments[3] === undefined ? _coreVariablesEs6Js2['default'].neatDefaultDirection : arguments[3];

  var directions = _coreFunctionsEs6Js2['default'].getDirection(direction);
  var columnWidth = _coreFunctionsEs6Js2['default'].flexWidth(columns, containerColumns);
  var columnGutter = _coreFunctionsEs6Js2['default'].flexGutter(containerColumns);

  if (display === 'table') {
    return {
      'display': 'table-cell',
      'width': _coreFunctionsEs6Js2['default'].percentage(columns / containerColumns)
    };
  } else if (display === 'block-collapse') {
    return {
      'display': 'block',
      'float': directions.oppositeDirection,
      'width': _coreFunctionsEs6Js2['default'].percentage(columnWidth + columnGutter),

      '&:last-child': {
        'width': _coreFunctionsEs6Js2['default'].percentage(columnWidth)
      }
    };
  } else {
    var _ref;

    return (_ref = {
      'display': 'block',
      'float': directions.oppositeDirection }, _defineProperty(_ref, 'margin-' + directions.direction, _coreFunctionsEs6Js2['default'].percentage(columnGutter)), _defineProperty(_ref, 'width', _coreFunctionsEs6Js2['default'].percentage(columnWidth)), _defineProperty(_ref, '&:last-child', _defineProperty({}, 'margin-' + directions.direction, 0)), _ref);
  }
};

exports['default'] = spanColumns;
module.exports = exports['default'];
//# sourceMappingURL=../grid/span-columns.es6.js.map