'use strict';

(function () {

  var INITIAL_COORDS_MAINPIN = {
    y: 375,
    x: 570
  };
  var form = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var fieldsets = document.querySelectorAll('fieldset');
  var resetFormBtn = document.querySelector('.ad-form__reset');
  var formFilter = document.querySelector('.map__filters');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var rooms = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var options = capacity.querySelectorAll('option');

  var diactivateForm = function () {

    form.reset();
    formFilter.reset();

    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].classList.add('disabled');
    }
    if (window.map.map.classList.contains('map--faded') === false) {
      window.map.map.classList.add('map--faded');
    }
    window.map.removeAllPins();
    form.classList.add('ad-form--disabled');

    window.pin.moveMainPin(INITIAL_COORDS_MAINPIN.y, INITIAL_COORDS_MAINPIN.x);
    window.pin.insertAddressValue(window.pin.MAIN_PIN_HEIGHT_HALF, window.pin.MAIN_PIN_HEIGHT_HALF);

    if (window.map.map.querySelector('.map__card')) {
      window.map.map.querySelector('.map__card').remove();
    };
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

  resetFormBtn.addEventListener('click', diactivateForm);

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

  timein.addEventListener('change', function () {
    timeout.value = timein.value;
  });

  timeout.addEventListener('change', function () {
    timein.value = timeout.value;
  });

  rooms.addEventListener('change', function () {
    switch (rooms.value) {
      case '1':
        console.log('test');
        for (var i = 0; i < options.length; i++) {
          if (options[i].value !== '1') {
            options[i].remove();
          }
        }
        break;
      case '2':
        console.log('2');
        for (var j = 0; j < options.length; j++) {
          if (options[j].value !== '2' && options[j].value !== '1') {
            console.log(options[j].value);
            options[j].remove();
          }
        }
        break;
    }

    // if (rooms.value === '1') {
    // } else if (rooms.value === '1')
  });

  window.form = {
    form: form,
    diactivateForm: diactivateForm,
    activatePage: activatePage,
    mapFilters: mapFilters
  };


})();
