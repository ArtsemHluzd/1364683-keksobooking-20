'use strict';

(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  // 2.7. Если при отправке данных произошла ошибка запроса, показывается
  // соответствующее сообщение. Разметку сообщения, которая находится в блоке
  // #error в шаблоне template, нужно разместить в <main>. Сообщение должно
  // исчезать после нажатия на кнопку .error__button, по нажатию на клавишу Esc и
  // по клику на произвольную область экрана за пределами блока с сообщением.
  var renderError = function () {
    var error = errorTemplate.cloneNode(true);
    var errorButtonElement = error.querySelector('.error__button');

    var onOutsideClickCloseError = function () {
      error.remove();
      document.removeEventListener('click', onOutsideClickCloseError);
      document.removeEventListener('keydown', onKeydownCloseError);
      errorButtonElement.removeEventListener('click', onOutsideClickCloseError);
    };

    var onKeydownCloseError = function (evt) {
      if (evt.key === 'Escape') {
        error.remove();
        document.removeEventListener('click', onOutsideClickCloseError);
        document.removeEventListener('keydown', onKeydownCloseError);
        errorButtonElement.removeEventListener('click', onOutsideClickCloseError);
      }
    };

    errorButtonElement.addEventListener('click', onOutsideClickCloseError);
    document.addEventListener('click', onOutsideClickCloseError);
    document.addEventListener('keydown', onKeydownCloseError);

    main.appendChild(error);
  };

  window.error = {
    renderError: renderError,
  };
})();
