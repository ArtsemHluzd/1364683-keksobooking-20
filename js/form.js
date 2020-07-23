'use strict';

(function () {

  var form = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var fieldsets = document.querySelectorAll('fieldset');

  var diactivateForm = function () {

    form.reset();

    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].classList.add('disabled');
    }
    if (window.map.map.classList.contains('map--faded') === false) {
      window.map.map.classList.add('map--faded');
    }
    window.map.removeAllPins();
    form.classList.add('ad-form--disabled');
    window.pin.insertAddressValue(window.pin.MAIN_PIN_HEIGHT_HALF, window.pin.MAIN_PIN_HEIGHT_HALF);
  };

  diactivateForm();

  var activatePage = function (evt) {
    if (evt.which === 1 || evt.key === 'Enter') {

      window.map.map.classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].classList.remove('disabled');
      }
      window.backend.load(window.map.onSuccessLoad, window.map.onErrorLoad);

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
    window.backend.save(new FormData(form), onSuccessSave, onErrorSave);
    evt.preventDefault();
  });

  window.form = {
    form: form,
    diactivateForm: diactivateForm,
    activatePage: activatePage,
    mapFilters: mapFilters
  };


})();
