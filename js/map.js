'use strict';

(function () {
  var mapElement = document.querySelector('.map');

  var activateMap = function () {
    mapElement.classList.remove('map--faded');
  };

  var deactivateMap = function () {
    mapElement.classList.add('map--faded');
  };

  window.map = {
    activate: activateMap,
    deactivate: deactivateMap,
    mapElement: mapElement
  };
})();
