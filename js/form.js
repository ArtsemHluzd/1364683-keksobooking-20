'use strict';

(function () {

  var formResetButton = document.querySelector('.ad-form__reset');
  var form = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var fieldsets = document.querySelectorAll('fieldset');


  var diactivateForm = function () {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].classList.add('disabled');
    }
    if (window.map.map.classList.contains('map--faded') === false) {
      window.map.map.classList.add('map--faded');
    }
    window.map.removeAllPins();
    form.classList.add('ad-form--disabled');
  };

  var emptyForm = function () {
    var title = form.querySelector('#title');
    var price = form.querySelector('#price');
    var roomNumber = form.querySelector('#room_number');
    title.value = '';
    price.value = '';
    roomNumber.value = '1';
  };

  var activatePage = function (evt) {
    if (evt.which === 1 || evt.key === 'Enter') {

      window.map.map.classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].classList.remove('disabled');
      }
      window.backend.load(window.map.onSuccessLoad, window.map.onErrorLoad);

      formResetButton.addEventListener('click', emptyForm);
    }
  };

  var onSuccessSave = function () {
    diactivateForm();
    window.validation.renderSuccessMessage();
  };

  var onErrorSave = function () {
    window.validation.renderErrorMessage();
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onSuccessSave, onErrorSave);
  });


  window.form = {
    form: form,
    diactivateForm: diactivateForm,
    activatePage: activatePage,
    emptyForm: emptyForm,
    mapFilters: mapFilters
  };


})();
