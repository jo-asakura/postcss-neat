'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _variablesEs6Js = require('./variables.es6.js');

var _variablesEs6Js2 = _interopRequireDefault(_variablesEs6Js);

var functions = {
  // Convert to percentage
  percentage: function percentage() {
    var value = arguments[0] === undefined ? 0 : arguments[0];

    value = +value;
    return '' + (value <= 1 ? (value * 100).toFixed(8) : value) + '%';
  },

  // Simple clearfix
  clearfix: function clearfix() {
    return {
      '*zoom': 1,
      '&:before, &:after': {
        'content': '" "',
        'display': 'table'
      },
      '&:after': {
        'clear': 'both'
      }
    };
  }
};

functions = Object.assign(functions, {
  // Sets layout direction and layout opposite direction to `@direction`
  // and `@opposite-direction` accordingly.
  getDirection: function getDirection() {
    var layout = arguments[0] === undefined ? 'LTR' : arguments[0];

    return {
      direction: layout === 'LTR' ? 'right' : 'left',
      oppositeDirection: layout === 'LTR' ? 'left' : 'right'
    };
  },

  // Sets neat grid column's width to `@column-width`.
  flexWidth: function flexWidth(columns, containerColumns) {
    var column = arguments[2] === undefined ? _variablesEs6Js2['default'].neatColumnWidth : arguments[2];
    var gutter = arguments[3] === undefined ? _variablesEs6Js2['default'].neatGutterWidth : arguments[3];

    columns = +columns;
    containerColumns = +containerColumns;
    column = +column.replace('em', '');
    gutter = +gutter.replace('em', '');

    var tmpWidth = columns * column + (columns - 1) * gutter;
    var tmpContainerWidth = containerColumns * column + (containerColumns - 1) * gutter;

    return tmpWidth / tmpContainerWidth; // columnWidth
  },

  // Sets neat grid column's gutter (the white space between two columns) to `@column-gutter`.
  flexGutter: function flexGutter() {
    var containerColumns = arguments[0] === undefined ? _variablesEs6Js2['default'].neatGridColumns : arguments[0];
    var column = arguments[1] === undefined ? _variablesEs6Js2['default'].neatColumnWidth : arguments[1];
    var gutter = arguments[2] === undefined ? _variablesEs6Js2['default'].neatGutterWidth : arguments[2];

    containerColumns = +containerColumns;
    column = +column.replace('em', '');
    gutter = +gutter.replace('em', '');

    var tmpContainerWidth = containerColumns * column + (containerColumns - 1) * gutter;

    return gutter / tmpContainerWidth; // columnGutter
  }
});

exports['default'] = functions;
module.exports = exports['default'];
//# sourceMappingURL=../core/functions.es6.js.map