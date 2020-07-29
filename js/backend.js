'use strict';

(function () {
  var LOAD_URL = 'https://javascript.pages.academy/keksobooking/data';
  var SAVE_URL = 'https://javascript.pages.academy/keksobooking';

  var sendRequest = function (onSuccess, onError, type, url) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });
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
