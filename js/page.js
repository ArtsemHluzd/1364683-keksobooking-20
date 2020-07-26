'use strict';

(function () {
  var pageIsActive = false;

  var activatePage = function() {
    if (pageIsActive === false) {
      window.map.activateMap();

      window.adForm.activateForm();
      window.adForm.enableFormFieldSets();
      window.adForm.setFormAddress(
        window.mainPin.INITIAL_X + window.mainPin.PIN_WIDTH / 2,
        window.mainPin.INITIAL_Y + window.mainPin.PIN_HEIGHT
      );

      window.backend.load(
        function (response) {
          window.ads.onLoad(response)

          window.filtersForm.enableFiltersFormFieldSets();
          window.filtersForm.enableFiltersFormSelects();
        },
        function () {}
      );

      pageIsActive = true;
    }
  };

  var deactivatePage = function() {
    if (pageIsActive === true) {
      window.map.deactivateMap();

      window.adForm.deactivateForm();
      window.adForm.disableFormFieldSets();
      window.adForm.resetForm();
      window.adForm.setFormAddress(
        window.mainPin.INITIAL_X + window.mainPin.PIN_WIDTH / 2,
        window.mainPin.INITIAL_Y + window.mainPin.PIN_WIDTH / 2
      );

      window.filtersForm.disableFiltersFormFieldSets();
      window.filtersForm.disableFiltersFormSelects();
      window.filtersForm.resetForm();

      window.ads.removeCard();
      window.ads.removePins();

      window.mainPin.resetPin();

      pageIsActive = false;
    }
  };

  deactivatePage();

  window.page = {
    activatePage: activatePage,
    deactivatePage: deactivatePage,
  };
})();
