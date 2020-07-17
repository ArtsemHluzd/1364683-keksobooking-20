'use strict';

(function () {

  var createCardAd = function (ad) {
    // console.log(ad);
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__title').textContent = ad;
  };

  // var pins = document.querySelectorAll('.map__pin');
  // for (var i = 0; i < pins.length; i++) {
  //   console.log(pin[i]);
  //   pins[i].addEventListener('click', function () {
  //     createCardAd(pins[i]);
  //   });
  // }

  window.ad = {
    createCardAd: createCardAd
  };

})();
