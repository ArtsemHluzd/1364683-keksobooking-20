'use strict';

(function () {
  var LOAD_URL = 'https://javascript.pages.academy/keksobooking/data';
  var SAVE_URL = 'https://javascript.pages.academy/keksobooking';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var sendRequest = function (onSuccess, onError, type, url) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(type, url);
    return xhr;
  };

  var load = function (onSuccess, onError) {
    var xhr = sendRequest(onSuccess, onError, 'GET', LOAD_URL);
    xhr.send();
  };

  var save = function (data, onSuccess, onError) {
    var xhr = sendRequest(onSuccess, onError, 'POST', SAVE_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,
  };
})();
