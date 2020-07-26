'use strict';

(function() {
  var filtersFormElement = document.querySelector('.map__filters');
  var filtersFormFieldSetElements = filtersFormElement.querySelectorAll('fieldset');
  var filtersFormSelectElements = filtersFormElement.querySelectorAll('select');

  var resetForm = function () {
    filtersFormElement.reset();
  }

  var disableFiltersFormFieldSets = function () {
    for (var i = 0; i < filtersFormFieldSetElements.length; i++) {
      filtersFormFieldSetElements[i].setAttribute('disabled', true);
    }
  };

  var enableFiltersFormFieldSets = function () {
    for (var i = 0; i < filtersFormFieldSetElements.length; i++) {
      filtersFormFieldSetElements[i].removeAttribute('disabled');
    }
  };

  var disableFiltersFormSelects = function () {
    for (var i = 0; i < filtersFormSelectElements.length; i++) {
      filtersFormSelectElements[i].setAttribute('disabled', true);
    }
  };

  var enableFiltersFormSelects = function () {
    for (var i = 0; i < filtersFormSelectElements.length; i++) {
      filtersFormSelectElements[i].removeAttribute('disabled');
    }
  };

  disableFiltersFormFieldSets();
  disableFiltersFormSelects();

  window.filtersForm = {
    resetForm: resetForm,
    enableFiltersFormFieldSets: enableFiltersFormFieldSets,
    disableFiltersFormFieldSets: disableFiltersFormFieldSets,
    enableFiltersFormSelects: enableFiltersFormSelects,
    disableFiltersFormSelects: disableFiltersFormSelects,
  };
})()
