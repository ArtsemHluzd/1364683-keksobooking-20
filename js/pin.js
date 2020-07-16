'use strict';

(function () {

  var MAP_PIN_WIDTH = 50;
  var MAP_PIN_HEIGHT = 70;
  var fragment = document.createDocumentFragment();
  var ADS_LENGTH = 5;
  var mapPins = document.querySelector('.map__pins');

  var createPins = function (ads) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

    for (var i = 0; i < ads.length; i++) {
      if (i < 5) {
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

        fragment.appendChild(pin);
      }
    }
    mapPins.appendChild(fragment);
  };

  window.pin = {
    createPins: createPins,
    fragment: fragment
  };

})();
