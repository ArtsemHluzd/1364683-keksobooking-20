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

    var checkDataIs = function (element, data) {
      if (data) {
        element.textContent = data;
      } else {
        element.remove();
      }
    };

    checkDataIs(cardTitleElement, ad.offer.title);
    checkDataIs(cardAddressElement, ad.offer.address);
    checkDataIs(cardPriceElement, ad.offer.price + '₽/ночь');
    checkDataIs(cardTypeElement, TypeMap[ad.offer.type.toUpperCase()]);
    checkDataIs(cardDescriptionElement, ad.offer.description);

    if (ad.offer.rooms) {
      cardCapacityElement.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    } else {
      cardCapacityElement.remove();
    }

    if (ad.offer.guests) {
      cardCapacityElement.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    } else {
      cardCapacityElement.remove();
    }

    if (ad.offer.checkin) {
      cardTimeElement.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    } else {
      cardTimeElement.remove();
    }

    if (ad.offer.checkout) {
      cardTimeElement.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    } else {
      cardTimeElement.remove();
    }

    if (ad.author.avatar) {
      cardAvatarElement.setAttribute('src', ad.author.avatar);
    } else {
      cardAvatarElement.remove();
    }

    if (ad.offer.features) {
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
    } else {
      cardFeaturesElement.remove();
    }

    if (ad.offer.photos) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < ad.offer.photos.length; i++) {
        var img = cardPhotoElement.cloneNode(true);
        img.setAttribute('src', ad.offer.photos[i]);
        fragment.appendChild(img);
      }
      cardPhotosElement.appendChild(fragment);
      cardPhotoElement.remove();
    } else {
      cardPhotoElement.remove();
    }

    var onClickCloseCard = function () {
      card.remove();
      window.pin.deactivatePins();

      cardCloseElement.removeEventListener('click', onClickCloseCard);
      window.removeEventListener('keydown', onKeydownCloseCard);
    };

    var onKeydownCloseCard = function (evt) {
      if (evt.key === 'Escape') {
        card.remove();
        window.pin.deactivatePins();

        cardCloseElement.removeEventListener('click', onClickCloseCard);
        window.removeEventListener('keydown', onKeydownCloseCard);
      }
    };

    cardCloseElement.addEventListener('click', onClickCloseCard);
    window.addEventListener('keydown', onKeydownCloseCard);

    mapElement.appendChild(card);
  };

  window.card = {
    renderCard: renderCard,
    removeCard: removeCard,
  };
})();
