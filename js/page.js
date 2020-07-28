'use strict';

(function () {
  var isActive = true;

  var activate = function () {
    if (isActive === true) {
      return;
    }

    isActive = true;

    window.adForm.activate();
    window.map.activate();
    window.backend.load(
        function onLoadSuccess(response) {
          window.filtersForm.activate();
          window.pin.onLoad(response);
        },
        function onLoadError() {}
    );
  };

  var deactivate = function () {
    if (isActive === false) {
      return;
    }

    isActive = false;

    window.adForm.deactivate();
    window.card.removeCard();
    window.filtersForm.deactivate();
    window.mainPin.resetPin();
    window.map.deactivate();
    window.pin.removePins();
  };

  window.page = {
    activate: activate,
    deactivate: deactivate,
  };
})();
