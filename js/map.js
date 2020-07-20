'use strict';

(function () {

  var mapPins = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var pins = mapPins.getElementsByClassName('map__pin');
  var notice = document.querySelector('.notice');
  var noticeTitle = document.querySelector('.notice__title');
  var ads = [];
  var filteredAds = [];

  mainPin.addEventListener('mousedown', function (evt) {
    window.form.activatePage(evt);
    window.form.insertAddressValue();
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.form.activatePage();
      window.form.insertAddressValue();
    }
  });

  var removeAllPins = function () {
    for (var i = pins.length - 1; i > 0; i--) {
      pins[1].parentNode.removeChild(pins[1]);
    }
  };

  var renderAllPins = function () {
    filteredAds = ads.filter(function (elem, i) {
      return i < 5;
    });
    window.pin.createPins(filteredAds);
  };

  var updatePins = function () {

    removeAllPins();
    filteredAds = ads.filter(function (item) {
      return item.offer.type === typeOfHouse;
    });
    window.pin.createPins(filteredAds);
  };

  var typeOfHouse;
  var houseType = document.querySelector('#housing-type');
  houseType.addEventListener('change', function (evt) {
    typeOfHouse = evt.target.value;
    if (typeOfHouse === 'any') {
      renderAllPins();
    } else {
      updatePins();
    }
  });

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

  window.map = {
    removeAllPins: removeAllPins,
    ads: ads,
    onSuccessLoad: onSuccessLoad,
    onErrorLoad: onErrorLoad,
    mainPin: mainPin
  };

})();
