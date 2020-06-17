'use strict';

var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;
var MAP_PIN_MAIN = 65;


var MAP_WIDTH = 1200;
var MAP_Y_MIN = 130;
var MAP_Y_MAX = 630;

var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var fragment = document.createDocumentFragment();
var form = document.querySelector('.ad-form');
var mainPin = document.querySelector('.map__pin--main');
var fieldsets = document.querySelectorAll('fieldset');
var mapFilters = document.querySelector('.map__filters');
var addressInput =  document.querySelector('#address');
var housingRoomsSelect = document.querySelector('#housing-rooms');
var housingGuestsSelect = document.querySelector('#housing-guests');  


var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (arr) {
  var random = getRandomInt(0, arr.length - 1);
  return arr[random];
};

var getRandomArr = function (arr) {
  var randomArr = [];
  for (var i = 0; i < getRandomInt(0, arr.length - 1); i++) {
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

    var description = title + '. ' + 'Стоимость ' + price + ' RUB';
    var x = getRandomInt(MAP_PIN_WIDTH, MAP_WIDTH - MAP_PIN_WIDTH);
    var y = getRandomInt(MAP_Y_MIN + MAP_PIN_HEIGHT, MAP_Y_MAX + MAP_PIN_HEIGHT);

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


    var left = ads[i].location.x - (MAP_PIN_WIDTH / 2);
    var topPin = ads[i].location.y - MAP_PIN_HEIGHT;
    var style = 'left: ' + left + 'px; top: ' + topPin + 'px';
    changeAttribute(pin, 'style', style);

    var avatar = pin.querySelector('img');
    var src = ads[i].author.avatar;
    var alt = ads[i].offer.title;
    changeAttribute(avatar, 'src', src);
    changeAttribute(avatar, 'alt', alt);

    fragment.appendChild(pin);
  }
};

var diactivateForm = function () {
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].classList.add('disabled');
  }
};

var insertAddressValue = function () {
  mainPin.addEventListener('mousemove', function () {
    var left = mainPin.getBoundingClientRect().left - map.getBoundingClientRect().left - (MAP_PIN_WIDTH / 2);
    var top = mainPin.getBoundingClientRect().top - MAP_PIN_HEIGHT + pageYOffset;
    var addressValue = Math.round(left) + ' , ' + Math.round(top);
    addressInput.value = addressValue;
  });
};

var insertAddressValueInitial = function () {
  var left = mainPin.getBoundingClientRect().left - map.getBoundingClientRect().left + (MAP_PIN_MAIN / 2);
  var top = mainPin.getBoundingClientRect().top + pageYOffset + (MAP_PIN_MAIN / 2);
  var addressValue = Math.round(left) + ' , ' + Math.round(top);
  addressInput.value = addressValue;
};


var ads = createAds();
createPins(ads);
diactivateForm(); 
insertAddressValueInitial();


mainPin.addEventListener('mousedown', function (evt) {
  activatePage(evt);
  insertAddressValue();
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activatePage();
    insertAddressValue();
  }
});

var activatePage = function (evt) {
  if (evt.which  === 1) {
  mapPins.appendChild(fragment);

  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].classList.remove('disabled');
  }
  mapFilters.remove('ad-filters--disables');
  }
};


form.addEventListener('change', function () {
 if (housingRoomsSelect.value === 1 && housingGuestsSelect !== 1) {
  housingRoomsSelect.setCustomValidity('Вы можете выбрать для 1 гостя');
 } else if (housingRoomsSelect.value === 2 && housingGuestsSelect !== 1 && housingGuestsSelect !== 2) {
  housingRoomsSelect.setCustomValidity('Вы можете выбрать для 1 гостя или для 2 гостей');
 } else if (housingRoomsSelect.value === 3 && housingGuestsSelect !== 1 && housingGuestsSelect !== 2 && housingGuestsSelect !== 3) {
  housingRoomsSelect.setCustomValidity('Вы можете выбрать для 1 гостя, для 2 или 3 гостей');
 } else {
  housingRoomsSelect.setCustomValidity('Вы можете выбрать только нет гостей');
 }
});

