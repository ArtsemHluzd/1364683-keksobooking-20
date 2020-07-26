'use strict';

var minPriceMap = {
  BUNGALO: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000,
};

(function() {
  var formElement = document.querySelector('.ad-form');
  var formFieldSetElements = formElement.querySelectorAll('fieldset');
  var formResetElement = document.querySelector('.ad-form__reset');
  var formAddress = document.querySelector('#address');
  var formType = document.querySelector('#type');
  var formPrice = document.querySelector('#price');
  var formTimeIn = document.querySelector('#timein');
  var formTimeOut = document.querySelector('#timeout');
  var formRoomNumber = document.querySelector('#room_number');
  var formCapacity = document.querySelector('#capacity');

  var activateForm = function () {
    formElement.classList.remove('ad-form--disabled');
  };

  var deactivateForm = function () {
    formElement.classList.add('ad-form--disabled');
  };

  var resetForm = function() {
    formElement.reset();
  };

  var disableFormFieldSets = function () {
    for (var i = 0; i < formFieldSetElements.length; i++) {
      formFieldSetElements[i].setAttribute('disabled', true);
    }
  };

  var enableFormFieldSets = function () {
    for (var i = 0; i < formFieldSetElements.length; i++) {
      formFieldSetElements[i].removeAttribute('disabled');
    }
  };

  // 3.4. Адрес: ручное редактирование поля запрещено. Значение автоматически
  // выставляется при перемещении метки .map__pin--main по карте. Подробности
  // заполнения поля адреса, описаны вместе с поведением метки.
  var setFormAddress = function(x, y) {
    formAddress.value = x + ', ' + y;
  };

  // 2.5. При успешной отправке формы страница, не перезагружаясь, переходит в изначальное неактивное состояние, а также:
  // все заполненные поля возвращаются в изначальное состояние, в том числе фильтры;
  // метки похожих объявлений и карточка активного объявления удаляются;
  // метка адреса возвращается в исходное положение;
  // значение поля адреса корректируется соответственно положению метки.
  var onSuccessSave = function () {
    window.page.deactivatePage();
    window.adForm.resetForm();
    window.filtersForm.resetForm();
    window.mainPin.resetPin();
  };

  var onErrorSave = function () {};

  deactivateForm();
  disableFormFieldSets();

  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(formElement), onSuccessSave, onErrorSave);
  });

  // 2.8. Нажатие на кнопку .ad-form__reset сбрасывает страницу в исходное неактивное состояние без перезагрузки, а также:
  // все заполненные поля возвращаются в изначальное состояние, в том числе фильтры;
  // метки похожих объявлений и карточка активного объявления удаляются;
  // метка адреса возвращается в исходное положение;
  // значение поля адреса корректируется соответственно положению метки;
  formResetElement.addEventListener('click', function (evt) {
    window.page.deactivatePage();
    window.adForm.resetForm();
    window.filtersForm.resetForm();
    window.mainPin.resetPin();
  });

  // 3.3. Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»:
  // «Бунгало» — минимальная цена за ночь 0;
  // «Квартира» — минимальная цена за ночь 1 000;
  // «Дом» — минимальная цена 5 000;
  // «Дворец» — минимальная цена 10 000.
  //
  // > Обратите внимание: вместе с минимальным значением цены нужно изменять и плейсхолдер.
  formType.addEventListener('change', function(evt) {
    var min = minPriceMap[evt.target.value.toUpperCase()];
    formPrice.setAttribute('min', min);
    formPrice.setAttribute('placeholder', min);
  });

  // 3.5. Поля «Время заезда» и «Время выезда» синхронизированы: при изменении
  // значения одного поля, во втором выделяется соответствующее ему. Например,
  // если время заезда указано «после 14», то время выезда будет равно «до 14»
  // и наоборот.
  formTimeIn.addEventListener('change', function(evt) {
    formTimeOut.value = evt.target.value;
  });

  formTimeOut.addEventListener('change', function(evt) {
    formTimeIn.value = evt.target.value;
  });

  // 3.6. Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом, что при выборе количества комнат вводятся ограничения на допустимые варианты выбора количества гостей:
  // 1 комната — «для 1 гостя»;
  // 2 комнаты — «для 2 гостей» или «для 1 гостя»;
  // 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
  // 100 комнат — «не для гостей».
  //
  // > Обратите внимание: допускаются разные способы ограничения допустимых
  // > значений поля «Количество мест»: удаление из разметки соответствующих
  // > элементов option, добавление элементам option состояния disabled или
  // > другие способы ограничения, например, с помощью метода setCustomValidity.
  formRoomNumber.addEventListener('change', function(evt) {});

  window.adForm = {
    activateForm: activateForm,
    deactivateForm: deactivateForm,
    resetForm: resetForm,
    enableFormFieldSets: enableFormFieldSets,
    disableFormFieldSets: disableFormFieldSets,
    setFormAddress: setFormAddress,
  };
})()



