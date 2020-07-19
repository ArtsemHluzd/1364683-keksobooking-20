'use strict';

(function () {

  var renderCardAd = function (ad) {
    var mapFiltersContainer = document.querySelector('.map__filters-container');
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var fragment = document.createDocumentFragment();
    var card = cardTemplate.cloneNode(true);

    card.querySelector('.popup__title').textContent = ad.offer.title;
    card.querySelector('.popup__text--address').textContent = ad.offer.address;
    card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';

    switch (ad.offer.type) {
      case 'flat':
        card.querySelector('.popup__type').textContent = 'Квартира';
        break;
      case 'bungalo':
        card.querySelector('.popup__type').textContent = 'Бунгало';
        break;
      case 'house':
        card.querySelector('.popup__type').textContent = 'Дом';
        break;
      case 'palace':
        card.querySelector('.popup__type').textContent = 'Дворец';
        break;
    }


    card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

    var ul = card.querySelector('.popup__features');

    if (ad.offer.features.includes('wifi') === false) {
      ul.querySelector('.popup__feature--wifi').remove();
    } if (ad.offer.features.includes('dishwasher') === false) {
      ul.querySelector('.popup__feature--dishwasher').remove();
    } if (ad.offer.features.includes('parking') === false) {
      ul.querySelector('.popup__feature--parking').remove();
    } if (ad.offer.features.includes('washer') === false) {
      ul.querySelector('.popup__feature--washer').remove();
    } if (ad.offer.features.includes('elevator') === false) {
      ul.querySelector('.popup__feature--elevator').remove();
    } if (ad.offer.features.includes('conditioner') === false) {
      ul.querySelector('.popup__feature--conditioner').remove();
    }

    card.querySelector('.popup__description').textContent = ad.offer.description;
    var firstImg = card.querySelector('.popup__photos').querySelector('.popup__photo');
    window.common.changeAttribute(firstImg, 'src', ad.offer.photos[0]);
    for (var i = 1; i < ad.offer.photos.length - 1; i++) {
      var img = firstImg.cloneNode();
      window.common.changeAttribute(img, 'src', ad.offer.photos[i]);
      card.querySelector('.popup__photos').appendChild(img);
    }
    console.log(ad);

    // ad.offer.features.forEach(function (it) {

    // });


    fragment.appendChild(card);
    window.form.map.insertBefore(fragment, mapFiltersContainer);
  };


  window.ad = {
    renderCardAd: renderCardAd
  };

})();
