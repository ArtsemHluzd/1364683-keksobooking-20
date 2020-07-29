'use strict';

(function () {
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var renderSuccess = function () {
    var success = successTemplate.cloneNode(true);

    var removeHandlersAndSuccess = function () {
      success.remove();
      document.removeEventListener('click', onOutsideClickCloseSuccess);
      document.removeEventListener('keydown', onKeydownCloseSuccess);
    };

    var onOutsideClickCloseSuccess = function () {
      removeHandlersAndSuccess();
    };

    var onKeydownCloseSuccess = function (evt) {
      if (evt.key === 'Escape') {
        removeHandlersAndSuccess();
      }
    };

    document.addEventListener('click', onOutsideClickCloseSuccess);
    document.addEventListener('keydown', onKeydownCloseSuccess);

    main.appendChild(success);
  };

  window.success = {
    renderMessage: renderSuccess,
  };
})();
