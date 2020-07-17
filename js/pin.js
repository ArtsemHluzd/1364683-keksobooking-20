'use strict';

(function () {

  var MAP_PIN_WIDTH = 50;
  var MAP_PIN_HEIGHT = 70;
  var fragment = document.createDocumentFragment();
  var ADS_LENGTH = 5;
  var mapPins = document.querySelector('.map__pins');

  var renderPin = function (ads) {
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
        // createCardAd(pins[i]);
        console.log(ads[i]);
        console.log(ads);
      });
      fragment.appendChild(pin);
      mapPins.appendChild(fragment);
    };

    var createPins = function (ads) {
      var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
      for (var i = 0; i < ads.length; i++) {
        renderPin(ads[i]);
      }
    };
  };

  window.pin = {
    createPins: createPins,
    fragment: fragment
  };

})();
