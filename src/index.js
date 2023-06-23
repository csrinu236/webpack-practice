// import { camelCase } from 'lodash';
// import './selectors.js';

// It will combine all css files into a single
import './normalize.scss';
import './main.scss';

// Dynamically importing of SCSS/CSS files
// import('./normalize.scss');
// import('./main.scss');

import Img from '../public/nature.jpeg';

const sectionCenter = document.querySelector('.section-center');
const myImage = new Image();
myImage.src = Img;
myImage.alt = 'Nature_Image';

sectionCenter.appendChild(myImage);

const importBtn = document.querySelector('.import-btn');
const lazyLoadCssBtn = document.querySelector('.lazy-load-css-btn');

lazyLoadCssBtn.addEventListener('click', () => {
  // import('./normalize.scss');
});

// 'preloading' as soon as index.js loading completed
// to ensure lazy loading of selectors.js
import(/* webpackPreload: true */ './selectors.js').then(() => {});

// pre-fetching on demand
importBtn.addEventListener('click', () => {
  import(/* webpackPrefetch: true */ './logger.js').then((file) => {});
  import(/* webpackPrefetch: true */ './alert.js').then((file) => {});
});

/**
 * if any file that doesnot have below line, gets full reload
 * instead of hot module replacement
 */
if (module && module.hot) module.hot.accept();
