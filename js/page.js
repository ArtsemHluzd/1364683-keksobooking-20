'use strict';

(function () {
  var activatePage = function() {
    window.map.activateMap();
    window.adForm.activateForm();
    window.adForm.enableFormFieldSets();
    window.filtersForm.enableFiltersFormFieldSets();
    window.filtersForm.enableFiltersFormSelects();
  };

  var deactivatePage = function() {
    window.map.deactivateMap();
    window.adForm.deactivateForm();
    window.adForm.disableFormFieldSets();
    window.filtersForm.disableFiltersFormFieldSets();
    window.filtersForm.disableFiltersFormSelects();
  };

  window.page = {
    activatePage: activatePage,
    deactivatePage: deactivatePage,
  };
})();
