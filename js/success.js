'use strict';

(function () {
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  // 2.6. Если отправка данных прошла успешно, показывается соответствующее
  // сообщение. Разметку сообщения, которая находится блоке #success внутри
  // шаблона template, нужно разместить в <main>. Сообщение должно исчезать по
  // нажатию на клавишу Esc и по клику на произвольную область экрана за пределами
  // блока с сообщением.
  var renderSuccess = function () {
    var success = successTemplate.cloneNode(true);

    var onOutsideClick = function () {
      success.remove();
      document.removeEventListener('click', onOutsideClick);
    };

    document.addEventListener('click', onOutsideClick);

    main.appendChild(success);
  };

  window.success = {
    renderSuccess: renderSuccess,
  };
})();
