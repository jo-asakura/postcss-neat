'use strict';

// Forces the element to fill its parent container.
//
// @example - LESS Usage
//   .element {
//     @mixin fill-parent;
//   }
//
// @example - CSS Output
//   .element {
//     box-sizing: border-box;
//     width: 100%;
//   }

Object.defineProperty(exports, '__esModule', {
  value: true
});
var fillParent = function fillParent() {
  return {
    'box-sizing': 'border-box',
    'width': '100%'
  };
};

exports['default'] = fillParent;
module.exports = exports['default'];
//# sourceMappingURL=../grid/fill-parent.es6.js.map