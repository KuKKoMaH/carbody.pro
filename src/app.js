import 'jquery';
import 'owl.carousel';
import SmoothScroll from 'smooth-scroll';
import 'magnific-popup/dist/jquery.magnific-popup.js';
import 'jquery.maskedinput/src/jquery.maskedinput';

import './js/$.debounce';
import './modules/header/header';
import './modules/slide/slide';
import './modules/form/form';
import './modules/catalog/catalog';
import './modules/delivery/delivery';
import './modules/faq/faq';

$('input[type="tel"]').mask("+7 (999) 999-99-99");

$('.popup__opener').on('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  $.magnificPopup.open({ type: 'inline', items: { src: $(e.delegateTarget).attr('href') } });
  return false;
});

new SmoothScroll('a[href*="#"]', {
  offset: () => $('header').outerHeight(),
});

window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload()
  }
};
