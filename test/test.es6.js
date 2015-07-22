'use strict';

import chai from 'chai';
let expect = chai.expect;

import neatCore from '../src/core';
import neatGrid from '../src/grid';

import postcss from 'postcss';
import postcssNested from 'postcss-nested';
import postcssNeat from '../src/index.js';

import CleanCss from 'clean-css';
let minifier = new CleanCss();
let cleanCss = (css) => minifier.minify(css || '').styles;

let test = (input, output, done, options = {}) => {
  postcss([postcssNeat(options), postcssNested]).process(input)
    .then((result) => {
      //console.log('RESULT: ', result.css);
      expect(cleanCss(result.css)).to.eql(cleanCss(output));
      expect(result.warnings()).to.be.empty;
      done();
    })
    .catch((error) => {
      done(error);
    });
};

describe('postcss-neat::usage', function () {
  it('1. `fill-parent` should render proper rule-set', function (done) {
    test(
      `.element {
         @neat-fill-parent;
       }`,
      `.element {
         box-sizing: border-box;
         width: 100%;
       }`,
      done);
  });

  it('2. `omega` should render proper rule-set', function (done) {
    test(
      `.element {
         @neat-omega;
       }`,
      `.element {
         margin-right: 0;
       }`,
      done);
  });

  it('3. `omega 4n` should render proper rule-set', function (done) {
    test(
      `.nth-element {
         @neat-omega 4n;
       }`,
      `.nth-element:nth-child(4n) {
         margin-right: 0;
       }

       .nth-element:nth-child(4n+1) {
         clear: left;
       }`,
      done);
  });

  it('4. `omega auto` should render proper rule-set', function (done) {
    test(
      `.auto-element {
         @neat-omega auto;
       }`,
      `.auto-element:last-child {
         margin-right: 0;
       }`,
      done);
  });

  it('5. `outer-container 100%` should render proper rule-set', function (done) {
    test(
      `.element {
         @neat-outer-container 100%;
       }`,
      `.element {
         *zoom: 1;
         max-width: 100%;
         margin-left: auto;
         margin-right: auto;
       }

       .element:before,
       .element:after {
         content: " ";
         display: table;
       }

       .element:after {
         clear: both;
       }`,
      done);
  });

  it('6. `pad 30px -20px 10px default` should render proper rule-set', function (done) {
    test(
      `.element {
         @neat-pad 30px -20px 10px default;
       }`,
      `.element {
         padding: 30px -20px 10px 2.3576516%;
       }`,
      done);
  });

  it('7. `pad` should render proper rule-set', function (done) {
    test(
      `.element {
         @neat-pad;
       }`,
      `.element {
         padding: 2.3576516%;
       }`,
      done);
  });

  it('8. `row` should render proper rule-set', function (done) {
    test(
      `.element {
         @neat-row;
       }`,
      `.element {
         *zoom: 1;
         display: block;
       }

       .element:before,
       .element:after {
         content: " ";
         display: table;
       }

       .element:after {
         clear: both;
       }`,
      done);
  });

  it('9. `row table` should render proper rule-set', function (done) {
    test(
      `.element {
         @neat-row table;
       }`,
      `.element {
         display: table;
         table-layout: fixed;
         box-sizing: border-box;
         width: 100%;
       }`,
      done);
  });

  it('10. `shift -3 6` should render proper rule-set', function (done) {
    test(
      `.element-neg {
         @neat-shift -3 6;
       }`,
      `.element-neg {
         margin-left: -52.41457896%;
       }`,
      done);
  });

  it('11. `shift 2` should render proper rule-set', function (done) {
    test(
      `.element-pos {
         @neat-shift 2;
       }`,
      `.element-pos {
         margin-left: 17.05960860%;
       }`,
      done);
  });

  it('12. `shift 4 12 RTL` should render proper rule-set', function (done) {
    test(
      `.element-pos {
         @neat-shift 4 12 RTL;
       }`,
      `.element-pos {
         margin-right: 34.1192172%;
       }`,
      done);
  });

  it('13. `shift 4 12 RTL` should render proper rule-set', function (done) {
    test(
      `.element-pos {
         @neat-shift 4 12 RTL;
       }`,
      `.element-pos {
         margin-right: 34.1192172%;
       }`,
      done);
  });

  it('14. `span-columns 6` should render proper rule-set', function (done) {
    test(
      `.element {
         @neat-span-columns 6;
       }`,
      `.element {
         display: block;
         float: left;
         margin-right: 2.3576516%;
         width: 48.8211742%;
       }

       .element:last-child {
         margin-right: 0;
       }`,
      done);
  });

  it('15. `span-columns 2 6` should render proper rule-set', function (done) {
    test(
      `.element {
         .nested-element {
           @neat-span-columns 2 6;
         }
       }`,
      `.element .nested-element {
         display: block;
         float: left;
         margin-right: 4.82915791%;
         width: 30.11389472%;
       }

       .element .nested-element:last-child {
         margin-right: 0;
       }`,
      done);
  });

  it('16. `outer-container` and custom `neatMaxWidth` should render proper rule-set', function (done) {
    test(
      `.element {
         @neat-outer-container;
       }`,
      `.element {
         *zoom: 1;
         max-width: 128em;
         margin-left: auto;
         margin-right: auto;
       }

       .element:before,
       .element:after {
         content: " ";
         display: table;
       }

       .element:after {
         clear: both;
       }`,
      done, {
        neatMaxWidth: '128em'
      });
  });

  it('17. `span-columns 12` and custom `neatGutterWidth` should render proper rule-set', function (done) {
    let columns = 12;

    let options = Object.assign({}, neatCore.variables);
    options.neatGutterWidth = '20em';

    let flexGutter = neatCore.functions.flexGutter(options.neatGridColumns, options.neatColumnWidth, options.neatGutterWidth);
    let flexWidth = neatCore.functions.flexWidth(columns, options.neatGridColumns, options.neatColumnWidth, options.neatGutterWidth);

    test(
      `.element {
         @neat-span-columns ${columns};
       }`,
      `.element {
         display: block;
         float: left;
         margin-right: ${neatCore.functions.percentage(flexGutter)};
         width: ${neatCore.functions.percentage(flexWidth)};
       }

       .element:last-child {
         margin-right: 0;
       }`,
      done, {
        neatGutterWidth: options.neatGutterWidth
      });
  });

  it('18. `span-columns 6` and custom `neatGridColumns` should render proper rule-set', function (done) {
    test(
      `.element {
         @neat-span-columns 6;
       }`,
      `.element {
         display: block;
         float: left;
         margin-right: 4.82915791%;
         width: 100%;
       }

       .element:last-child {
         margin-right: 0;
       }`,
      done, {
        neatGridColumns: 6
      });
  });
});

