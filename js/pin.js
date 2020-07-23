'use strict';

(function () {

  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_HEIGHT_HALF = 65 / 2;
  var MAP_PIN_WIDTH = 50;
  var MAP_PIN_HEIGHT = 70;
  var MAP_Y_MIN = 130;
  var MAP_Y_MAX = 630;
  var mainPin = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');
  var ADS_LENGTH = 5;
  var mapPins = document.querySelector('.map__pins');

  var createPins = function (ads) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < ads.length; i++) {
      if (i < ADS_LENGTH) {
        var pin = pinTemplate.cloneNode(true);


        var left = ads[i].location.x - (MAP_PIN_WIDTH / 2);
        var topPin = ads[i].location.y - MAP_PIN_HEIGHT;
        var style = 'left: ' + left + 'px; top: ' + topPin + 'px';
        window.common.changeAttribute(pin, 'style', style);
        var avatar = pin.querySelector('img');
        var src = ads[i].author.avatar;
        var alt = ads[i].offer.title;
        window.common.changeAttribute(avatar, 'src', src);
        window.common.changeAttribute(avatar, 'alt', alt);

        pin.addEventListener('click', function () {
          if (document.querySelector('.map__card') === null) {
            window.card.renderCardAd(ads[0]);
          }
        });

        fragment.appendChild(pin);
      }
    }
    mapPins.appendChild(fragment);
  };

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.form.activatePage(evt);
    }
  });

  var insertAddressValue = function (leftTo, topTo) {

    var left = mainPin.offsetLeft + leftTo;
    var top = mainPin.offsetTop + topTo;
    console.log(mainPin.offsetLeft);
    console.log(mainPin.offsetTop);

    var addressValue = Math.round(left) + ', ' + Math.round(top);
    addressInput.value = addressValue;
  };

  var moveMainPin = function (top, left) {
    mainPin.style.left = left + 'px';
    mainPin.style.top = top + 'px';
  };

  mainPin.addEventListener('mousedown', function (evt) {
    window.form.activatePage(evt);
    evt.preventDefault();

    var startCoords = {
      y: evt.clientY,
      X: evt.clientX
    };

    var onMousemoveMainPin = function (moveEvt) {
      moveEvt.preventDefault();

      if ((moveEvt.pageY - MAIN_PIN_HEIGHT / 2) > MAP_Y_MIN
        && (moveEvt.pageY - MAP_PIN_HEIGHT / 2) < MAP_Y_MAX) {
        // ограничение по Y реализовал, а по X не могу
        // && moveEvt.pageX > 0
        // && moveEvt.pageX < mainPin.parentNode.offsetWidth)
        var shift = {
          y: startCoords.y - moveEvt.clientY,
          x: startCoords.x - moveEvt.clientX
        };

        startCoords = {
          y: moveEvt.clientY,
          x: moveEvt.clientX
        };

        var top = (mainPin.offsetTop - shift.y);
        var left = (mainPin.offsetLeft - shift.x);

        moveMainPin(top, left);
        insertAddressValue(MAIN_PIN_HEIGHT_HALF, MAIN_PIN_HEIGHT);

      }

    };

    var onMouseupMainPin = function (upEvt) {
      upEvt.preventDefault();

      insertAddressValue(MAIN_PIN_HEIGHT_HALF, MAIN_PIN_HEIGHT);

      window.removeEventListener('mousemove', onMousemoveMainPin);
      window.removeEventListener('mouseup', onMouseupMainPin);
    };

    window.addEventListener('mousemove', onMousemoveMainPin);
    window.addEventListener('mouseup', onMouseupMainPin);
  });


  window.pin = {
    createPins: createPins,
    insertAddressValue: insertAddressValue,
    moveMainPin: moveMainPin,
    MAP_PIN_WIDTH: MAP_PIN_WIDTH,
    MAP_PIN_HEIGHT: MAP_PIN_HEIGHT,
    MAIN_PIN_HEIGHT_HALF: MAIN_PIN_HEIGHT_HALF,
    mainPin: mainPin,
  };

})();
