'use strict';

(function () {
  var houseType = document.querySelector('#housing-type');
  houseType.addEventListener('change', function () {
    if (houseType.value === 'any') {
      filteredByType = ads.filter(function (item) {
        return item.offer.type;
      });
    } else {
      filteredByType = ads.filter(function (item) {
        return item.offer.type === houseType.value;
      });
    }
    debounce(updatePins);
  });

  var housePrice = document.querySelector('#housing-price');
  housePrice.addEventListener('change', function () {
    if (housePrice.value === 'low') {
      filteredByPrice = ads.filter(function (it) {
        return it.offer.price <= 10000;
      });
    } else if (housePrice.value === 'middle') {
      filteredByPrice = ads.filter(function (it) {
        return it.offer.price > 10000 && it.offer.price < 50000;
      });
    } else if (housePrice.value === 'high') {
      filteredByPrice = ads.filter(function (it) {
        return it.offer.price >= 50000;
      });
    } else if (housePrice.value === 'any') {
      filteredByPrice = ads.filter(function (it) {
        return it.offer.price;
      });
    }
    debounce(updatePins);
  });
})();
