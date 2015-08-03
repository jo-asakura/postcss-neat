'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _coreVariablesEs6Js = require('../core/variables.es6.js');

var _coreVariablesEs6Js2 = _interopRequireDefault(_coreVariablesEs6Js);

var _coreFunctionsEs6Js = require('../core/functions.es6.js');

// Removes the element's gutter margin, regardless of its position in the grid hierarchy or display property.
// It can target a specific element, or every `nth-child` occurrence. Works only with `block` layouts.
//
// @query
//   Supported arguments are `nth-child` selectors (targets a specific pseudo element) and `auto` (targets `last-child`).
//
//   When passed an `nth-child` argument of type `*n` with `block` display, the omega mixin automatically
//   adds a clear to the `*n+1` th element.
//
//   Note that composite arguments such as `2n+1` do not support this feature.
//
// @direction
//  Sets the layout direction. Can be `LTR` (left-to-right) or `RTL` (right-to-left).
//
// @example - PostCSS Usage
//   .element {
//     @neat-omega;
//   }
//
//   .nth-element {
//     @neat-omega 4n;
//   }
//
//   .auto-element {
//     @neat-omega auto;
//   }
//
// @example - CSS Output
//   .element {
//     margin-right: 0;
//   }
//
//   .nth-element:nth-child(4n) {
//     margin-right: 0;
//   }
//
//   .nth-element:nth-child(4n+1) {
//     clear: left;
//   }
//
//   .auto-element:last-child {
//     margin-right: 0;
//   }
//

var _coreFunctionsEs6Js2 = _interopRequireDefault(_coreFunctionsEs6Js);

var omega = function omega(query, direction) {
  var options = arguments.length <= 2 || arguments[2] === undefined ? _coreVariablesEs6Js2['default'] : arguments[2];

  direction = direction || options.neatDefaultDirection;

  var directions = _coreFunctionsEs6Js2['default'].getDirection(direction);
  if (!query) {
    return _defineProperty({}, 'margin-' + directions.direction, 0);
  } else if (query === 'auto') {
    return {
      '&:last-child': _defineProperty({}, 'margin-' + directions.direction, 0)
    };
  } else if (query) {
    var result = _defineProperty({}, '&:nth-child(' + query + ')', _defineProperty({}, 'margin-' + directions.direction, 0));

    if (query.indexOf('n') >= 0) {
      result['&:nth-child(' + query + ' + 1)'] = {
        'clear': directions.oppositeDirection
      };
    }

    return result;
  }
};

exports['default'] = omega;
module.exports = exports['default'];
//# sourceMappingURL=../grid/omega.es6.js.map