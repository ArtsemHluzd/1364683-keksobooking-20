'use strict';

(function () {
  var disableElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', true);
    }
  };

  var enableElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }
  };

  var debounce = function (func, wait) {
    var timeout;

    return function () {
      var params = arguments;
      clearTimeout(timeout);

      timeout = setTimeout(function () {
        func.apply(null, params);
      }, wait);
    };
  };

  window.common = {
    disableElements: disableElements,
    enableElements: enableElements,
    debounce: debounce,
  };
})();
