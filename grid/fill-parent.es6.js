'use strict';

// Forces the element to fill its parent container.
//
// @example - LESS Usage
//   .element {
//     .fill-parent();
//   }
//
// @example - CSS Output
//   .element {
//     box-sizing: border-box;
//     width: 100%;
//   }

let fillParent = () => {
  return {
    'box-sizing': 'border-box',
    'width': '100%'
  };
};

export default fillParent;
