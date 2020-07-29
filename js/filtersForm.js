'use strict';

(function () {
  var filtersFormElement = document.querySelector('.map__filters');
  var filtersFormFieldSetElements = filtersFormElement.querySelectorAll('fieldset');
  var filtersFormSelectElements = filtersFormElement.querySelectorAll('select');
  var SELECT_DEFAULT_VALUE = 'any';

  var resetForm = function () {
    filtersFormElement.reset();
  };

  var disableFiltersFormFieldSets = function () {
    window.common.disableElements(filtersFormFieldSetElements);
  };

  var enableFiltersFormFieldSets = function () {
    window.common.enableElements(filtersFormFieldSetElements);
  };

  var disableFiltersFormSelects = function () {
    window.common.disableElements(filtersFormSelectElements);
  };

  var enableFiltersFormSelects = function () {
    window.common.enableElements(filtersFormSelectElements);
  };

  var activate = function () {
    enableFiltersFormFieldSets();
    enableFiltersFormSelects();
  };

  var deactivate = function () {
    disableFiltersFormFieldSets();
    disableFiltersFormSelects();
    resetForm();
  };

  var typeFilter = function (type, offer) {
    return type === SELECT_DEFAULT_VALUE || type === offer.type;
  };

  var roomsFilter = function (rooms, offer) {
    return rooms === SELECT_DEFAULT_VALUE || Number(rooms) === offer.rooms;
  };

  var guestsFilter = function (guests, offer) {
    return guests === SELECT_DEFAULT_VALUE || Number(guests) === offer.guests;
  };

  var priceFilter = function (price, offer) {
    switch (price) {
      case 'middle':
        return offer.price >= 10000 && offer.price <= 50000;

      case 'low':
        return offer.price <= 10000;

      case 'high':
        return offer.price >= 50000;

      default:
        return true;
    }
  };

  var featuresFilter = function (features, offer) {
    var isExsistsFeatures = offer.features.filter(function (it) {
      return features.includes(it);
    });

    return isExsistsFeatures.length === features.length;
  };

  filtersFormElement.addEventListener('change', function () {
    var formData = new FormData(filtersFormElement);

    var filter = {
      type: formData.get('housing-type'),
      price: formData.get('housing-price'),
      rooms: formData.get('housing-rooms'),
      guests: formData.get('housing-guests'),
      features: formData.getAll('features'),
    };

    window.pin.filter(filter);
  });

  window.filtersForm = {
    activate: activate,
    deactivate: deactivate,
    typeFilter: typeFilter,
    roomsFilter: roomsFilter,
    guestsFilter: guestsFilter,
    priceFilter: priceFilter,
    featuresFilter: featuresFilter,
  };
})();
