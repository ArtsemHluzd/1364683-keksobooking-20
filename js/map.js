'use strict';

(function () {
  var mapElement = document.querySelector('.map');

  var activateMap = function () {
    mapElement.classList.remove('map--faded');
  }

  var deactivateMap = function () {
    mapElement.classList.add('map--faded');
  }

  deactivateMap();

  window.map = {
    activateMap: activateMap,
    deactivateMap: deactivateMap,
  };
})();
