'use strict';

(function () {
  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 70;
  var PIN_MIN_X = 0;
  var PIN_MAX_X = 1200;
  var PIN_MIN_Y = 130;
  var PIN_MAX_Y = 630;
  var PIN_INITIAL_X = 570;
  var PIN_INITIAL_Y = 375;
  var mainPinElement = document.querySelector('.map__pin--main');

  var resetPin = function () {
    mainPinElement.style.left = PIN_INITIAL_X + 'px';
    mainPinElement.style.top = PIN_INITIAL_Y + 'px';
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      if (mainPinElement.offsetLeft < PIN_MIN_X) {
        mainPinElement.style.left = PIN_MIN_X - PIN_WIDTH / 2 + 'px';
      }

      if (mainPinElement.offsetLeft > PIN_MAX_X - PIN_WIDTH / 2) {
        mainPinElement.style.left = PIN_MAX_X - PIN_WIDTH / 2 + 'px';
      }

      if (mainPinElement.offsetTop < PIN_MIN_Y) {
        mainPinElement.style.top = PIN_MIN_Y + 'px';
      }

      if (mainPinElement.offsetTop > PIN_MAX_Y) {
        mainPinElement.style.top = PIN_MAX_Y + 'px';
      }

      var x = mainPinElement.offsetLeft - shift.x;
      var y = mainPinElement.offsetTop - shift.y;

      mainPinElement.style.left = x + 'px';
      mainPinElement.style.top = y + 'px';

      window.adForm.setFormAddress(x + PIN_WIDTH / 2, y + PIN_HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    window.page.activate();
  };

  mainPinElement.addEventListener('mousedown', onMouseDown);
  mainPinElement.addEventListener('keydown', function (evt) {
    if (evt.key.toUpperCase() === 'ENTER') {
      window.page.activate();
    }
  });

  window.mainPin = {
    PIN_INITIAL_X: PIN_INITIAL_X,
    PIN_INITIAL_Y: PIN_INITIAL_Y,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    resetPin: resetPin,
  };
})();
