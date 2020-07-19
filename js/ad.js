'use strict';

(function () {

  var renderCardAd = function (ad) {
    var mapFiltersContainer = document.querySelector('.map__filters-container');
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var fragment = document.createDocumentFragment();
    var card = cardTemplate.cloneNode(true);


    console.log(ad);
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

    var features = card.querySelector('.popup__features');
    features.remove();
    // ad.offer.features.forEach(function (it) {

    // });


    fragment.appendChild(card);
    window.form.map.insertBefore(fragment, mapFiltersContainer);
  };


  window.ad = {
    renderCardAd: renderCardAd
  };

})();
