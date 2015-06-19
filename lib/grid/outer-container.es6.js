'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _coreVariablesEs6Js = require('../core/variables.es6.js');

var _coreVariablesEs6Js2 = _interopRequireDefault(_coreVariablesEs6Js);

var _coreFunctionsEs6Js = require('../core/functions.es6.js');

var _coreFunctionsEs6Js2 = _interopRequireDefault(_coreFunctionsEs6Js);

// Makes an element a outer container by centring it in the viewport, clearing its floats, and setting its `max-width`.
// Although optional, using `outer-container` is recommended. The mixin can be called on more than one element per page,
// as long as they are not nested.
//
// @local-max-width
//   Max width to be applied to the element. Can be a percentage or a measure.
//
// @example - LESS Usage
//   .element {
//     @mixin outer-container 100%;
//   }
//
// @example - CSS Output
//   .element {
//     *zoom: 1;
//     max-width: 100%;
//     margin-left: auto;
//     margin-right: auto;
//   }
//
//   .element:before,
//   .element:after {
//     content: " ";
//     display: table;
//   }
//
//   .element:after {
//     clear: both;
//   }

var outerContainer = function outerContainer() {
  var maxWidth = arguments[0] === undefined ? _coreVariablesEs6Js2['default'].neatMaxWidth : arguments[0];

  return Object.assign({
    'max-width': maxWidth,
    'margin-left': 'auto',
    'margin-right': 'auto'
  }, _coreFunctionsEs6Js2['default'].clearfix());
};

exports['default'] = outerContainer;
module.exports = exports['default'];
//# sourceMappingURL=../grid/outer-container.es6.js.map