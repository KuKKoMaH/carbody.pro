import 'selectize';

$('.input__input')
  .on('focus', (e) => {
    const $el = $(e.delegateTarget);
    $el.parents('.input').addClass('input--focus');
  })
  .on('blur', (e) => {
    const $el = $(e.delegateTarget);
    setTimeout(() => {
      if (!$el.val()) $el.parents('.input').removeClass('input--focus');
    }, 0);
  });

if (!window.CATALOG_URL) throw new Error('CATALOG_URL not found.');

var parentage = {
  brand: 'model',
  model: 'generation'
};

var selectizeConfig = {
  allowEmptyOption: true,
  labelField:       'title',
  valueField:       'title',
  searchField:      ['title'],
  sortField:        'title',
  onChange:         function (title) {

    var type = this.$input.data('type');
    var child = parentage[type];
    if (!child) return;

    var form = this.$wrapper.parents('form');
    var $child = form.find('[data-type="' + child + '"]');
    if (!$child.length) return;

    if (!title) $child[0].selectize.disable();
    clearChilds(form, type);

    var value = this.options[title];
    if (!value) return;

    $child[0].selectize.load(function (cb) {
      $.get(CATALOG_URL[child], { parent: value.id }, cb);
    });
    $child[0].selectize.enable();
  }
};

$('.form__wrapper').on('submit', function (e) {
  e.preventDefault();
  var $form = $(this);
  var $popup = $("#request");
  var fields = getForm($form);

  // $popup.find('.form__select').text(formatText(fields));
  for (var key in fields) {
    const $input = $popup.find('[name="' + key + '"]');
    const selectize = $input.data('selectize');
    if (selectize) {
      selectize.setValue(fields[key])
    } else {
      $input.val(fields[key]);
    }
  }

  $.magnificPopup.open({
    items: {
      type: 'inline',
      src:  '#request'
    }
  });
  return false;
});

$('.form__select').selectize(selectizeConfig);

$.get(CATALOG_URL.brand, function (res) {
  $('.form__select[data-type="brand"]').each(function () {
    this.selectize.load(function (cb) {
      cb(res);
    });
    this.selectize.enable();
  })
});

$.get(CATALOG_URL.body, function (res) {
  $('.form__select[data-type="body"]').each(function () {
    this.selectize.load(function (cb) {
      cb(res);
    });
    this.selectize.enable();
  })
});

$.get(CATALOG_URL.part, function (res) {
  $('.form__select[data-type="part"]').each(function () {
    this.selectize.load(function (cb) {
      cb(res);
    });
    this.selectize.enable();
  })
});

function getForm($form) {
  var fields = $form.serializeArray();
  var res = {};
  for (var i = 0; i < fields.length; i++) {
    res[fields[i].name] = fields[i].value;
  }
  return res;
}

function formatText(form) {
  if ($.isEmptyObject(form)) return '';
  var text = 'Вы выбрали: ';
  if (form.count) text += form.count;
  if (form.brand || form.model || form.generation || form.body) text += ' на ';
  if (form.brand) text += form.brand + ' ';
  if (form.model && !form.generation) text += form.model + ' ';
  if (form.generation) text += form.generation + ' ';
  if (form.body) text += form.body;
  return text;
}

function clearChilds(form, type) {
  var child = type;
  while (child = parentage[child]) {
    var $child = form.find('[data-type="' + child + '"]');
    $child[0].selectize.setValue();
  }
}