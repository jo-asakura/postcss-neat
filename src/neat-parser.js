'use strict';

require('babel/polyfill');

import postcss from 'postcss';
import neatCore from './core';
import neatGrid from './grid';

let options = {};
let ampInsertedNodes = {};

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
  'show-grid' (columns, containerColumns, direction) {
    return neatGrid.showGrid(columns, containerColumns, direction, options);
  },
  'span-columns' (columns, containerColumns, display, direction) {
    return neatGrid.spanColumns(columns, containerColumns, display, direction, options);
  }
};

const unwrapAmp = (nodeSelector, parentSelectors = []) => {
  if (nodeSelector.indexOf('&:') >= 0) {
    return parentSelectors.map((selector) => {
      return nodeSelector.replace(/&/g, selector);
    }).join(',');
  }
  return nodeSelector;
};

const getGlobalSelector = (node) => {
  if (node.parent && node.parent.type === 'atrule') {
    return `${node.parent.name} ${node.parent.params} ${node.selector}`;
  }
  return node.selector;
};

const processRule = (ruleSet, node) => {
  Object.keys(ruleSet).forEach((prop) => {
    if (typeof ruleSet[prop] === 'object' && ruleSet[prop]) {
      let extRule = postcss.rule({ selector: unwrapAmp(prop, node.selectors) });
      processRule(ruleSet[prop], extRule);

      let globalSelector = getGlobalSelector(node);
      node.parent.insertAfter(ampInsertedNodes[globalSelector] || node, extRule);
      ampInsertedNodes[globalSelector] = extRule;
    } else {
      node.append({ prop, value: ruleSet[prop] });
    }
  });
};

export default postcss.plugin('postcss-neat', (opts) => {
  options = Object.assign({}, neatCore.variables, opts);
  return (root) => {
    ampInsertedNodes = {};
    root.eachAtRule(/^neat-/i, (rule) => {
      let atRule = rule.name.trim().replace('neat-', '');
      if (atRules[atRule]) {
        let params = rule.params.trim() ? rule.params.trim().split(' ') : [];
        let ruleSet = atRules[atRule](...params);
        processRule(ruleSet, rule.parent);
      }
      rule.removeSelf();
    });
  };
});
