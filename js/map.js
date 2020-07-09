'use strict';

(function () {

  window.form.diactivateForm();
  window.form.insertAddressValueInitial();

  window.form.mainPin.addEventListener('mousedown', function (evt) {
    window.form.activatePage(evt);
    window.form.insertAddressValue();
  });

  window.form.mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.form.activatePage();
      window.form.insertAddressValue();
    }
  });

  var houseType = document.querySelector('#housing-type');
  console.log(houseType);
  houseType.addEventListener('change', function () {
    alert(evt);
    console.log('test');
  });

})();
