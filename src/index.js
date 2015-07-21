'use strict';

require('babel/polyfill');

import postcss from 'postcss';
import neatCore from './neat-core.es6.js';

const defaults = {};

const atRules = {
  'fill-parent' () {
    return neatCore.fillParent();
  },
  'omega' (query, direction) {
    return neatCore.omega(query, direction);
  },
  'outer-container' (maxWidth) {
    return neatCore.outerContainer(maxWidth);
  },
  'pad' (...padding) {
    return neatCore.pad(padding);
  },
  'row' (display) {
    return neatCore.row(display);
  },
  'shift' (columns, containerColumns, direction) {
    return neatCore.shift(columns, containerColumns, direction);
  },
  'span-columns' (columns, containerColumns, display, direction) {
    return neatCore.spanColumns(columns, containerColumns, display, direction);
  }
};

const processRule = (node, ruleSet) => {
  Object.keys(ruleSet).forEach((prop) => {
    if (typeof ruleSet[prop] === 'object' && ruleSet[prop]) {
      let childRule = postcss.rule({ selector: prop });
      processRule(childRule, ruleSet[prop]);
      node.append(childRule);
    } else {
      node.append({ prop, value: ruleSet[prop] });
    }
  });
};

export default postcss.plugin('postcss-neat', (opts) => {
  let options = Object.assign({}, defaults, opts);
  return (root) => {
    root.eachAtRule(/^neat-/i, (rule) => {
      let atRule = rule.name.trim().replace('neat-', '');
      if (atRules[atRule]) {
        let params = rule.params.trim() ? rule.params.trim().split(' ') : [];
        let ruleSet = atRules[atRule](...params);
        processRule(rule.parent, ruleSet);
      }
      rule.removeSelf();
    });
  };
});