describe('postcss-neat::core', function () {
  it('1. functions.percentage should return % of input value', function (done) {
    expect(neatCore.functions.percentage(10)).to.eql('10%');
    expect(neatCore.functions.percentage(.1)).to.eql('10.00000000%');
    expect(neatCore.functions.percentage(.25)).to.eql('25.00000000%');
    expect(neatCore.functions.percentage(.99)).to.eql('99.00000000%');
    expect(neatCore.functions.percentage(.125)).to.eql('12.50000000%');
    expect(neatCore.functions.percentage(0)).to.eql('0.00000000%');
    done();
  });

  it('2. functions.getDirection should return both direction and opposite direction', function (done) {
    expect(neatCore.functions.getDirection('LTR')).to.eql({
      direction: 'right',
      oppositeDirection: 'left'
    });
    expect(neatCore.functions.getDirection('RTL')).to.eql({
      direction: 'left',
      oppositeDirection: 'right'
    });
    done();
  });

  it('3. functions.flexWidth should return correct column\'s width', function (done) {
    let funcs = neatCore.functions;
    let options = neatCore.variables;
    expect(funcs.percentage(funcs.flexWidth(6, 12, options.neatColumnWidth, options.neatGutterWidth))).to.eql('48.82117420%');
    expect(funcs.percentage(funcs.flexWidth(2, 6, options.neatColumnWidth, options.neatGutterWidth))).to.eql('30.11389472%');
    expect(funcs.percentage(funcs.flexWidth(1, 12, options.neatColumnWidth, options.neatGutterWidth))).to.eql('6.17215270%');
    done();
  });

  it('4. functions.flexGutter should return correct column\'s gutter', function (done) {
    let funcs = neatCore.functions;
    let options = neatCore.variables;
    expect(funcs.percentage(funcs.flexGutter(12, options.neatColumnWidth, options.neatGutterWidth))).to.eql('2.35765160%');
    expect(funcs.percentage(funcs.flexGutter(6, options.neatColumnWidth, options.neatGutterWidth))).to.eql('4.82915791%');
    done();
  });

  it('5. fillParent should return proper rule-set', function (done) {
    expect(neatGrid.fillParent()).to.eql({
      'box-sizing': 'border-box',
      'width': '100%'
    });
    done();
  });

  it('6. omega should return proper rule-set', function (done) {
    expect(neatGrid.omega()).to.eql({
      'margin-right': 0
    });
    expect(neatGrid.omega('4n')).to.eql({
      '&:nth-child(4n)': {
        'margin-right': 0
      },
      '&:nth-child(4n + 1)': {
        'clear': 'left'
      }
    });
    expect(neatGrid.omega('auto')).to.eql({
      '&:last-child': {
        'margin-right': 0
      }
    });
    done();
  });

  it('7. outerContainer should return proper rule-set', function (done) {
    expect(neatGrid.outerContainer('100%')).to.eql({
      'max-width': '100%',
      'margin-left': 'auto',
      'margin-right': 'auto',
      '*zoom': 1,
      '&:after': {
        'clear': 'both'
      },
      '&:before, &:after': {
        'content': '" "',
        'display': 'table'
      }
    });
    done();
  });

  it('8. pad should return proper rule-set', function (done) {
    expect(neatGrid.pad('30px -20px 10px default')).to.eql({
      'padding': '30px -20px 10px 2.35765160%'
    });
    done();
  });

  it('9. row should return proper rule-set', function (done) {
    expect(neatGrid.row()).to.eql({
      '*zoom': 1,
      'display': 'block',
      '&:before, &:after': {
        'content': '" "',
        'display': 'table'
      },
      '&:after': {
        'clear': 'both'
      }
    });
    done();
  });

  it('10. shift should return proper rule-set', function (done) {
    expect(neatGrid.shift(-3, 6)).to.eql({
      'margin-left': '-52.41457896%'
    });
    expect(neatGrid.shift(2)).to.eql({
      'margin-left': '17.05960860%'
    });
    done();
  });

  it('11. spanColumns should return proper rule-set', function (done) {
    expect(neatGrid.spanColumns(6)).to.eql({
      'display': 'block',
      'float': 'left',
      'margin-right': '2.35765160%',
      'width': '48.82117420%',

      '&:last-child': {
        'margin-right': 0
      }
    });

    expect(neatGrid.spanColumns(2, 6)).to.eql({
      'display': 'block',
      'float': 'left',
      'margin-right': '4.82915791%',
      'width': '30.11389472%',

      '&:last-child': {
        'margin-right': 0
      }
    });

    expect(neatGrid.spanColumns(3, 9, 'block-collapse')).to.eql({
      'display': 'block',
      'float': 'left',
      'width': '34.38947856%',

      '&:last-child': {
        'width': '31.22104287%'
      }
    });

    expect(neatGrid.spanColumns(2, 12, 'table')).to.eql({
      'display': 'table-cell',
      'width': neatCore.functions.percentage(2 / 12)
    });

    done();
  });
});
