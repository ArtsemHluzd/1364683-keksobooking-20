'use strict';

(function () {

  var MAP_PIN_MAIN = 65;
  var addressInput = document.querySelector('#address');
  var mainPin = document.querySelector('.map__pin--main');
  var housingRoomsSelect = document.querySelector('#housing-rooms');
  var housingGuestsSelect = document.querySelector('#housing-guests');
  var form = document.querySelector('.ad-form');
  var mapPins = document.querySelector('.map__pins');
  // var mapFilters = document.querySelector('.map__filters');
  var fieldsets = document.querySelectorAll('fieldset');
  var map = document.querySelector('.map');
  var notice = document.querySelector('.notice');
  var noticeTitle = document.querySelector('.notice__title');
  var ads = [];
  var filteredAds = [];

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

  var onSuccessLoad = function (data) {
    ads = data;
    filteredAds = ads.filter(function (elem, i) {
      return i < 5;
    });
    window.pin.createPins(filteredAds);
  };

  var onError = function () {
    var errorDiv = document.createElement('div');
    errorDiv.innerHTML = 'Что-то пошло не так';
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '30px';
    errorDiv.align = 'center';
    notice.insertBefore(errorDiv, noticeTitle);
  };

  var activatePage = function (evt) {
    if (evt.which === 1) {
      mapPins.appendChild(window.pin.fragment);

      map.classList.remove('map--faded');
      window.form.form.classList.remove('ad-form--disabled');
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].classList.remove('disabled');
      }
      window.backend.load(onSuccessLoad, onError);
    }
  };

  var onSuccessSave = function () {
    diactivateForm();
    insertAddressValueInitial();
  };


  var typeOfHouse;

  var updateAds = function () {

    var pins = mapPins.getElementsByClassName('map__pin');
    for (var i = pins.length; i > 0; i--) {
      pins[0].parentNode.removeChild(pins[0]);
    }

    filteredAds = ads.filter(function (item) {
      return item.offer.type === typeOfHouse;
    });
    window.pin.createPins(filteredAds);

  };


  var houseType = document.querySelector('#housing-type');
  houseType.addEventListener('change', function (evt) {
    typeOfHouse = evt.target.value;
    updateAds();
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onSuccessSave, onError);
  });


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
