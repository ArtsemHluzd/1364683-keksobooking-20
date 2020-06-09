'use strict';

var MAP_PIN_Y_MIN = 130;
var MAP_PIN_Y_MAX = 630;

// сразу скажу, что вынес эту переменную в глобальную область, т.к. использую ее в 2-ух функциях
var mapPins = document.querySelector('.map__pins');

var getRandomInt = function (min, max) {
  return Math.round(Math.random() * (max - min) + 1);
};

var getRandomElement = function (arr) {
  var random = getRandomInt(0, arr.length - 1);
  return arr[random];
};

var getRandomArr = function (arr) {
  var randomArr = [];
  var randomInt = getRandomInt(0, arr.length - 1);
  for (var i = 0; i < randomInt; i++) {
    randomArr.push(arr[i]);
  }
  return randomArr;
};

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

var AVAILABLE_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalo'];

var createAds = function () {
  var arrAds = [];
  for (var i = 0; i < 8; i++) {
    var xx = '0' + (i + 1);
    var title = 'Обьявление№ ' + (i + 1);
    var price = getRandomInt(10000, 50000);
    var type = getRandomElement(HOUSING_TYPES);
    var rooms = getRandomInt(1, 3);
    var guests = getRandomInt(1, 2);
    var checkin = getRandomElement(AVAILABLE_TIMES);
    var feature = getRandomArr(FEATURES);
    var photo = getRandomArr(PHOTOS);
    console.log(FEATURES, PHOTOS);
    var description = title + '. ' + 'Стоимость ' + price + ' RUB';
    var x = getRandomInt(0, mapPins.clientWidth);
    var y = getRandomInt(MAP_PIN_Y_MIN, MAP_PIN_Y_MAX);
    console.log(y);

    var ad = createAd(xx, title, price, type, rooms, guests, checkin, feature, description, photo, x, y);
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
var ads = createAds();
createPins(ads);
