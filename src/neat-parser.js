'use strict';

require('babel/polyfill');

import postcss from 'postcss';
import neatCore from './core';
import neatGrid from './grid';

let options = {};

const atRules = {
  'fill-parent' () {
    return neatGrid.fillParent(options);
  },
  'omega' (query, direction) {
    return neatGrid.omega(query, direction, options);
  },
  'outer-container' (maxWidth) {
    return neatGrid.outerContainer(maxWidth, options);
  },
  'pad' (...padding) {
    return neatGrid.pad(padding, options);
  },
  'row' (display) {
    return neatGrid.row(display, options);
  },
  'shift' (columns, containerColumns, direction) {
    return neatGrid.shift(columns, containerColumns, direction, options);
  },
  'span-columns' (columns, containerColumns, display, direction) {
    return neatGrid.spanColumns(columns, containerColumns, display, direction, options);
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
  options = Object.assign({}, neatCore.variables, opts);
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
