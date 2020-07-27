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

    var onOutsideClick = function () {
      error.remove();
      document.removeEventListener('click', onOutsideClick);
    };

    errorButtonElement.addEventListener('click', function () {
      error.remove();
    });

    document.addEventListener('click', onOutsideClick);

    main.appendChild(error);
  };

  window.error = {
    renderError: renderError,
  };
})();
