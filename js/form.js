'use strict';

(function () {

  var MAP_PIN_MAIN = 65;
  var formResetButton = document.querySelector('.ad-form__reset');
  var addressInput = document.querySelector('#address');
  var mainPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var mapPins = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters');
  var fieldsets = document.querySelectorAll('fieldset');
  var map = document.querySelector('.map');
  var notice = document.querySelector('.notice');
  var noticeTitle = document.querySelector('.notice__title');
  var pins = mapPins.getElementsByClassName('map__pin');
  var ads = [];
  var filteredAds = [];


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

  var onErrorLoad = function () {
    var errorDiv = document.createElement('div');
    errorDiv.innerHTML = 'Что-то пошло не так';
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '30px';
    errorDiv.align = 'center';
    notice.insertBefore(errorDiv, noticeTitle);
  };

  var activatePage = function (evt) {
    if (evt.which === 1) {

      map.classList.remove('map--faded');
      window.form.form.classList.remove('ad-form--disabled');
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].classList.remove('disabled');
      }
      window.backend.load(onSuccessLoad, onErrorLoad);

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
    emptyForm: emptyForm,
    notice: notice,
    mapFilters: mapFilters
  };


})();
