'use strict';

(function () {
  var MinPriceMap = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000,
  };
  var formElement = document.querySelector('.ad-form');
  var formFieldSetElements = formElement.querySelectorAll('fieldset');
  var formResetElement = document.querySelector('.ad-form__reset');
  var formAddress = document.querySelector('#address');
  var formType = document.querySelector('#type');
  var formPrice = document.querySelector('#price');
  var formTimeIn = document.querySelector('#timein');
  var formTimeOut = document.querySelector('#timeout');
  var formRoomNumber = document.querySelector('#room_number');
  var formCapacity = document.querySelector('#capacity');

  var activateForm = function () {
    formElement.classList.remove('ad-form--disabled');
  };

  var deactivateForm = function () {
    formElement.classList.add('ad-form--disabled');
  };

  var resetForm = function () {
    formElement.reset();
  };

  var disableFormFieldSets = function () {
    window.common.disableElements(formFieldSetElements);
  };

  var enableFormFieldSets = function () {
    window.common.enableElements(formFieldSetElements);
  };

  var setFormAddress = function (x, y) {
    formAddress.value = Math.round(x) + ', ' + Math.round(y);
  };

  var activate = function () {
    var x = window.mainPin.PIN_INITIAL_X + window.mainPin.PIN_WIDTH / 2;
    var y = window.mainPin.PIN_INITIAL_Y + window.mainPin.PIN_HEIGHT;

    activateForm();
    enableFormFieldSets();
    setFormAddress(x, y);
  };

  var deactivate = function () {
    var x = window.mainPin.PIN_INITIAL_X + window.mainPin.PIN_WIDTH / 2;
    var y = window.mainPin.PIN_INITIAL_Y + window.mainPin.PIN_WIDTH / 2;

    deactivateForm();
    disableFormFieldSets();
    resetForm();
    setFormAddress(x, y);
  };


  var getCustomValidationMessage = function (roomNumber, capacity) {
    var message = '';

    if (roomNumber === 1 && !(capacity > 0 && capacity <= 1)) {
      message = '1 комната — «для 1 гостя»';
    }

    if (roomNumber === 2 && !(capacity > 0 && capacity <= 2)) {
      message = '2 комнаты — «для 2 гостей» или «для 1 гостя»';
    }

    if (roomNumber === 3 && !(capacity > 0 && capacity <= 3)) {
      message = '3 комнаты — «для 3 гостей», «для 2 гостей» 3или «для 1 гостя»';
    }

    if (roomNumber === 100 && capacity !== 0) {
      message = '100 комнат — «не для гостей»';
    }

    return message;
  };

  var onSuccessSave = function () {
    window.page.deactivate();
    window.success.renderSuccess();
  };

  var onErrorSave = function () {
    window.error.renderError();
  };

  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(formElement), onSuccessSave, onErrorSave);
  });

  formResetElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.page.deactivate();
  });

  formType.addEventListener('change', function (evt) {
    var min = MinPriceMap[evt.target.value.toUpperCase()];
    formPrice.setAttribute('min', min);
    formPrice.setAttribute('placeholder', min);
  });

  formTimeIn.addEventListener('change', function (evt) {
    formTimeOut.value = evt.target.value;
  });

  formTimeOut.addEventListener('change', function (evt) {
    formTimeIn.value = evt.target.value;
  });

  formRoomNumber.addEventListener('change', function (evt) {
    var message = getCustomValidationMessage(
        Number(evt.target.value),
        Number(formCapacity.value)
    );
    formCapacity.setCustomValidity(message);
  });

  formCapacity.addEventListener('change', function (evt) {
    var message = getCustomValidationMessage(
        Number(formRoomNumber.value),
        Number(evt.target.value)
    );
    formCapacity.setCustomValidity(message);
  });

  formCapacity.setCustomValidity(
      getCustomValidationMessage(
          Number(formRoomNumber.value),
          Number(formCapacity.value)
      )
  );

  window.adForm = {
    activate: activate,
    deactivate: deactivate,
    setFormAddress: setFormAddress,
  };
})();
