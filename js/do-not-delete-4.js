'use strict';

(function () {
  var noticeElement = document.querySelector('.notice');
  var noticeTitleElement = noticeElement.querySelector('.notice__title');

  var onErrorLoad = function () {
    var errorDiv = document.createElement('div');
    errorDiv.textContent = 'Что-то пошло не так';
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '30px';
    errorDiv.align = 'center';
    noticeElement.insertBefore(errorDiv, noticeTitleElement);
  };

  window.map = {};
})();
