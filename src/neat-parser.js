'use strict';

require('babel/polyfill');

import postcss from 'postcss';
import neatGrid from './grid';

const defaults = {};

const atRules = {
  'fill-parent' () {
    return neatGrid.fillParent();
  },
  'omega' (query, direction) {
    return neatGrid.omega(query, direction);
  },
  'outer-container' (maxWidth) {
    return neatGrid.outerContainer(maxWidth);
  },
  'pad' (...padding) {
    return neatGrid.pad(padding);
  },
  'row' (display) {
    return neatGrid.row(display);
  },
  'shift' (columns, containerColumns, direction) {
    return neatGrid.shift(columns, containerColumns, direction);
  },
  'span-columns' (columns, containerColumns, display, direction) {
    return neatGrid.spanColumns(columns, containerColumns, display, direction);
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
