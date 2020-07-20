'use strict';

(function () {

  var MAP_PIN_MAIN = 65;
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

  var insertAddressValue = function () {
    mainPin.addEventListener('mousedown', function () {
      mainPin.addEventListener('mousemove', function () {
        var boundPin = mainPin.getBoundingClientRect().left;
        var boundMap = window.map.map.getBoundingClientRect().left;
        var boundPinTop = mainPin.getBoundingClientRect().top;
        var left = boundPin - boundMap - (MAP_PIN_WIDTH / 2);
        var top = boundPinTop - MAP_PIN_HEIGHT + pageYOffset;
        var addressValue = Math.round(left) + ', ' + Math.round(top);
        addressInput.value = addressValue;
      });
    });
  };

  var insertAddressValueInitial = function () {
    var left = mainPin.getBoundingClientRect().left - window.map.map.getBoundingClientRect().left + (MAP_PIN_MAIN / 2);
    var top = mainPin.getBoundingClientRect().top + pageYOffset + (MAP_PIN_MAIN / 2);
    var addressValue = Math.round(left) + ', ' + Math.round(top);
    addressInput.value = addressValue;
  };


  window.pin = {
    createPins: createPins,
    MAP_PIN_WIDTH: MAP_PIN_WIDTH,
    MAP_PIN_HEIGHT: MAP_PIN_HEIGHT,
    insertAddressValue: insertAddressValue,
    insertAddressValueInitial: insertAddressValueInitial,
    mainPin: mainPin
  };

})();
