'use strict';

(function () {
  var mainPinElement = document.querySelector('.map__pin--main');

  var INITIAL_X = mainPinElement.offsetLeft;
  var INITIAL_Y = mainPinElement.offsetTop;

  var resetPin = function () {
    mainPinElement.style.left = INITIAL_X + 'px';
    mainPinElement.style.top = INITIAL_Y + 'px';
  };

  var onMouseDown = function(evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var x = (mainPinElement.offsetLeft - shift.x);
      var y = (mainPinElement.offsetTop - shift.y);

      mainPinElement.style.left = x + 'px';
      mainPinElement.style.top = y + 'px';

      // FIXME: координаты острого конца метки
      window.adForm.setFormAddress(x, y);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    window.page.activatePage();
  };

  mainPinElement.addEventListener('mousedown', onMouseDown);

  window.adForm.setFormAddress(INITIAL_X, INITIAL_Y);

  window.mainPin = {
    INITIAL_X: INITIAL_X,
    INITIAL_Y: INITIAL_Y,
    resetPin: resetPin,
  };
})();

// (function () {
//
//   var MAIN_PIN_HEIGHT = 65;
//   var MAIN_PIN_HEIGHT_HALF = 65 / 2;
//   var MAP_PIN_WIDTH = 50;
//   var MAP_PIN_HEIGHT = 70;
//   var MAP_Y_MIN = 130;
//   var MAP_Y_MAX = 630;
//   var MAP_X_MIN = 0;
//   var MAP_X_MAX = 1200;
//   var mainPin = document.querySelector('.map__pin--main');
//   var addressInput = document.querySelector('#address');
//   var ADS_LENGTH = 5;
//   var mapPins = document.querySelector('.map__pins');
//
//   var createPins = function (ads) {
//     var pinTemplate = document.querySelector('#pinTemplate').content.querySelector('.map__pin');
//     var fragment = document.createDocumentFragment();
//
//     var renderPin = function (ad) {
//       if (i < ADS_LENGTH) {
//
//         var pin = pinTemplate.cloneNode(true);
//
//         var left = ad.location.x - (MAP_PIN_WIDTH / 2);
//         var topPin = ad.location.y - MAP_PIN_HEIGHT;
//         var style = 'left: ' + left + 'px; top: ' + topPin + 'px';
//         window.common.changeAttribute(pin, 'style', style);
//         var avatar = pin.querySelector('img');
//         var src = ad.author.avatar;
//         var alt = ad.offer.title;
//         window.common.changeAttribute(avatar, 'src', src);
//         window.common.changeAttribute(avatar, 'alt', alt);
//
//         var onClickRenderCard = function () {
//           var buttons = document.querySelectorAll('.map__pin');
//           for (var i = 1; i < buttons.length; i++) {
//             buttons[i].classList.remove('map__pin--active');
//           }
//           pin.classList.add('map__pin--active');
//           if (document.querySelector('.map__card') === null) {
//             window.card.renderCardAd(ads[i]);
//           } else {
//             document.querySelector('.map__card').remove();
//             window.card.renderCardAd(ads[i]);
//           }
//         };
//
//         pin.addEventListener('click', onClickRenderCard);
//
//         fragment.appendChild(pin);
//       }
//     };
//
//     for (var i = 0; i < ads.length; i++) {
//       renderPin(ads[i]);
//     }
//     mapPins.appendChild(fragment);
//   };
//
//   mainPin.addEventListener('keydown', function (evt) {
//     if (evt.key === 'Enter') {
//       window.form.activatePage(evt);
//     }
//   });
//
//   var insertAddressValue = function (leftTo, topTo) {
//
//     var left = mainPin.offsetLeft + leftTo;
//     var top = mainPin.offsetTop + topTo;
//     var addressValue = Math.round(left) + ', ' + Math.round(top);
//     addressInput.value = addressValue;
//   };
//
//   var moveMainPin = function (top, left) {
//     mainPin.style.left = left + 'px';
//     mainPin.style.top = top + 'px';
//   };
//
//   mainPin.addEventListener('mousedown', function (evt) {
//     window.form.activatePage(evt);
//     evt.preventDefault();
//
//     var startCoords = {
//       y: evt.clientY,
//       X: evt.clientX
//     };
//
//     var onMousemoveMainPin = function (moveEvt) {
//       moveEvt.preventDefault();
//
//       var shift = {
//         y: startCoords.y - moveEvt.clientY,
//         x: startCoords.x - moveEvt.clientX
//       };
//
//       startCoords = {
//         y: moveEvt.clientY,
//         x: moveEvt.clientX
//       };
//
//       if (mainPin.offsetLeft > (MAP_X_MAX - MAIN_PIN_HEIGHT / 2)) {
//         mainPin.style.left = (MAP_X_MAX - MAIN_PIN_HEIGHT / 2) + 'px';
//       }
//
//       if (mainPin.offsetLeft < MAP_X_MIN - (MAIN_PIN_HEIGHT / 2)) {
//         mainPin.style.left = (MAP_X_MIN - (MAIN_PIN_HEIGHT / 2)) + 'px';
//       }
//
//       if (mainPin.offsetTop < MAP_Y_MIN) {
//         mainPin.style.top = MAP_Y_MIN + 'px';
//       }
//
//       if (mainPin.offsetTop > MAP_Y_MAX + MAIN_PIN_HEIGHT - 20) {
//         mainPin.style.top = (MAP_Y_MAX + MAIN_PIN_HEIGHT - 20) + 'px';
//       }
//
//       var top = (mainPin.offsetTop - shift.y);
//       var left = (mainPin.offsetLeft - shift.x);
//
//       moveMainPin(top, left);
//       insertAddressValue(MAIN_PIN_HEIGHT_HALF, MAIN_PIN_HEIGHT);
//
//       //  }
//
//     };
//
//     var onMouseupMainPin = function (upEvt) {
//       upEvt.preventDefault();
//
//       insertAddressValue(MAIN_PIN_HEIGHT_HALF, MAIN_PIN_HEIGHT);
//
//       window.removeEventListener('mousemove', onMousemoveMainPin);
//       window.removeEventListener('mouseup', onMouseupMainPin);
//     };
//
//     window.addEventListener('mousemove', onMousemoveMainPin);
//     window.addEventListener('mouseup', onMouseupMainPin);
//   });
//
//   window.pin = {
//     createPins: createPins,
//     insertAddressValue: insertAddressValue,
//     moveMainPin: moveMainPin,
//     MAP_PIN_WIDTH: MAP_PIN_WIDTH,
//     MAP_PIN_HEIGHT: MAP_PIN_HEIGHT,
//     MAIN_PIN_HEIGHT_HALF: MAIN_PIN_HEIGHT_HALF,
//     mainPin: mainPin,
//   };
//
// })();
