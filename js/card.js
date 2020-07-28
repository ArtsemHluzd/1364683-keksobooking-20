'use strict';

(function () {
  var TypeMap = {
    FLAT: 'Квартира',
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец',
  };
  var mapElement = document.querySelector('.map');

  var removeCard = function () {
    var card = document.querySelector('.map__card');

    if (card) {
      card.remove();
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

    var checkDataIs = function (element, data, value = data) {
      if (data) {
        element.textContent = value;
      } else {
        element.remove();
      }
    };

    checkDataIs(cardTitleElement, ad.offer.title);
    checkDataIs(cardAddressElement, ad.offer.address);
    checkDataIs(cardPriceElement, ad.offer.price + '₽/ночь');
    checkDataIs(cardTypeElement, TypeMap[ad.offer.type.toUpperCase()]);

    checkDataIs(
      cardCapacityElement,
      ad.offer.rooms,
      ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей');
    checkDataIs(
      cardCapacityElement,
      ad.offer.guests,
      ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей');

    checkDataIs(
      cardTimeElement,
      ad.offer.checkin,
      'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout);
    checkDataIs(
      cardTimeElement,
      ad.offer.checkout,
      'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout);

    checkDataIs(cardDescriptionElement, ad.offer.description);
    if (ad.author.avatar) {
      cardAvatarElement.setAttribute('src', ad.author.avatar);
    } else {
      cardAvatarElement.remove();
    }

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
    for (var i = 0; i < ad.offer.photos.length; i++) {
      var img = cardPhotoElement.cloneNode(true);
      img.setAttribute('src', ad.offer.photos[i]);
      fragment.appendChild(img);
    }
    cardPhotosElement.appendChild(fragment);
    cardPhotoElement.remove();

    var onKeydownCloseCard = function () {
      card.remove();
      window.pin.deactivatePins();

      cardCloseElement.removeEventListener('click', onKeydownCloseCard);
      window.removeEventListener('keydown', onKeydownCloseCard);
    };
    cardCloseElement.addEventListener('click', onKeydownCloseCard);
    window.addEventListener('keydown', onKeydownCloseCard);

    mapElement.appendChild(card);
  };

  window.card = {
    renderCard: renderCard,
    removeCard: removeCard,
  };
})();
