'use strict';

// сразу скажу, что вынес эту переменную в глобальную область, т.к. использую ее в 2-ух функциях
var mapPins = document.querySelector('.map__pins');

var getRandomInt = function (min, max) {
  return Math.round(Math.random() * (max - min) + 1);
};

var createAd = function (xx, title, price, type, rooms, guests, checkin, features, description, photos, x, y) {
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
      features: features,
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

var checkinArr = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var types = ['palace', 'flat', 'house', 'bungalo'];

var createArrAds = function () {
  var arrAds = [];
  for (var i = 0; i < 8; i++) {
    var xx = '0' + (i + 1);
    var title = 'Обьявление№ ' + (i + 1);
    var price = getRandomInt(10000, 50000);
    var IntForTypes = getRandomInt(0, types.length - 1);
    var type = types[IntForTypes];
    var rooms = getRandomInt(1, 3);
    var guests = getRandomInt(1, 2);
    var IntForCheckin = getRandomInt(0, checkinArr.length - 1);
    var IntForFeatures = getRandomInt(0, features.length - 1);
    var feature = features.slice(0, IntForFeatures);
    var description = title + '. ' + 'Стоимость ' + price + ' RUB';
    // var IntForPhotos = getRandomInt(0, 2);
    var x = getRandomInt(0, mapPins.clientWidth);
    var y = getRandomInt(0, mapPins.clientHeight - 100);
    var ad = createAd(xx, title, price, type, rooms, guests, checkinArr[IntForCheckin], feature, description, photos[1], x, y + 100);
    arrAds.push(ad);
  }
  return arrAds;
};

var changeAttribute = function (element, attribute, value) {
  element.removeAttribute(attribute);
  element.setAttribute(attribute, value);
};

var createPins = function (ads) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  for (var i = 0; i < ads.length; i++) {
    var pin = pinTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();

    var left = ads[i].location.x - (pin.clientWidth / 2);
    var topPin = ads[i].location.y - pin.clientHeight;
    var style = 'left: ' + left + 'px; top: ' + topPin + 'px';
    changeAttribute(pin, 'style', style);

    var avatar = pin.querySelector('img');
    var src = ads[i].author.avatar;
    var alt = ads[i].offer.title;
    changeAttribute(avatar, 'src', src);
    changeAttribute(avatar, 'alt', alt);

    fragment.appendChild(pin);
    mapPins.appendChild(fragment);
  }
};


var map = document.querySelector('.map');
map.classList.remove('map--faded');
var ads = createArrAds();
createPins(ads);
