'use strict';

import chai from 'chai';
let expect = chai.expect;

import neatCore from '../neat-core.es6.js';

import postcss from 'postcss';
import postCssMixins from 'postcss-mixins';
import postCssNested from 'postcss-nested';
import neatMixins from '../index.js';

import CleanCss from 'clean-css';
let minifier = new CleanCss();
let cleanCss = (css) => {
  return minifier.minify(css || '').styles;
};

let processor = postcss([postCssMixins({ mixins: neatMixins }), postCssNested]);
let test = function (input, output, done) {
  var css = processor.process(input).css;
  expect(cleanCss(css)).to.eql(cleanCss(output));
  done();
};

describe('postcss-neat::usage', function () {
  it('`fill-parent` should render proper rule-set', function (done) {
    test(
      `.element {
         @mixin fill-parent;
       }`,
      `.element {
         box-sizing: border-box;
         width: 100%;
       }`,
      done);
  });

  it('`omega` should render proper rule-set', function (done) {
    test(
      `.element {
         @mixin omega;
       }`,
      `.element {
         margin-right: 0;
       }`,
      done);
  });

  it('`omega 4n` should render proper rule-set', function (done) {
    test(
      `.nth-element {
         @mixin omega 4n;
       }`,
      `.nth-element:nth-child(4n) {
         margin-right: 0;
       }

       .nth-element:nth-child(4n+1) {
         clear: left;
       }`,
      done);
  });

  it('`omega auto` should render proper rule-set', function (done) {
    test(
      `.auto-element {
         @mixin omega auto;
       }`,
      `.auto-element:last-child {
         margin-right: 0;
       }`,
      done);
  });

  it('`outer-container 100%` should render proper rule-set', function (done) {
    test(
      `.element {
         @mixin outer-container 100%;
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

  it('`pad 30px -20px 10px default` should render proper rule-set', function (done) {
    test(
      `.element {
         @mixin pad 30px -20px 10px default;
       }`,
      `.element {
         padding: 30px -20px 10px 2.3576516%;
       }`,
      done);
  });

  it('`pad` should render proper rule-set', function (done) {
    test(
      `.element {
         @mixin pad;
       }`,
      `.element {
         padding: 2.3576516%;
       }`,
      done);
  });

  it('`row` should render proper rule-set', function (done) {
    test(
      `.element {
         @mixin row;
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

  it('`row table` should render proper rule-set', function (done) {
    test(
      `.element {
         @mixin row table;
       }`,
      `.element {
         display: table;
         table-layout: fixed;
         box-sizing: border-box;
         width: 100%;
       }`,
      done);
  });

  it('`shift -3 6` should render proper rule-set', function (done) {
    test(
      `.element-neg {
         @mixin shift -3 6;
       }`,
      `.element-neg {
         margin-left: -52.41457896%;
       }`,
      done);
  });

  it('`shift 2` should render proper rule-set', function (done) {
    test(
      `.element-pos {
         @mixin shift 2;
       }`,
      `.element-pos {
         margin-left: 17.05960860%;
       }`,
      done);
  });

  it('`shift 4 12 RTL` should render proper rule-set', function (done) {
    test(
      `.element-pos {
         @mixin shift 4 12 RTL;
       }`,
      `.element-pos {
         margin-right: 34.1192172%;
       }`,
      done);
  });

  it('`shift 4 12 RTL` should render proper rule-set', function (done) {
    test(
      `.element-pos {
         @mixin shift 4 12 RTL;
       }`,
      `.element-pos {
         margin-right: 34.1192172%;
       }`,
      done);
  });

  it('`span-columns 6` should render proper rule-set', function (done) {
    test(
      `.element {
         @mixin span-columns 6;
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

  it('`span-columns 2 6` should render proper rule-set', function (done) {
    test(
      `.element {
         .nested-element {
           @mixin span-columns 2 6;
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
});

describe('postcss-neat::core', function () {
  it('functions.percentage should return % of input value', function (done) {
    expect(neatCore.functions.percentage(10)).to.eql('10%');
    expect(neatCore.functions.percentage(.1)).to.eql('10.00000000%');
    expect(neatCore.functions.percentage(.25)).to.eql('25.00000000%');
    expect(neatCore.functions.percentage(.99)).to.eql('99.00000000%');
    expect(neatCore.functions.percentage(.125)).to.eql('12.50000000%');
    expect(neatCore.functions.percentage(0)).to.eql('0.00000000%');
    done();
  });

  it('functions.getDirection should return both direction and opposite direction', function (done) {
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

  it('functions.flexWidth should return correct column\'s width', function (done) {
    expect(neatCore.functions.percentage(neatCore.functions.flexWidth(6, 12))).to.eql('48.82117420%');
    expect(neatCore.functions.percentage(neatCore.functions.flexWidth(2, 6))).to.eql('30.11389472%');
    expect(neatCore.functions.percentage(neatCore.functions.flexWidth(1, 12))).to.eql('6.17215270%');
    done();
  });

  it('functions.flexGutter should return correct column\'s gutter', function (done) {
    expect(neatCore.functions.percentage(neatCore.functions.flexGutter(12))).to.eql('2.35765160%');
    expect(neatCore.functions.percentage(neatCore.functions.flexGutter(6))).to.eql('4.82915791%');
    done();
  });

  it('fillParent should return proper rule-set', function (done) {
    expect(neatCore.fillParent()).to.eql({
      'box-sizing': 'border-box',
      'width': '100%'
    });
    done();
  });

  it('omega should return proper rule-set', function (done) {
    expect(neatCore.omega()).to.eql({
      'margin-right': 0
    });
    expect(neatCore.omega('4n')).to.eql({
      '&:nth-child(4n)': {
        'margin-right': 0
      },
      '&:nth-child(4n + 1)': {
        'clear': 'left'
      }
    });
    expect(neatCore.omega('auto')).to.eql({
      '&:last-child': {
        'margin-right': 0
      }
    });
    done();
  });

  it('outerContainer should return proper rule-set', function (done) {
    expect(neatCore.outerContainer('100%')).to.eql({
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

  it('pad should return proper rule-set', function (done) {
    expect(neatCore.pad('30px -20px 10px default')).to.eql({
      'padding': '30px -20px 10px 2.35765160%'
    });
    done();
  });

  it('row should return proper rule-set', function (done) {
    expect(neatCore.row()).to.eql({
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

  it('shift should return proper rule-set', function (done) {
    expect(neatCore.shift(-3, 6)).to.eql({
      'margin-left': '-52.41457896%'
    });
    expect(neatCore.shift(2)).to.eql({
      'margin-left': '17.05960860%'
    });
    done();
  });

  it('spanColumns should return proper rule-set', function (done) {
    expect(neatCore.spanColumns(6)).to.eql({
      'display': 'block',
      'float': 'left',
      'margin-right': '2.35765160%',
      'width': '48.82117420%',

      '&:last-child': {
        'margin-right': 0
      }
    });

    expect(neatCore.spanColumns(2, 6)).to.eql({
      'display': 'block',
      'float': 'left',
      'margin-right': '4.82915791%',
      'width': '30.11389472%',

      '&:last-child': {
        'margin-right': 0
      }
    });

    expect(neatCore.spanColumns(3, 9, 'block-collapse')).to.eql({
      'display': 'block',
      'float': 'left',
      'width': '34.38947856%',

      '&:last-child': {
        'width': '31.22104287%'
      }
    });

    expect(neatCore.spanColumns(2, 12, 'table')).to.eql({
      'display': 'table-cell',
      'width': neatCore.functions.percentage(2 / 12)
    });

    done();
  });
});
