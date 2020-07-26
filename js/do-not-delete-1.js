'use strict';

(function () {
  var mapElement = window.mapElement;

  var ads = [];
  var filteredPins = [];
  var filteredByType = [];
  var filteredByPrice = [];

  var removeAllPins = function () {
    for (var i = pins.length - 1; i > 0; i--) {
      pins[1].parentNode.removeChild(pins[1]);
    }
    if (mapElement.querySelector('.map__card')) {
      mapElement.querySelector('.map__card').remove();
    }
  };

  var renderAllPins = function (ads) {
    var firstFivePins = ads.filter(function (elem, i) {
      return i < 5;
    });
    window.pin.createPins(firstFivePins);
  };

  var updatePins = function () {
    removeAllPins();
    filteredPins = filteredByType.concat(filteredByPrice);
    window.pin.createPins(filteredPins);
  };

  var debounce = function (cb) {
    var lastTimeout;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, 500);
  };

  var onSuccessLoad = function (data) {
    ads = data;
    filteredPins = data;
    renderAllPins(ads);
  };
})();
