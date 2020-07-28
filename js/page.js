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
        function onLoadError(resopnse) {
          alert('Что-то пошло не так. Обратитесь в техническую поддержку');
        }
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

  deactivate();

  window.page = {
    activate: activate,
    deactivate: deactivate,
  };
})();
