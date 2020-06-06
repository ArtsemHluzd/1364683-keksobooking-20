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

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var ads = createArrAds();
for (var i = 0; i < ads.length; i++) {
  var left = ads[i].location.x - (pin.width / 2);
  var topPin = ads[i].location.y - pin.height;
  var style = 'style = left: ' + left + ' px; top: ' + topPin + ' px';
  pin.classList.add(style);
}

createArrAds();
