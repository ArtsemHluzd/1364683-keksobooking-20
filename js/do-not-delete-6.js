'use strict';

var typeMap = {
  FLAT: 'Квартира',
  BUNGALO: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
};

(function () {
  var renderCardAd = function (ad) {
    var mapFiltersContainer = document.querySelector('.map__filters-container');
    var cardTemplate = document.querySelector('#card');
    var card = cardTemplate.cloneNode(true);

    var cardCloseElement = card.querySelector('.popup__close');
    var cardTitleElement = card.querySelector('.popup__title');
    var cardAddressElement = card.querySelector('.popup__text--address');
    var cardPriceElement = card.querySelector('.popup__text--price');
    var cardTypeElement = card.querySelector('.popup__type');
    var cardCapacityElement = card.querySelector('.popup__text--capacity');
    var cardTimeElement = card.querySelector('.popup__text--time');
    var cardDescriptionElement = card.querySelector('.popup__description');
    var cardAvatarElement = card.querySelector('.popup__avatar');
    var cardFeaturesElement = card.querySelector('.popup__features');
    var cardPhotosElement = card.querySelector('.popup__photos');

    cardTitleElement.textContent = add.offer.title;
    cardAddressElement.textContent = ad.offer.address;
    cardPriceElement.textContent = ad.offer.price + '₽/ночь';
    cardTypeElement.textContent = typeMap[add.offer.type.toUpperCase()];
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

    var firstImg = cardPhotosElement.querySelector('.popup__photo');
    debugger;
    for (var i = 1; i < ad.offer.photos.length - 1; i++) {
      var img = firstImg.cloneNode();
      window.common.changeAttribute(img, 'src', ad.offer.photos[i]);
      card.querySelector('.popup__photos').appendChild(img);
    }

    var fragment = document.createDocumentFragment();
    fragment.appendChild(card);
    window.map.map.insertBefore(fragment, mapFiltersContainer);

    var onClickCloseCardAd = function () {
      card.remove();
      cardCloseElement.removeEventListener('click', onClickCloseCardAd);
      cardCloseElement.removeEventListener('keydown', onKeydownCloseCardAd);
    };

    var onKeydownCloseCardAd = function (evt) {
      if (evt.key === 'Escape') {
        card.remove();
        cardCloseElement.removeEventListener('click', onClickCloseCardAd);
        cardCloseElement.removeEventListener('keydown', onKeydownCloseCardAd);
      }
    };

    cardCloseElement.addEventListener('click', onClickCloseCardAd);
    window.addEventListener('keydown', onKeydownCloseCardAd);
  };

  window.card = {
    renderCardAd: renderCardAd,
  };
})();
