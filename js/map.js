'use strict';

(function () {

  var mapPins = document.querySelector('.map__pins');
  var pins = mapPins.getElementsByClassName('map__pin');
  var notice = document.querySelector('.notice');
  var noticeTitle = document.querySelector('.notice__title');
  var map = document.querySelector('.map');
  var ads = [];
  var filteredPins = [];
  var filteredByType = [];
  var filteredByPrice = [];

  var removeAllPins = function () {
    for (var i = pins.length - 1; i > 0; i--) {
      pins[1].parentNode.removeChild(pins[1]);
    }
    if (map.querySelector('.map__card')) {
      map.querySelector('.map__card').remove();
    }
  };

  var renderAllPins = function () {
    var firstFivePins = ads.filter(function (elem, i) {
      return i < 5;
    });
    window.pin.createPins(firstFivePins);
  };

  var updatePins = function () {
    removeAllPins();


    filteredPins = filteredByType.concat(filteredByPrice);
    // console.log(filteredPins);
    // for (var i = 0; i < filteredPins.length; i++) {
    // console.log(filteredPins[i].offer.price);
    // }
    window.pin.createPins(filteredPins);
  };

  var debounce = function (cb) {
    var lastTimeout;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, 500);
  };


  var houseType = document.querySelector('#housing-type');
  houseType.addEventListener('change', function () {
    if (houseType.value === 'any') {
      filteredByType = ads.filter(function (item) {
        return item.offer.type;
      });
    } else {
      filteredByType = ads.filter(function (item) {
        return item.offer.type === houseType.value;
      });
    }
    debounce(updatePins);
  });

  var housePrice = document.querySelector('#housing-price');
  housePrice.addEventListener('change', function () {
    if (housePrice.value === 'low') {
      filteredByPrice = ads.filter(function (it) {
        return it.offer.price <= 10000;
      });
    } else if (housePrice.value === 'middle') {
      filteredByPrice = ads.filter(function (it) {
        return it.offer.price > 10000 && it.offer.price < 50000;
      });
    } else if (housePrice.value === 'high') {
      filteredByPrice = ads.filter(function (it) {
        return it.offer.price >= 50000;
      });
    } else if (housePrice.value === 'any') {
      filteredByPrice = ads.filter(function (it) {
        return it.offer.price;
      });
    }
    debounce(updatePins);
  });

  var onSuccessLoad = function (data) {
    ads = data;
    filteredPins = data;
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
    map: map,
    onSuccessLoad: onSuccessLoad,
    onErrorLoad: onErrorLoad,
    notice: notice
  };

})();
