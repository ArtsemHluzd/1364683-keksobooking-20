'use strict';

// сразу скажу, что вынес эту переменную в глобальную область, т.к. использую ее в 2-ух функциях
var mapPins = document.querySelector('.map__pins');

var getRandomInt = function (min, max) {
  return Math.round(Math.random() * (max - min) + 1);
};

var getRandomElement = function (arr) {
  var random = getRandomInt(0, arr.length - 1);
  return arr[random];
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
    var type = getRandomElement(types);
    var rooms = getRandomInt(1, 3);
    var guests = getRandomInt(1, 3);
    var checkin = getRandomElement(checkinArr);
    var feature = getRandomElement(features);
    var photo = getRandomElement(photos);
    var description = title + '. ' + 'Стоимость ' + price + ' RUB';
    var x = getRandomInt(0, mapPins.clientWidth);
    var y = getRandomInt(0, mapPins.clientHeight - 100);

    var ad = createAd(xx, title, price, type, rooms, guests, checkin, feature, description, photo, x, y + 100);
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

var setValueOfElement = function (card, selector, value) {
  var element = card.querySelector(selector);
  if (selector === '.popup__type') {
    if (value === 'flat') {
      value = 'Квартира';
    } else if (value === 'bungalo') {
      value = 'Бунгало';
    } else if (value === 'house') {
      value = 'Дом';
    } else if (value === 'palace') {
      value = 'Дворец';
    } element.textContent = value;
  } else {
    element.textContent = value;
  }
};

// var setPhotos = function (card, selector, value) {
//   var element = card.querySelector(selector);
//   var childElement = element.querySelector('img');
//   childElement.element.remove();
//   console.log(element);
//   for (var i = 0; i < value.length; i++) {
//   element.add(childElement);

//   }
// };

var renderCards = function (ads, map) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardsArr = [];

  for (var i = 0; i < ads.length; i++) {
    var card = cardTemplate.cloneNode(true);
    var ad = ads[i];
    // setPhotos(card, '.popup__photos', ad.offer.photos);
    // setFeatures();
    setValueOfElement(card, '.popup__title', ad.offer.title);
    setValueOfElement(card, '.popup__text--address', ad.offer.address);
    setValueOfElement(card, '.popup__text--price', ad.offer.price + '₽/день');
    setValueOfElement(card, '.popup__type', ad.offer.type);
    var capacity = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    setValueOfElement(card, '.popup__text--capacity', capacity);
    var time = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    setValueOfElement(card, '.popup__text--time', time);
    setValueOfElement(card, '.popup__description', ad.offer.description);
    console.log(card);
    cardsArr.push(card);
  }

  console.log(cardsArr);
  var mapFilters = map.querySelector('.map__filters-container');
  mapFilters.insertAdjacentHTML('beforeBegin', cardsArr);
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var ads = createArrAds();
createPins(ads);
renderCards(ads, map);
