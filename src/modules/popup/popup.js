require('jquery.maskedinput/src/jquery.maskedinput.js');
require('magnific-popup');
var styles = require('../../js/styles');

$('.' + styles.popup.opener).magnificPopup({
  type: 'inline',
});

$('.' + styles.popup.input).mask("(999) 999-99-99");