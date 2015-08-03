'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

var _grid = require('./grid');

var _grid2 = _interopRequireDefault(_grid);

require('babel/polyfill');

var options = {};
var ampInsertedNodes = {};

var atRules = {
  'fill-parent': function fillParent() {
    return _grid2['default'].fillParent(options);
  },
  'omega': function omega(query, direction) {
    return _grid2['default'].omega(query, direction, options);
  },
  'outer-container': function outerContainer(maxWidth) {
    return _grid2['default'].outerContainer(maxWidth, options);
  },
  'pad': function pad() {
    for (var _len = arguments.length, padding = Array(_len), _key = 0; _key < _len; _key++) {
      padding[_key] = arguments[_key];
    }

    return _grid2['default'].pad(padding, options);
  },
  'row': function row(display) {
    return _grid2['default'].row(display, options);
  },
  'shift': function shift(columns, containerColumns, direction) {
    return _grid2['default'].shift(columns, containerColumns, direction, options);
  },
  'show-grid': function showGrid(columns, containerColumns, direction) {
    return _grid2['default'].showGrid(columns, containerColumns, direction, options);
  },
  'span-columns': function spanColumns(columns, containerColumns, display, direction) {
    return _grid2['default'].spanColumns(columns, containerColumns, display, direction, options);
  }
};

var unwrapAmp = function unwrapAmp(nodeSelector) {
  var parentSelectors = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  if (nodeSelector.indexOf('&:') >= 0) {
    return parentSelectors.map(function (selector) {
      return nodeSelector.replace(/&/g, selector);
    }).join(',');
  }
  return nodeSelector;
};

var getGlobalSelector = function getGlobalSelector(node) {
  if (node.parent && node.parent.type === 'atrule') {
    return node.parent.name + ' ' + node.parent.params + ' ' + node.selector;
  }
  return node.selector;
};

var processRule = function processRule(ruleSet, node) {
  Object.keys(ruleSet).forEach(function (prop) {
    if (typeof ruleSet[prop] === 'object' && ruleSet[prop]) {
      var extRule = _postcss2['default'].rule({ selector: unwrapAmp(prop, node.selectors) });
      processRule(ruleSet[prop], extRule);

      var globalSelector = getGlobalSelector(node);
      node.parent.insertAfter(ampInsertedNodes[globalSelector] || node, extRule);
      ampInsertedNodes[globalSelector] = extRule;
    } else {
      node.append({ prop: prop, value: ruleSet[prop] });
    }
  });
};

exports['default'] = _postcss2['default'].plugin('postcss-neat', function (opts) {
  options = Object.assign({}, _core2['default'].variables, opts);
  return function (root) {
    ampInsertedNodes = {};
    root.eachAtRule(/^neat-/i, function (rule) {
      var atRule = rule.name.trim().replace('neat-', '');
      if (atRules[atRule]) {
        var params = rule.params.trim() ? rule.params.trim().split(' ') : [];
        var ruleSet = atRules[atRule].apply(atRules, _toConsumableArray(params));
        processRule(ruleSet, rule.parent);
      }
      rule.removeSelf();
    });
  };
});
module.exports = exports['default'];
//# sourceMappingURL=neat-parser.js.map