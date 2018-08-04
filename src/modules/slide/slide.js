import Breakpoints from 'breakpoints-js';

Breakpoints.set('slide_mobile', 0, 1170);
Breakpoints.set('slide_desktop', 1171, Infinity);

const mobile = Breakpoints.get('slide_mobile');
const desktop = Breakpoints.get('slide_desktop');

mobile.on({
  enter: () => {
    $('.slide__items').addClass('owl-carousel').owlCarousel({
      stagePadding: 30,
      items:        1,
      center:       true,
      dots:         false,
      nav:          true,
      navText:      ['', ''],
      loop:         true,
      responsive:   {
        550:  {
          items: 2,
        },
        800:  {
          items: 3,
        },
        1050: {
          items: 4,
        },
      },
    });
  },
  leave: () => {
    $('.slide__items').owlCarousel('destroy').removeClass('owl-carousel');
  }
});
