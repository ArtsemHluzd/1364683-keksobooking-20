'use strict';

var URL_FROM = 'https://javascript.pages.academy/keksobooking/data';
var URL_TO = 'https://javascript.pages.academy/keksobooking';

(function () {

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      console.log(xhr.status);
      if (xhr.status === 200) {
        onSuccess(xhr.responce);
      } else {
        onError('Что-то пошло не так');
      }
    });

    xhr.open('GET', URL_FROM);
    xhr.send();

  };


  var save = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Что-то пошло не так');
      }
    });

    xhr.open('POST', URL_TO);
    xhr.send(data);
  };


  window.backend = {
    load: load,
    save: save
  };

})();
