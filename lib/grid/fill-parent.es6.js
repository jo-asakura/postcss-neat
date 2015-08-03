'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _coreVariablesEs6Js = require('../core/variables.es6.js');

// Forces the element to fill its parent container.
//
// @example - PostCSS Usage
//   .element {
//     @neat-fill-parent;
//   }
//
// @example - CSS Output
//   .element {
//     box-sizing: border-box;
//     width: 100%;
//   }
//

var _coreVariablesEs6Js2 = _interopRequireDefault(_coreVariablesEs6Js);

var fillParent = function fillParent() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? _coreVariablesEs6Js2['default'] : arguments[0];

  return {
    'box-sizing': 'border-box',
    'width': '100%'
  };
};

exports['default'] = fillParent;
module.exports = exports['default'];
//# sourceMappingURL=../grid/fill-parent.es6.js.map