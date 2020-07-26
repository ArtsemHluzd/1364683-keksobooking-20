'use strict';

var LOAD_URL = 'https://javascript.pages.academy/keksobooking/data';
var SAVE_URL = 'https://javascript.pages.academy/keksobooking';

(function () {
  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr);
      } else {
        onError('Что-то пошло не так');
      }
    });
    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  var save = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr);
      } else {
        onError('Что-то пошло не так');
      }
    });
    xhr.open('POST', SAVE_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
