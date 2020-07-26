'use strict';

(function () {
  var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomElement = function (arr) {
    var random = getRandomInt(0, arr.length - 1);
    return arr[random];
  };

  var getRandomArr = function (arr) {
    var randomArr = [];
    for (var i = 0; i < getRandomInt(0, arr.length - 1); i++) {
      randomArr.push(arr[i]);
    }
    return randomArr;
  };

  var changeAttribute = function (element, attribute, value) {
    element.removeAttribute(attribute);
    element.setAttribute(attribute, value);
  };

  window.common = {
    getRandomInt: getRandomInt,
    getRandomArr: getRandomArr,
    getRandomElement: getRandomElement,
    changeAttribute: changeAttribute
  };
})();
