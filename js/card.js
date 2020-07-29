'use strict';

(function () {
  var TypeMap = {
    FLAT: 'Квартира',
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец',
  };
  var mapElement = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var removeCard = function () {
    var card = document.querySelector('.map__card');

    if (card) {
      card.remove();
    }
  };

  var renderCard = function (ad) {
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

    var checkDataIs = function (element, data, value) {
      if (data) {
        element.textContent = value;
      } else {
        element.remove();
      }
    };

    var title = ad.offer.title;
    var address = ad.offer.address;
    var price = ad.offer.price;
    var type = TypeMap[ad.offer.type.toUpperCase()];
    var description = ad.offer.description;
    var rooms = ad.offer.rooms;
    var guests = ad.offer.guests;
    var checkin = ad.offer.checkin;
    var checkout = ad.offer.checkout;

    checkDataIs(cardTitleElement, title, title);
    checkDataIs(cardAddressElement, address, address);
    checkDataIs(cardPriceElement, price, price + '₽/ночь');
    checkDataIs(cardTypeElement, type, type);
    checkDataIs(cardDescriptionElement, description, description);

    checkDataIs(cardCapacityElement, rooms, rooms + ' комнаты для ' + guests + ' гостей');
    checkDataIs(cardCapacityElement, guests, rooms + ' комнаты для ' + guests + ' гостей');
    checkDataIs(cardCapacityElement, checkin, 'Заезд после ' + checkin + ', выезд до ' + checkout);
    checkDataIs(cardCapacityElement, checkout, 'Заезд после ' + checkin + ', выезд до ' + checkout);

    if (ad.author.avatar) {
      cardAvatarElement.setAttribute('src', ad.author.avatar);
    } else {
      cardAvatarElement.remove();
    }

    var checkFeatureIs = function (feature) {
      if (!ad.offer.features.includes(feature)) {
        var selector = '.popup__feature--' + feature;
        cardFeaturesElement.querySelector(selector).remove();
      }
    };


    if (ad.offer.features) {
      checkFeatureIs('wifi');
      checkFeatureIs('dishwasher');
      checkFeatureIs('parking');
      checkFeatureIs('washer');
      checkFeatureIs('elevator');
      checkFeatureIs('conditioner');
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
      window.pin.deactivate();

      cardCloseElement.removeEventListener('click', onClickCloseCard);
      window.removeEventListener('keydown', onKeydownCloseCard);
    };

    var onKeydownCloseCard = function (evt) {
      if (evt.key === 'Escape') {
        card.remove();
        window.pin.deactivate();

        cardCloseElement.removeEventListener('click', onClickCloseCard);
        window.removeEventListener('keydown', onKeydownCloseCard);
      }
    };

    cardCloseElement.addEventListener('click', onClickCloseCard);
    window.addEventListener('keydown', onKeydownCloseCard);

    mapElement.appendChild(card);
  };

  window.card = {
    render: renderCard,
    remove: removeCard,
  };
})();
