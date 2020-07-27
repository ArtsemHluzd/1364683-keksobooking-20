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

    // Если данных для заполнения не хватает, соответствующий блок в карточке
    // скрывается. Например, если в объявлении не указано никаких удобств, нужно
    // скрыть блок .popup__features. При отсутствии полей не должно возникать
    // ошибок.
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
    for (var i = 0; i < ad.offer.photos.length; i++) {
      var img = cardPhotoElement.cloneNode(true);
      img.setAttribute('src', ad.offer.photos[i]);
      fragment.appendChild(img);
    }
    cardPhotosElement.appendChild(fragment);
    cardPhotoElement.remove();

    // 5.6. Открытую карточку с подробной информацией можно закрыть или нажатием
    // на иконку крестика в правом верхнем углу объявления или нажатием на клавишу
    // Esc на клавиатуре.
    cardCloseElement.addEventListener('click', function () {
      card.remove();

      window.pin.deactivatePins();
    });

    mapElement.appendChild(card);
  };

  window.card = {
    renderCard: renderCard,
    removeCard: removeCard,
  };
})();
