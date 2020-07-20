'use strict';

(function () {

  var MAP_PIN_WIDTH = 50;
  var MAP_PIN_HEIGHT = 70;
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

  var moveMainPin = function () {
    mainPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        y: evt.clientY,
        X: evt.clientX
      };

      var onMousemoveMainPin = function (moveEvt) {
        moveEvt.preventDefault();

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

        mainPin.style.left = left + 'px';
        mainPin.style.top = top + 'px';

        var addressValue = Math.round(left) + ', ' + Math.round(top);
        addressInput.value = addressValue;
      };

      var onMouseupMainPin = function (upEvt) {
        upEvt.preventDefault();

        mainPin.removeEventListener('mousemove', onMousemoveMainPin);
        mainPin.removeEventListener('mouseup', onMouseupMainPin);
      };

      mainPin.addEventListener('mousemove', onMousemoveMainPin);
      mainPin.addEventListener('mouseup', onMouseupMainPin);
    });
  };


  window.pin = {
    createPins: createPins,
    MAP_PIN_WIDTH: MAP_PIN_WIDTH,
    MAP_PIN_HEIGHT: MAP_PIN_HEIGHT,
    mainPin: mainPin,
    moveMainPin: moveMainPin
  };

})();
