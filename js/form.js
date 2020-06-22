'use strict';

(function () {

  var MAP_PIN_MAIN = 65;
  var addressInput = document.querySelector('#address');
  var mainPin = document.querySelector('.map__pin--main');
  var housingRoomsSelect = document.querySelector('#housing-rooms');
  var housingGuestsSelect = document.querySelector('#housing-guests');
  var form = document.querySelector('.ad-form');
  var mapPins = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters');
  var fieldsets = document.querySelectorAll('fieldset');
  var map = document.querySelector('.map');

  form.addEventListener('submit', function () {

    var selectRooms = housingRoomsSelect.value;
    var selectGuests = housingGuestsSelect.value;

    if (selectRooms === 1 && selectGuests !== 1) {
      selectRooms.setCustomValidity('Вы можете выбрать для 1 гостя');
    } else if (selectRooms === 2 && selectGuests !== 1 && selectGuests !== 2) {
      selectRooms.setCustomValidity('Вы можете выбрать для 1 гостя или для 2 гостей');
    } else if (selectRooms === 3 && selectGuests !== 1 && selectGuests !== 2 && selectGuests !== 3) {
      selectRooms.setCustomValidity('Вы можете выбрать для 1 гостя, для 2 или 3 гостей');
    } else {
      selectRooms.setCustomValidity('Вы можете выбрать только нет гостей');
    }
  });


  var insertAddressValue = function () {
    mainPin.addEventListener('mousemove', function () {
      var boundPin = mainPin.getBoundingClientRect().left;
      var boundMap = map.getBoundingClientRect().left;
      var boundPinTop = mainPin.getBoundingClientRect().top;
      var left = boundPin - boundMap - (window.card.MAP_PIN_WIDTH / 2);
      var top = boundPinTop - window.card.MAP_PIN_HEIGHT + pageYOffset;
      var addressValue = Math.round(left) + ' , ' + Math.round(top);
      addressInput.value = addressValue;
    });
  };

  var insertAddressValueInitial = function () {
    var left = mainPin.getBoundingClientRect().left - map.getBoundingClientRect().left + (MAP_PIN_MAIN / 2);
    var top = mainPin.getBoundingClientRect().top + pageYOffset + (MAP_PIN_MAIN / 2);
    var addressValue = Math.round(left) + ' , ' + Math.round(top);
    addressInput.value = addressValue;
  };

  var diactivateForm = function () {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].classList.add('disabled');
    }

  };

  var activatePage = function (evt) {
    if (evt.which === 1) {
      mapPins.appendChild(window.pin.fragment);

      map.classList.remove('map--faded');
      window.form.form.classList.remove('ad-form--disabled');
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].classList.remove('disabled');
      }
      mapFilters.remove('ad-filters--disables');
    }
  };

  window.form = {
    insertAddressValue: insertAddressValue,
    insertAddressValueInitial: insertAddressValueInitial,
    mainPin: mainPin,
    form: form,
    diactivateForm: diactivateForm,
    activatePage: activatePage,
    map: map
  };


})();
