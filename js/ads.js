'use strict';

(function () {
  var TypeMap = {
    FLAT: 'Квартира',
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец',
  };
  var ads = [];
  var mapElement = document.querySelector('.map');
  var mapPinsElement = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var removeCard = function () {
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }
  };

  var removePins = function () {
    var pins = mapPinsElement.querySelectorAll('.map__pin');
    for(var i = 0; i < pins.length; i++) {
      if (pins[i].classList.contains('map__pin--main')) {
        continue;
      }

      pins[i].remove();
    }
  };

  var deactivatePins = function () {
    var pins = document.querySelectorAll('.map__pin--active');
    for(var i = 0; i < pins.length; i++) {
      pins[i].classList.remove('map__pin--active');
    }
  };

  var renderCard = function (ad) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var card = cardTemplate.cloneNode(true);

    var cardAvatarElement = card.querySelector('.popup__avatar');
    var cardCloseElement = card.querySelector('.popup__close');
    var cardTitleElement = card.querySelector('.popup__title');
    var cardAddressElement = card.querySelector('.popup__text--address');
    var cardPriceElement = card.querySelector('.popup__text--price');
    var cardTypeElement = card.querySelector('.popup__type');
    var cardCapacityElement = card.querySelector('.popup__text--capacity');
    var cardTimeElement = card.querySelector('.popup__text--time');
    var cardFeaturesElement = card.querySelector('.popup__features');
    var cardDescriptionElement = card.querySelector('.popup__description');
    var cardPhotosElement = card.querySelector('.popup__photos');
    var cardPhotoElement = cardPhotosElement.querySelector('.popup__photo');


    cardTitleElement.textContent = ad.offer.title;
    cardAddressElement.textContent = ad.offer.address;
    cardPriceElement.textContent = ad.offer.price + '₽/ночь';
    cardTypeElement.textContent = TypeMap[ad.offer.type.toUpperCase()];
    cardCapacityElement.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    cardTimeElement.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    cardDescriptionElement.textContent = ad.offer.description;
    cardAvatarElement.setAttribute('src', ad.author.avatar);

    if (!ad.offer.features.includes('wifi')) {
      cardFeaturesElement.querySelector('.popup__feature--wifi').remove();
    }

    if (!ad.offer.features.includes('dishwasher')) {
      cardFeaturesElement.querySelector('.popup__feature--dishwasher').remove();
    }

    if (!ad.offer.features.includes('parking')) {
      cardFeaturesElement.querySelector('.popup__feature--parking').remove();
    }

    if (!ad.offer.features.includes('washer')) {
      cardFeaturesElement.querySelector('.popup__feature--washer').remove();
    }

    if (!ad.offer.features.includes('elevator')) {
      cardFeaturesElement.querySelector('.popup__feature--elevator').remove();
    }

    if (!ad.offer.features.includes('conditioner')) {
      cardFeaturesElement.querySelector('.popup__feature--conditioner').remove();
    }

    var fragment = document.createDocumentFragment();
    for(var i = 0; i < ad.offer.photos.length; i++) {
      var img = cardPhotoElement.cloneNode(true);
      img.setAttribute('src', ad.offer.photos[i]);
      fragment.appendChild(img);
    }
    cardPhotosElement.appendChild(fragment);
    cardPhotoElement.remove();

    mapElement.appendChild(card);
  };

  var createPin = function (ad) {
    var pin = pinTemplate.cloneNode(true);
    var pinAvatar = pin.querySelector('img');

    pin.style.left = ad.location.x + 'px';
    pin.style.top = ad.location.y + 'px';

    pinAvatar.setAttribute('src', ad.author.avatar);
    pinAvatar.setAttribute('alt', ad.offer.title);

    pin.addEventListener('click', function() {
      deactivatePins();
      removeCard();
      renderCard(ad);
      pin.classList.add('map__pin--active');
    });

    return pin;
  };

  var renderPins = function (ads) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < ads.length; i ++) {
      if (ads[i].offer) {
        var pin = createPin(ads[i]);
        fragment.appendChild(pin);
      }
    }

    mapPinsElement.appendChild(fragment);
  };

  var onLoad = function (response) {
    ads = response;
    renderPins(ads);
  }

  window.ads = {
    onLoad: onLoad,
    removePins: removePins,
    removeCard: removeCard,
  };
})();
