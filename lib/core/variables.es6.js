'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var variables = {
  defaultEmSize: 1,

  // Sets the default display mode. Can be `block`, `table` or `block-collapse`.
  neatDefaultDisplay: 'block',

  // Sets the default layout direction of the grid. Can be `LTR` or `RTL`.
  neatDefaultDirection: 'LTR',

  // Sets the total number of columns in the grid. Its value can be overridden inside a mixin using the `@container-columns` variable.
  neatGridColumns: 12,

  // Sets the golden ratio value.
  neatGoldenRatio: 1.618
};

// Sets the relative width of a single grid column. The unit used should be the same one used to define `@neat-gutter-width`.
variables.neatColumnWidth = (variables.defaultEmSize * variables.neatGoldenRatio * variables.neatGoldenRatio * variables.neatGoldenRatio).toString() + 'em';

// Sets the relative width of a single grid gutter. The unit used should be the same one used to define `@neat-column-width`.
variables.neatGutterWidth = (variables.defaultEmSize * variables.neatGoldenRatio).toString() + 'em';

// Sets the max-width property of the element that includes `outer-container()`.
variables.neatMaxWidth = (1024 / 16 * variables.defaultEmSize).toString() + 'em';

exports['default'] = variables;
module.exports = exports['default'];
//# sourceMappingURL=../core/variables.es6.js.map