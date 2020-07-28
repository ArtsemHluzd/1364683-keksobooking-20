'use strict';

(function () {
  var PIN_LIMIT = 5;
  var data = [];
  var mapPinsElement = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var removePins = function () {
    var pins = mapPinsElement.querySelectorAll('.map__pin');

    for (var i = 0; i < pins.length; i++) {
      if (pins[i].classList.contains('map__pin--main')) {
        continue;
      }

      pins[i].remove();
    }
  };

  var deactivatePins = function () {
    var pins = document.querySelectorAll('.map__pin--active');

    for (var i = 0; i < pins.length; i++) {
      pins[i].classList.remove('map__pin--active');
    }
  };

  var createPin = function (ad) {
    var pin = pinTemplate.cloneNode(true);
    var pinAvatar = pin.querySelector('img');

    pin.style.left = ad.location.x + 'px';
    pin.style.top = ad.location.y + 'px';

    pinAvatar.setAttribute('src', ad.author.avatar);
    pinAvatar.setAttribute('alt', ad.offer.title);

    pin.addEventListener('click', function () {
      deactivatePins();

      pin.classList.add('map__pin--active');

      window.card.removeCard();
      window.card.renderCard(ad);
    });

    return pin;
  };

  var onLoad = function (response) {
    data = response;
    renderPins(data);
  };

  var renderPins = function (ads) {
    var fragment = document.createDocumentFragment();

    for (var i = 0, j = 0; i < ads.length && j < PIN_LIMIT; i++) {
      if (ads[i] && !ads[i].offer) {
        continue;
      }

      var pin = createPin(ads[i]);
      j++;
      fragment.appendChild(pin);
    }

    mapPinsElement.appendChild(fragment);
  };

  var filterPins = function (filter) {
    var filtered = data.filter(function (it) {
      return (
        window.filtersForm.typeFilter(filter.type, it.offer) &&
        window.filtersForm.roomsFilter(filter.rooms, it.offer) &&
        window.filtersForm.guestsFilter(filter.guests, it.offer) &&
        window.filtersForm.priceFilter(filter.price, it.offer) &&
        window.filtersForm.featuresFilter(filter.features, it.offer)
      );
    });

    removePins();
    window.card.removeCard();
    renderPins(filtered);
  };

  window.pin = {
    onLoad: onLoad,
    renderPins: renderPins,
    removePins: removePins,
    deactivatePins: deactivatePins,
    filterPins: window.common.debounce(filterPins, 500),
  };
})();
