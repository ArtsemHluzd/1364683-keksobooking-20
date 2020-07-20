'use strict';

(function () {

  var MAP_PIN_MAIN = 65;
  var formResetButton = document.querySelector('.ad-form__reset');
  var addressInput = document.querySelector('#address');
  var form = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var fieldsets = document.querySelectorAll('fieldset');
  var map = document.querySelector('.map');

  var insertAddressValue = function () {
    window.map.mainPin.addEventListener('mousedown', function () {
      window.map.mainPin.addEventListener('mousemove', function () {
        var boundPin = window.map.mainPin.getBoundingClientRect().left;
        var boundMap = map.getBoundingClientRect().left;
        var boundPinTop = window.map.mainPin.getBoundingClientRect().top;
        var left = boundPin - boundMap - (window.pin.MAP_PIN_WIDTH / 2);
        var top = boundPinTop - window.pin.MAP_PIN_HEIGHT + pageYOffset;
        var addressValue = Math.round(left) + ', ' + Math.round(top);
        addressInput.value = addressValue;
      });
    });
  };

  var insertAddressValueInitial = function () {
    var left = window.map.mainPin.getBoundingClientRect().left - map.getBoundingClientRect().left + (MAP_PIN_MAIN / 2);
    var top = window.map.mainPin.getBoundingClientRect().top + pageYOffset + (MAP_PIN_MAIN / 2);
    var addressValue = Math.round(left) + ', ' + Math.round(top);
    console.log(addressValue);
    addressInput.value = addressValue;
  };

  insertAddressValueInitial();


  var diactivateForm = function () {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].classList.add('disabled');
    }
    if (map.classList.contains('map--faded') === false) {
      map.classList.add('map--faded');
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
    if (evt.which === 1) {

      map.classList.remove('map--faded');
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
    insertAddressValueInitial();
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
    insertAddressValue: insertAddressValue,
    insertAddressValueInitial: insertAddressValueInitial,
    form: form,
    diactivateForm: diactivateForm,
    activatePage: activatePage,
    map: map,
    emptyForm: emptyForm,
    mapFilters: mapFilters
  };


})();
