import Breakpoints from 'breakpoints-js';

Breakpoints.set('delivery_mobile', 0, 960);
Breakpoints.set('delivery_desktop', 961, Infinity);

const mobile = Breakpoints.get('delivery_mobile');
const desktop = Breakpoints.get('delivery_desktop');

mobile.on({
  enter: () => {
    $('.delivery__items').addClass('owl-carousel').owlCarousel({
      items:        1,
      center:       true,
      dots:         true,
      nav:          false,
      loop:         true,
      responsive:   {
        550:  {
          items: 2,
        } ,
        720:  {
          items: 3,
        },
      },
    });
  },
  leave: () => {
    $('.delivery__items').owlCarousel('destroy').removeClass('owl-carousel');
  }
});
