// map.js

'use strict';

var titles = [
  "Большая уютная квартира",
  "Маленькая неуютная квартира",
  "Огромный прекрасный дворец",
  "Маленький ужасный дворец",
  "Красивый гостевой домик",
  "Некрасивый негостеприимный домик",
  "Уютное бунгало далеко от моря",
  "Неуютное бунгало по колено в воде"
];

var type_array = ['flat', 'house', 'bungalo'];
var checkin_array = ['2:00', '13:00', '14:00'];
var checkout_array = ['2:00', '13:00', '14:00'];

var features_array = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var getElementFromArrayWithoutReturn = function(arr) {
  if (!arr.length) {
    return [[], null];
  }

  i = Math.floor(Math.random() * arr.length);
  var r = arr[i];
  arr = arr.slice(0, i).concat(i + 1, arr.length);
  return [arr, r];
};

var getElementFromArrayWithReturn = function(arr) {
  i = Math.floor(Math.random() * arr.length);
  return arr[i];
};

var getElementsFromArrayWithoutReturn = function(arr) {
  var n = Math.round(Math.random() * arr.length);
  var r = [];
  for (var i = 0; i < n; ++i) {
    var elem = getElementFromArrayWithoutReturn(arr);
    arr = elem[0];
    elem = elem[1];
    r[i] = elem;
  }

  return r;
};

var getRandomIndex = function(a, b) {
  return Math.floor(Math.random() * (b - a)) + a;
};

var getRandomInt = function(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
};

var getRandomPlaces = function(n) {
  var getAvatar = function(i) {
    return  "img/avatars/user" + i < 10 ? '0' : '' + i + '.png';
  };

  var getRandomPlace = function(avatar, title, address, price, type, rooms, guests, checkin, checkout, features) {
      return {
        "author": {
          "avatar": avatar
        },
        "offer": {
          "title": title,
          "address": '' + address.x + ', ' + address.y,
          "price": price,
          "type": type,
          "rooms": rooms,
          "guests": guests,
          "checkin": checkin,
          "checkout": checkout,
          "features": features,
          "description": '',
          "photos": ''
        }
      };
    };

  var title_array = titles;

  var r = [];
  for (var i = 0; i < n; ++i) {
    var avatar = getAvatar(i);
    var title = getElementFromArrayWithoutReturn(title_array);
    title_array = title[0];
    title = title[1];

    var location = {
      x: getRandomInt(300, 900),
      y: getRandomInt(100, 500)
    };

    var price = Math.floor(Math.random() * (1000000 - 1000)) + 1000;
    var type = getElementFromArrayWithReturn(type_array);
    var rooms = Math.floor(1 + Math.random() * 5);
    var guests = Math.floor(1 + Math.random() * 10);
    var checkin = getElementFromArrayWithReturn(checkin_array);
    var checkout = getElementFromArrayWithReturn(checkout_array);
    var features = getElementsFromArrayWithoutReturn(features_array);

    r[i] = getRandomPlace(avatar, title, location, price, type, rooms, guests, checkin, checkout, features);
  }

  return r;
};

var similarPlaces = getRandomPlaces(8);

var similarPlaceTemplate = document
var renderPlace = function (place) {
  var placeElement = similarPlaceTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;

  return wizardElement;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);
