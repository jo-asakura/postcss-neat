'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _coreVariablesEs6Js = require('../core/variables.es6.js');

var _coreVariablesEs6Js2 = _interopRequireDefault(_coreVariablesEs6Js);

var _coreFunctionsEs6Js = require('../core/functions.es6.js');

var _coreFunctionsEs6Js2 = _interopRequireDefault(_coreFunctionsEs6Js);

var _fillParentEs6Js = require('./fill-parent.es6.js');

// Designates the element as a row of columns in the grid layout. It clears the floats on the element and
// sets its display property. Rows can't be nested, but there can be more than one row element
// with different display properties per layout.
//
// @display
//  Sets the display property of the element and the display context that
//  will be used by its children. Can be `block` or `table`.
//
// @direction
//  Sets the layout direction. Can be `LTR` (left-to-right) or `RTL` (right-to-left).
//
// @example - PostCSS Usage
//  .element {
//    @neat-row;
//  }
//
// @example - CSS Output
//  .element {
//    *zoom: 1;
//    display: block;
//  }
//
// .element:before,
// .element:after {
//   content: " ";
//   display: table;
// }
//
// .element:after {
//   clear: both;
// }
//

var _fillParentEs6Js2 = _interopRequireDefault(_fillParentEs6Js);

var row = function row(display) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? _coreVariablesEs6Js2['default'] : arguments[1];

  display = display || options.neatDefaultDisplay;

  if (display === 'table') {
    return Object.assign({
      'display': 'table',
      'table-layout': 'fixed'
    }, (0, _fillParentEs6Js2['default'])());
  } else {
    return Object.assign({
      'display': 'block'
    }, _coreFunctionsEs6Js2['default'].clearfix());
  }
};

exports['default'] = row;
module.exports = exports['default'];
//# sourceMappingURL=../grid/row.es6.js.map