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
  var formAvatarUpload = document.querySelector('#avatar');
  var formAvatarPreview = document.querySelector('.ad-form-header__preview');
  var imgAvatar = formAvatarPreview.querySelector('img');
  var formTitleElement = document.querySelector('#title');
  var formAddress = document.querySelector('#address');
  var formType = document.querySelector('#type');
  var formPrice = document.querySelector('#price');
  var formTimeIn = document.querySelector('#timein');
  var formTimeOut = document.querySelector('#timeout');
  var formRoomNumber = document.querySelector('#room_number');
  var formCapacity = document.querySelector('#capacity');
  var roomNumber = Number(formRoomNumber.value);
  var guestsNumber = Number(formCapacity.value);

  formAvatarUpload.addEventListener('change', function () {
    var file = formAvatarUpload.files[0];
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      imgAvatar.src = reader.result;
    });
    reader.readAsDataURL(file);
  });

  var activateForm = function () {
    formElement.classList.remove('ad-form--disabled');
  };

  var deactivateForm = function () {
    formElement.classList.add('ad-form--disabled');
  };

  var resetForm = function () {
    formElement.reset();
    formPrice.setAttribute('placeholder', 1000);
    imgAvatar.src = 'img/muffin-grey.svg';
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


  var getCustomValidationMessage = function (rooms, capacity) {
    var message = '';

    if (rooms === 1 && !(capacity > 0 && capacity <= 1)) {
      message = '1 комната — «для 1 гостя»';
    }

    if (rooms === 2 && !(capacity > 0 && capacity <= 2)) {
      message = '2 комнаты — «для 2 гостей» или «для 1 гостя»';
    }

    if (rooms === 3 && !(capacity > 0 && capacity <= 3)) {
      message = '3 комнаты — «для 3 гостей», «для 2 гостей» 3или «для 1 гостя»';
    }

    if (rooms === 100 && capacity !== 0) {
      message = '100 комнат — «не для гостей»';
    }

    return message;
  };

  var onSuccessSave = function () {
    window.page.deactivate();
    window.success.renderMessage();
  };

  var onErrorSave = function () {
    window.error.renderMessage();
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

  var validateRoomsAndGuests = function (room, guest) {
    if (
      (room === 1 && !(guest > 0 && guest <= 1)) ||
      (room === 2 && !(guest > 0 && guest <= 2)) ||
      (room === 3 && !(guest > 0 && guest <= 3)) ||
      (room === 100 && guest !== 0)
    ) {
      formCapacity.style.border = '2px solid red';
    } else {
      formCapacity.style.border = '1px solid #d9d9d3';
    }
  };

  formRoomNumber.addEventListener('change', function (evt) {
    roomNumber = Number(evt.target.value);
    var message = getCustomValidationMessage(roomNumber, guestsNumber);
    formCapacity.setCustomValidity(message);
    validateRoomsAndGuests(roomNumber, guestsNumber);
  });

  formCapacity.addEventListener('change', function (evt) {
    guestsNumber = Number(evt.target.value);
    var message = getCustomValidationMessage(roomNumber, guestsNumber);
    formCapacity.setCustomValidity(message);
    validateRoomsAndGuests(roomNumber, guestsNumber);
  });

  formTitleElement.addEventListener('change', function (evt) {
    if (evt.target.value.length < 30) {
      formTitleElement.style.border = '2px solid red';
    } else {
      formTitleElement.style.border = '1px solid #d9d9d3';
    }
  });

  formPrice.addEventListener('change', function (evt) {
    if (evt.target.value < Number(evt.target.min)) {
      formPrice.style.border = '2px solid red';
    } else {
      formPrice.style.border = '1px solid #d9d9d3';
    }
  });

  formCapacity.setCustomValidity(getCustomValidationMessage(roomNumber, guestsNumber));

  window.adForm = {
    activate: activate,
    deactivate: deactivate,
    setFormAddress: setFormAddress,
  };
})();
