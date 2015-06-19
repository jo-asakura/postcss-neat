'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _neatCoreEs6Js = require('./neat-core.es6.js');

var _neatCoreEs6Js2 = _interopRequireDefault(_neatCoreEs6Js);

exports['default'] = function (config) {
  config = config || {}; // will extend in future to use custom `variables` definitions
  return {
    'fill-parent': function fillParent() {
      return _neatCoreEs6Js2['default'].fillParent();
    },
    'omega': function omega(rule, query, direction) {
      return _neatCoreEs6Js2['default'].omega(query, direction);
    },
    'outer-container': function outerContainer(rule, maxWidth) {
      return _neatCoreEs6Js2['default'].outerContainer(maxWidth);
    },
    'pad': function pad(rule) {
      for (var _len = arguments.length, padding = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        padding[_key - 1] = arguments[_key];
      }

      return _neatCoreEs6Js2['default'].pad(padding);
    },
    'row': function row(rule, display) {
      return _neatCoreEs6Js2['default'].row(display);
    },
    'shift': function shift(rule, columns, containerColumns, direction) {
      return _neatCoreEs6Js2['default'].shift(columns, containerColumns, direction);
    },
    'span-columns': function spanColumns(rule, columns, containerColumns, display, direction) {
      return _neatCoreEs6Js2['default'].spanColumns(columns, containerColumns, display, direction);
    }
  };
};

;
module.exports = exports['default'];
//# sourceMappingURL=neat-mixins.es6.js.map