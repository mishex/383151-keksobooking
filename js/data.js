// data.js

'use strict';

window.getRandomPlaces = (function () {

  var titleArray = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var typeArray = ['flat', 'bungalo', 'house']; // Object.keys(typeToDesc);

  var checkinArray = ['2:00', '13:00', '14:00'];

  var checkoutArray = ['2:00', '13:00', '14:00'];

  var featuresArray = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  function getRandomIndex(arr) {
    return Math.floor(Math.random() * (arr.length));
  }

  function getRandomInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  }

  // Достать элемент из массива, без возвращения (этого элемента в него (массив))
  function getElementFromArrayWithoutReturn(arr) {
    if (!arr.length) {
      return null;
    }

    var index = getRandomIndex(arr);
    var result = arr[index];
    var oldLength = arr.length;

    for (var i = index; i < oldLength - 1; ++i) {
      arr[i] = arr[i + 1];
    }

    arr.length = oldLength - 1;
    return result;
  }

  // Достать элемент из массива с возвращением
  function getElementFromArrayWithReturn(arr) {
    var i = getRandomIndex(arr);
    return arr[i];
  }

  // Достать элементы из массива без возвращениия (каждый достается без возвращения)
  function getElementsFromArrayWithoutReturn(arr) {
    var n = Math.floor(Math.random() * (arr.length + 1));
    var result = [];
    for (var i = 0; i < n; ++i) {
      result[i] = getElementFromArrayWithoutReturn(arr);
    }

    return result;
  }

  function getRandomPlaces(n) {
    function getRandomPlace(avatarNumber) {
      var placeDescription = {};
      var placeAuthor = {};

      placeAuthor.avatar = './img/avatars/user' + (avatarNumber < 10 ? '0' : '') + avatarNumber + '.png';
      placeDescription.title = getElementFromArrayWithoutReturn(titleArray);
      placeDescription.address = {x: getRandomInt(300, 900), y: getRandomInt(100, 500)};
      placeDescription.price = getRandomInt(1000, 1000000);
      placeDescription.type = getElementFromArrayWithReturn(typeArray);
      placeDescription.rooms = getRandomInt(1, 5);
      placeDescription.guests = getRandomInt(1, 10);
      placeDescription.checkin = getElementFromArrayWithReturn(checkinArray);
      placeDescription.checkout = getElementFromArrayWithReturn(checkoutArray);
      placeDescription.features = getElementsFromArrayWithoutReturn(featuresArray.slice());
      placeDescription.description = '';
      placeDescription.photos = '';

      return {author: placeAuthor, offer: placeDescription};
    }

    var result = [];
    for (var i = 0; i < n; ++i) {
      result[i] = getRandomPlace(i + 1);
    }

    return result;
  }

  return getRandomPlaces;

})();
