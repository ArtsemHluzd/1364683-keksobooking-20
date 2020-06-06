'use strict';

var createAd = function (xx, title, price, type, rooms, guests, checkin, features, description, photos, x, y) {
  var ad =
  {
    author:
    {
      avatar: 'img/ avatars / user' + xx
    },
    offer:
    {
      title: title,
      address: location.x + ', ' + location.y,
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

var createArrAds = function () {
  var arrAds = [];
  for (var i = 0; i < 8; i++) {
    var ad = createAd();
    arrAds.push(ad);
  }
  return arrAds;
};

var changeAttribute = function (element, attribute, value) {
  element.removeAttribute(attribute);
  element.setAttribute(attribute, value);
}

var createPins = function (ads) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');

  for (var i = 0; i < ads.length; i++) {
    var pin = pinTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();

    var left = ads[i].location.x - (pin.width / 2);
    var topPin = ads[i].location.y - pin.height;
    var style = 'style = left: ' + left + ' px; top: ' + topPin + ' px';
    changeAttribute(pin, 'style', style);

    var avatar = pin.querySelector('img');
    var src = 'src= ' + ads[i].author.avatar;
    var alt = 'alt= ' + ads[i].offer.title;
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
