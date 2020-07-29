'use strict';

(function () {
  var isActive = true;
  var notice = document.querySelector('.notice');

  var activate = function () {
    if (isActive === true) {
      return;
    }

    isActive = true;

    window.adForm.activate();
    window.map.activate();
    window.backend.load(
        function onLoadSuccess(response) {
          window.filtersForm.activate();
          window.pin.onLoad(response);
        },
        function onLoadError() {
          var div = document.createElement('div');
          div.textContent = 'Что-то пошло не так. Обратитесь в техническую поддержку';
          div.style.color = 'red';
          div.style.margin = 'auto';
          div.style.fontSize = '26px';
          div.style.border = '2px solid red';
          div.style.padding = '5px';
          notice.prepend(div);
        }
    );
  };

  var deactivate = function () {
    if (isActive === false) {
      return;
    }

    isActive = false;

    window.adForm.deactivate();
    window.card.remove();
    window.filtersForm.deactivate();
    window.mainPin.resetPin();
    window.map.deactivate();
    window.pin.remove();
  };

  deactivate();

  window.page = {
    activate: activate,
    deactivate: deactivate,
  };
})();
