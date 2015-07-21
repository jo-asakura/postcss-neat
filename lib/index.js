'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _neatCoreEs6Js = require('./neat-core.es6.js');

var _neatCoreEs6Js2 = _interopRequireDefault(_neatCoreEs6Js);

require('babel/polyfill');

var defaults = {};

var atRules = {
  'fill-parent': function fillParent() {
    return _neatCoreEs6Js2['default'].fillParent();
  },
  'omega': function omega(query, direction) {
    return _neatCoreEs6Js2['default'].omega(query, direction);
  },
  'outer-container': function outerContainer(maxWidth) {
    return _neatCoreEs6Js2['default'].outerContainer(maxWidth);
  },
  'pad': function pad() {
    for (var _len = arguments.length, padding = Array(_len), _key = 0; _key < _len; _key++) {
      padding[_key] = arguments[_key];
    }

    return _neatCoreEs6Js2['default'].pad(padding);
  },
  'row': function row(display) {
    return _neatCoreEs6Js2['default'].row(display);
  },
  'shift': function shift(columns, containerColumns, direction) {
    return _neatCoreEs6Js2['default'].shift(columns, containerColumns, direction);
  },
  'span-columns': function spanColumns(columns, containerColumns, display, direction) {
    return _neatCoreEs6Js2['default'].spanColumns(columns, containerColumns, display, direction);
  }
};

var processRule = function processRule(node, ruleSet) {
  Object.keys(ruleSet).forEach(function (prop) {
    if (typeof ruleSet[prop] === 'object' && ruleSet[prop]) {
      var childRule = _postcss2['default'].rule({ selector: prop });
      processRule(childRule, ruleSet[prop]);
      node.append(childRule);
    } else {
      node.append({ prop: prop, value: ruleSet[prop] });
    }
  });
};

exports['default'] = _postcss2['default'].plugin('postcss-neat', function (opts) {
  var options = Object.assign({}, defaults, opts);
  return function (root) {
    root.eachAtRule(/^neat-/i, function (rule) {
      var atRule = rule.name.trim().replace('neat-', '');
      if (atRules[atRule]) {
        var params = rule.params.trim() ? rule.params.trim().split(' ') : [];
        var ruleSet = atRules[atRule].apply(atRules, _toConsumableArray(params));
        processRule(rule.parent, ruleSet);
      }
      rule.removeSelf();
    });
  };
});
module.exports = exports['default'];
//# sourceMappingURL=index.js.map