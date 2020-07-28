'use strict';

(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

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
    renderMessage: renderError,
  };
})();
