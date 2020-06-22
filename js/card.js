'use strict';

(function () {
  var MAP_WIDTH = 1200;
  var MAP_Y_MIN = 130;
  var MAP_Y_MAX = 630;
  var MAP_PIN_WIDTH = 50;
  var MAP_PIN_HEIGHT = 70;

  var AVAILABLE_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalo'];

  var createAd = function (xx, title, price, type, rooms, guests, checkin, feature, description, photos, x, y) {
    var ad =
    {
      author:
      {
        avatar: 'img/avatars/user' + xx + '.png',
      },
      offer:
      {
        title: title,
        address: x + ', ' + y,
        price: price,
        type: type,
        rooms: rooms,
        guests: guests,
        checkin: checkin,
        checkout: checkin,
        features: feature,
        description: description,
        photos: photos
      },
      location: {
        x: x,
        y: y
      }
    };
    return ad;
  };

  var createAds = function () {
    var arrAds = [];
    for (var i = 0; i < 8; i++) {
      var xx = '0' + (i + 1);
      var title = 'Обьявление№ ' + (i + 1);
      var price = window.common.getRandomInt(10000, 50000);
      var type = window.common.getRandomElement(HOUSING_TYPES);
      var rooms = window.common.getRandomInt(1, 3);
      var guests = window.common.getRandomInt(1, 2);
      var checkin = window.common.getRandomElement(AVAILABLE_TIMES);
      var feature = window.common.getRandomArr(FEATURES);
      var photo = window.common.getRandomArr(PHOTOS);

      var description = title + '. ' + 'Стоимость ' + price + ' RUB';
      var x = window.common.getRandomInt(MAP_PIN_WIDTH, MAP_WIDTH - MAP_PIN_WIDTH);
      var y = window.common.getRandomInt(MAP_Y_MIN + MAP_PIN_HEIGHT, MAP_Y_MAX + MAP_PIN_HEIGHT);

      var ad = createAd(xx, title, price, type, rooms, guests, checkin, feature, description, photo, x, y);
      arrAds.push(ad);
    }
    return arrAds;
  };

  window.card = {
    createAds: createAds,
    MAP_PIN_WIDTH: MAP_PIN_WIDTH,
    MAP_PIN_HEIGHT: MAP_PIN_HEIGHT
  };

})();
