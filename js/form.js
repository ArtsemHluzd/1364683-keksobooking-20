'use strict';

(function () {

  var MAP_PIN_MAIN = 65;
  var formResetButton = document.querySelector('.ad-form__reset');
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
  var pins = mapPins.getElementsByClassName('map__pin');
  var ads = [];
  var filteredAds = [];

  form.addEventListener('submit', function () {

    var selectRooms = housingRoomsSelect.value;
    var selectGuests = housingGuestsSelect.value;

    if (selectRooms === 1 && selectGuests !== 1) {
      housingRoomsSelect.setCustomValidity('Вы можете выбрать для 1 гостя');
    } else if (selectRooms === 2 && selectGuests !== 1 && selectGuests !== 2) {
      housingRoomsSelect.setCustomValidity('Вы можете выбрать для 1 гостя или для 2 гостей');
    } else if (selectRooms === 3 && selectGuests !== 1 && selectGuests !== 2 && selectGuests !== 3) {
      housingRoomsSelect.setCustomValidity('Вы можете выбрать для 1 гостя, для 2 или 3 гостей');
    } else {
      housingRoomsSelect.setCustomValidity('Вы можете выбрать только нет гостей');
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
    if (map.classList.contains('map--faded') === false) {
      map.classList.add('map--faded');
    }
    removeAllPins();
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

  var renderAllPins = function () {
    filteredAds = ads.filter(function (elem, i) {
      return i < 5;
    });
    window.pin.createPins(filteredAds);
  };

  var onSuccessLoad = function (data) {
    ads = data;
    renderAllPins();
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
      // mapPins.appendChild(window.pin.fragment);

      map.classList.remove('map--faded');
      window.form.form.classList.remove('ad-form--disabled');
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].classList.remove('disabled');
      }
      window.backend.load(onSuccessLoad, onError);

      formResetButton.addEventListener('click', emptyForm);
    }
  };


  var renderSuccessMessage = function () {
    var fragment = document.createDocumentFragment();
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var success = successTemplate.cloneNode(true);
    fragment.appendChild(success);
    notice.appendChild(fragment);

    var onClickRemoveSuccess = function () {
      success.remove();
      window.removeEventListener('click', onClickRemoveSuccess);
      window.removeEventListener('click', onKeydownRemoveSuccess);
    };

    var onKeydownRemoveSuccess = function (evt) {
      if (evt.key === 'Escape') {
        success.remove();
        window.removeEventListener('click', onKeydownRemoveSuccess);
        window.removeEventListener('click', onClickRemoveSuccess);
      }
    }

    window.addEventListener('click', onClickRemoveSuccess);
    window.addEventListener('keydown', onKeydownRemoveSuccess);
  };

  var renderErrorMessage = function () {
    var fragment = document.createDocumentFragment();
    var errorTemaplate = document.querySelector('#error').content.querySelector('.error');
    var error = errorTemaplate.cloneNode(true);
    fragment.appendChild(error);
    notice.appendChild(error);

    var onClickRemoveError = function () {
      error.remove();
      window.removeEventListener('click', onClickRemoveError);
      window.removeEventListener('keydown', onKeydownRemoveError);
      errorButton.removeEventListener('click', onClickRemoveError);
    };

    var onKeydownRemoveError = function (evt) {
      if (evt.key === 'Escape') {
        error.remove();
        window.removeEventListener('click', onClickRemoveError);
        window.removeEventListener('keydown', onKeydownRemoveError);
        errorButton.removeEventListener('click', onClickRemoveError);
      }
    };

    var errorButton = error.querySelector('.error__button');
    window.addEventListener('click', onClickRemoveError);
    window.addEventListener('keydown', onKeydownRemoveError);
    errorButton.addEventListener('click', onClickRemoveError);
  };

  var onSuccessSave = function () {
    diactivateForm();
    insertAddressValueInitial();
    renderSuccessMessage();
  };

  var onErrorSave = function () {
    renderErrorMessage();
  };

  var removeAllPins = function () {
    for (var i = pins.length - 1; i > 0; i--) {
      pins[1].parentNode.removeChild(pins[1]);
    }
  };

  var typeOfHouse;

  var updateAds = function () {

    removeAllPins();

    filteredAds = ads.filter(function (item) {
      return item.offer.type === typeOfHouse;
    });
    console.log(filteredAds);
    window.pin.createPins(filteredAds);

  };


  var houseType = document.querySelector('#housing-type');
  houseType.addEventListener('change', function (evt) {
    typeOfHouse = evt.target.value;
    if (typeOfHouse === 'any') {
      renderAllPins();
    } else {
      updateAds();
    }
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onSuccessSave, onErrorSave);
  });


  window.form = {
    insertAddressValue: insertAddressValue,
    insertAddressValueInitial: insertAddressValueInitial,
    mainPin: mainPin,
    form: form,
    diactivateForm: diactivateForm,
    activatePage: activatePage,
    map: map,
    ads: ads,
    emptyForm: emptyForm
  };


})();
