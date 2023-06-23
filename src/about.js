console.log('ABOUT JS PAGE');
console.log('ABOUT JS PAGE');

// import './selectors.js';

import './normalize.scss';
import './about.scss';

// 'preloading' as soon as index.js loading completed
// to ensure lazy loading of selectors.js
import(/* webpackPreload: true */ 'lodash').then(({ default: _ }) => {});

// This is dynamically importing
// import('./normalize.scss');
// import('./about.scss');

// import { camelCase } from 'lodash';

// const getLoadash = async () => {
//   try {
//     const { default: _ } = await import('lodash');
//     console.log(_.camelCase('hello, world, my name is Chenna Sreenu'));
//   } catch (error) {
//     console.log(error);
//   }
// };

// getLoadash();

/**
 * if any file that doesnot have below line, gets full reload
 * instead of hot module replacement
 */
if (module && module.hot) module.hot.accept();