// (function () {
//
//   var INITIAL_COORDS_MAINPIN = {
//     y: 375,
//     x: 570
//   };
//   var form = document.querySelector('.ad-form');
//   var mapFilters = document.querySelector('.map__filters');
//   var fieldsets = document.querySelectorAll('fieldset');
//   var resetFormBtn = document.querySelector('.ad-form__reset');
//   var formFilter = document.querySelector('.map__filters');
//   var timein = document.querySelector('#timein');
//   var timeout = document.querySelector('#timeout');
//   var rooms = document.querySelector('#room_number');
//   var capacity = document.querySelector('#capacity');
//   var options = capacity.querySelectorAll('option');
//   var imagesInput = form.querySelector('#images');
//
//   var diactivateForm = function () {
//
//     form.reset();
//     formFilter.reset();
//
//     for (var i = 0; i < fieldsets.length; i++) {
//       fieldsets[i].classList.add('disabled');
//     }
//
//
//     window.map.removeAllPins();
//     form.classList.add('ad-form--disabled');
//     form.setAttribute('disabled', 'disabled');
//
//     window.pin.moveMainPin(INITIAL_COORDS_MAINPIN.y, INITIAL_COORDS_MAINPIN.x);
//     window.pin.insertAddressValue(window.pin.MAIN_PIN_HEIGHT_HALF, window.pin.MAIN_PIN_HEIGHT_HALF);
//
//     if (window.map.map.querySelector('.map__card')) {
//       window.map.map.querySelector('.map__card').remove();
//     }
//   };
//
//   diactivateForm();
//
//   var activatePage = function (evt) {
//     if (evt.which === 1 || evt.key === 'Enter') {
//
//       window.map.map.classList.remove('map--faded');
//       form.classList.remove('ad-form--disabled');
//       for (var i = 0; i < fieldsets.length; i++) {
//         fieldsets[i].classList.remove('disabled');
//       }
//       window.backend.load(window.map.onSuccessLoad, window.map.onErrorLoad);
//
//     }
//   };
//
//   resetFormBtn.addEventListener('click', diactivateForm);
//
//   var onSuccessSave = function () {
//     diactivateForm();
//     window.validation.renderSuccessMessage();
//   };
//
//   var onErrorSave = function () {
//     window.validation.renderErrorMessage();
//   };
//
//   form.addEventListener('submit', function (evt) {
//     evt.preventDefault();
//     window.backend.save(new FormData(form), onSuccessSave, onErrorSave);
//
//   });
//
//   timein.addEventListener('change', function () {
//     timeout.value = timein.value;
//   });
//
//   timeout.addEventListener('change', function () {
//     timein.value = timeout.value;
//   });
//
//   // rooms.addEventListener('change', function () {
//   // rooms.options.forEach(function (it) {
//   // console.log(rooms.options);
//   //   it.removeAttribute('disabled');
//   // })
//   // switch (rooms.value) {
//   //   case '1':
//   //     console.log('test');
//   //     for (var i = 0; i < options.length; i++) {
//   //       if (options[i].value !== '1') {
//   //         options[i].setAttribute('disabled', 'disabled');
//   //       }
//   //     }
//   //     break;
//   //   case '2':
//   //     console.log('2');
//   //     for (var j = 0; j < options.length; j++) {
//   //       if (options[j].value !== '2' && options[j].value !== '1') {
//   //         console.log(options[j].value);
//   //         options[j].setAttribute('disabled', 'disabled');
//   //       }
//   //     }
//   //     break;
//   // }
//
//
//   window.form = {
//     form: form,
//     diactivateForm: diactivateForm,
//     activatePage: activatePage,
//     mapFilters: mapFilters,
//     rooms: rooms,
//     capacity: capacity,
//     imagesInput: imagesInput
//   };
//
//
// })();
