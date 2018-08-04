const originalTitle = $('#part .popup__title').html();

$('.catalog__button').on('click', (e) => {
  const type = $(e.delegateTarget).data('type');

  $('#part .popup__title').html(originalTitle + ' ' + type);

  $.magnificPopup.open({
    items: {
      type: 'inline',
      src:  '#part'
    }
  });
});