'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _coreVariablesEs6Js = require('../core/variables.es6.js');

var _coreVariablesEs6Js2 = _interopRequireDefault(_coreVariablesEs6Js);

var _coreFunctionsEs6Js = require('../core/functions.es6.js');

// Adds padding to the element.
//
// @padding
//   A list of padding value(s) to use. Passing `default` in the list will result
//    in using the gutter width as a padding value.
//
// @example - PostCSS Usage
//   .element {
//     @neat-pad 30px -20px 10px default;
//   }
//
// @example - CSS Output
//   .element {
//     padding: 30px -20px 10px 2.3576516%;
//   }
//

var _coreFunctionsEs6Js2 = _interopRequireDefault(_coreFunctionsEs6Js);

var pad = function pad() {
  var padding = arguments.length <= 0 || arguments[0] === undefined ? 'default' : arguments[0];
  var options = arguments.length <= 1 || arguments[1] === undefined ? _coreVariablesEs6Js2['default'] : arguments[1];

  var columnGutter = _coreFunctionsEs6Js2['default'].percentage(_coreFunctionsEs6Js2['default'].flexGutter(options.neatGridColumns, options.neatColumnWidth, options.neatGutterWidth));
  var parts = Array.isArray(padding) ? padding : padding.split(' ');

  if (!parts.length) {
    parts.push('default');
  }

  return {
    'padding': parts.reduce(function (aggr, value) {
      aggr.push(value === 'default' ? columnGutter : value);
      return aggr;
    }, []).join(' ')
  };
};

exports['default'] = pad;
module.exports = exports['default'];
//# sourceMappingURL=../grid/pad.es6.js.map