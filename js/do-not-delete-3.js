'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var type = window.form.form.querySelector('#type');
  var price = window.form.form.querySelector('#price');

  // window.form.form.addEventListener('submit', function () {

  //   var selectRooms = window.form.rooms.value;
  //   var selectGuests = window.form.rooms.value;

  //   if (selectRooms === 1 && selectGuests !== 1) {
  //     window.form.capacity.setCustomValidity('Вы можете выбрать для 1 гостя');
  //   } else if (selectRooms === 2 && selectGuests !== 1 && selectGuests !== 2) {
  //     window.form.capacity.setCustomValidity('Вы можете выбрать для 1 гостя или для 2 гостей');
  //   } else if (selectRooms === 3 && selectGuests !== 1 && selectGuests !== 2 && selectGuests !== 3) {
  //     window.form.capacity.setCustomValidity('Вы можете выбрать для 1 гостя, для 2 или 3 гостей');
  //   } else {
  //     window.form.capacity.setCustomValidity('Вы можете выбрать только нет гостей');
  //   }
  // });

  var renderSuccessMessage = function () {
    var fragment = document.createDocumentFragment();
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var success = successTemplate.cloneNode(true);
    fragment.appendChild(success);
    window.map.notice.appendChild(fragment);

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
    window.map.notice.appendChild(error);

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

  window.form.imagesInput.addEventListener('change', function () {
    var image = window.form.imagesInput.files[0];
    var imageName = image.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return imageName.endsWith(it);
    });

    if (matches === false) {
      alert("Можно загрузить только изображения следующих форматов: 'gif', 'jpg', 'jpeg', 'png'. Пожалуста, загрузите другой файл");
    }
  });

  console.log(type.value);
  type.addEventListener('change', function () {
    if (type.value === 'bungalo') {
      price.setAttribute('min', '0');
      price.setAttribute('placeholder', '0');
    } else if (type.value === 'flat') {
      price.setAttribute('min', '1000');
      price.setAttribute('placeholder', '1000');
    } else if (type.value === 'house') {
      price.setAttribute('min', '5000');
      price.setAttribute('placeholder', '5000');
    } else if (type.value === 'palace') {
      price.setAttribute('min', '10000');
      price.setAttribute('placeholder', '10000');
    }
  });

  window.validation = {
    renderErrorMessage: renderErrorMessage,
    renderSuccessMessage: renderSuccessMessage
  };

})();
