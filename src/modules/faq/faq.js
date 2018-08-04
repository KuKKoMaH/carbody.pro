const activeClass = 'faq__item--active';
$('.faq__question').on('click', function(e) {
  var $item = $(e.target).parent();
  if ($item.hasClass(activeClass)) {
    $item.find('.faq__answer').css('max-height', 0);
  } else {
    var $text = $item.find('.faq__text');
    $item.find('.faq__answer').css('max-height', $text.outerHeight());
  }
  $item.toggleClass(activeClass);
});

