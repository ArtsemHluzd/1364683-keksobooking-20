'use strict';

(function () {
  var housingRoomsSelect = document.querySelector('#housing-rooms');
  var housingGuestsSelect = document.querySelector('#housing-guests');
  console.log(housingRoomsSelect);

  window.form.form.addEventListener('submit', function () {

    var selectRooms = housingRoomsSelect.value;
    var selectGuests = housingGuestsSelect.value;

    if (selectRooms === 1 && selectGuests !== 1) {
      housingRoomsSelect.setCustomValidity('Вы можете выбрать для 1 гостя');
    } else if (selectRooms === 2 && selectGuests !== 1 && selectGuests !== 2) {
      housingRoomsSelect.setCustomValidity('Вы можете выбрать для 1 гостя или для 2 гостей');
    } else if (selectRooms === 3 && selectGuests !== 1 && selectGuests !== 2 && selectGuests !== 3) {
      housingRoomsSelect.setCustomValidity('Вы можете выбрать для 1 гостя, для 2 или 3 гостей');
    } else {
      housingRoomsSelect.setCustomValidity('Вы можете выбрать только нет гостей');
    }
  });

  var renderSuccessMessage = function () {
    var fragment = document.createDocumentFragment();
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var success = successTemplate.cloneNode(true);
    fragment.appendChild(success);
    window.form.notice.appendChild(fragment);

    var onClickRemoveSuccess = function () {
      success.remove();
      window.removeEventListener('click', onClickRemoveSuccess);
      window.removeEventListener('click', onKeydownRemoveSuccess);
    };

    var onKeydownRemoveSuccess = function (evt) {
      if (evt.key === 'Escape') {
        success.remove();
        window.removeEventListener('click', onKeydownRemoveSuccess);
        window.removeEventListener('click', onClickRemoveSuccess);
      }
    };

    window.addEventListener('click', onClickRemoveSuccess);
    window.addEventListener('keydown', onKeydownRemoveSuccess);
  };

  var renderErrorMessage = function () {
    var fragment = document.createDocumentFragment();
    var errorTemaplate = document.querySelector('#error').content.querySelector('.error');
    var error = errorTemaplate.cloneNode(true);
    fragment.appendChild(error);
    window.form.notice.appendChild(error);

    var onClickRemoveError = function () {
      error.remove();
      window.removeEventListener('click', onClickRemoveError);
      window.removeEventListener('keydown', onKeydownRemoveError);
      errorButton.removeEventListener('click', onClickRemoveError);
    };

    var onKeydownRemoveError = function (evt) {
      if (evt.key === 'Escape') {
        error.remove();
        window.removeEventListener('click', onClickRemoveError);
        window.removeEventListener('keydown', onKeydownRemoveError);
        errorButton.removeEventListener('click', onClickRemoveError);
      }
    };

    var errorButton = error.querySelector('.error__button');
    window.addEventListener('click', onClickRemoveError);
    window.addEventListener('keydown', onKeydownRemoveError);
    errorButton.addEventListener('click', onClickRemoveError);
  };

  window.validation = {
    renderErrorMessage: renderErrorMessage,
    renderSuccessMessage: renderSuccessMessage
  };

})();
