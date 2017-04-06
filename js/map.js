// map.js

'use strict';

var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var typeArray = ['flat', 'house', 'bungalo'];
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

var getRandomIndex = function (arr) {
  return Math.floor(Math.random() * (arr.length));
};

var getRandomInt = function (a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
};

var getElementFromArrayWithoutReturn = function (arr) {
  if (!arr.length) {
    return [[], null];
  }

  var i = getRandomIndex(arr);
  var r = arr[i];
  arr = arr.slice(0, i).concat(arr.slice(i + 1, arr.length));

  return [arr, r];
};

var getElementFromArrayWithReturn = function (arr) {
  var i = getRandomIndex(arr);
  return arr[i];
};

var getElementsFromArrayWithoutReturn = function (arr) {
  var n = Math.floor(Math.random() * (arr.length + 1));
  var r = [];
  for (var i = 0; i < n; ++i) {
    var elem = getElementFromArrayWithoutReturn(arr);
    arr = elem[0];
    elem = elem[1];
    r[i] = elem;
  }

  return r;
};

var getRandomPlaces = function (n) {
  var getAvatar = function (i) {
    return './img/avatars/user' + (i < 10 ? '0' : '') + (i + 1) + '.png';
  };

  var getRandomPlace = function (avatar, title, address, price, type, rooms, guests, checkin, checkout, features) {
    return {
      'author': {
        'avatar': avatar
      },
      'offer': {
        'title': title,
        'address': {x: address.x, y: address.y}, // '' + address.x + ', ' + address.y,
        'price': price,
        'type': type,
        'rooms': rooms,
        'guests': guests,
        'checkin': checkin,
        'checkout': checkout,
        'features': features,
        'description': '',
        'photos': ''
      }
    };
  };

  var titleArray = titles;

  var r = [];
  for (var i = 0; i < n; ++i) {
    var avatar = getAvatar(i);
    var title = getElementFromArrayWithoutReturn(titleArray);
    titleArray = title[0];
    title = title[1];

    var location = {
      x: getRandomInt(300, 900),
      y: getRandomInt(100, 500)
    };

    var price = Math.floor(Math.random() * (1000000 - 1000)) + 1000;
    var type = getElementFromArrayWithReturn(typeArray);
    var rooms = Math.floor(1 + Math.random() * 5);
    var guests = Math.floor(1 + Math.random() * 10);
    var checkin = getElementFromArrayWithReturn(checkinArray);
    var checkout = getElementFromArrayWithReturn(checkoutArray);
    var features = getElementsFromArrayWithoutReturn(featuresArray);

    r[i] = getRandomPlace(avatar, title, location, price, type, rooms, guests, checkin, checkout, features);
  }

  return r;
};

var similarPlaces = getRandomPlaces(8);

var getPinTemplate = function () {
  var templatePin = document.createElement('div');
  templatePin.classList.add('pin');
  var pinImg = document.createElement('img');
  pinImg.width = '40';
  pinImg.height = '40';
  pinImg.classList.add('rounded');
  templatePin.appendChild(pinImg);

  return templatePin;
};

var renderPin = function (place) {
  var pin = getPinTemplate();
  pin.style = 'left: ' + place.offer.address.x + 'px; top: ' + place.offer.address.y + 'px';
  var pinImg = pin.querySelector('img');
  pinImg.src = place.author.avatar;

  return pin;
};

var pinFragment = document.createDocumentFragment();

for (var index = 0; index < similarPlaces.length; index++) {
  var pinElement = renderPin(similarPlaces[index]);
  pinFragment.appendChild(pinElement);
}

var pinInsert = document.querySelector('.tokyo__pin-map');
pinInsert.appendChild(pinFragment);

var lodgeTemplace = document.querySelector('#lodge-template').content;

var getLodge = function (place) {
  var getAddressPlaceAsString = function () {
    return place.offer.address.x + ', ' + place.offer.address.y;
  };

  var getTypePlaceAsString = function () {
    if (place.offer.type === 'flat') {
      return 'Квартира';
    } else if (place.offer.type === 'bungalo') {
      return 'Бунгало';
    } else if (place.offer.type === 'house') {
      return 'Дом';
    } else {
      return '';
    }
  };

  var getRoomsGuestsPlaceAsString = function () {
    return 'Для ' + place.offer.guests + ' гостей в ' + place.offer.rooms + ' комнатах';
  };

  var getCheckInOutPlaceAsString = function () {
    return 'Заезд после ' + place.offer.checkin + ' выезд до ' + place.offer.checkout;
  };

  var getFeaturesPlaceElement = function () {
    var featureFragment = document.createDocumentFragment();
    var features = place.offer.features;
    for (var i = 0; i < features.length; ++i) {
      var spanFeature = document.createElement('span');
      spanFeature.classList.add('feature__image');
      spanFeature.classList.add('feature__image--' + features[i]);
      featureFragment.appendChild(spanFeature);
    }

    return featureFragment;
  };

  var getAvatarPlaceElement = function () {
    var avatarImg = document.createElement('img');
    avatarImg.src = place.author.avatar;

    return avatarImg;
  };

  var lodge = lodgeTemplace.cloneNode(true);
  lodge.querySelector('.lodge__title').textContent = place.offer.title;
  lodge.querySelector('.lodge__address').textContent = getAddressPlaceAsString();
  lodge.querySelector('.lodge__price').innerHTML = place.offer.price + ' &#x20bd;/ночь';
  lodge.querySelector('.lodge__type').textContent = getTypePlaceAsString();
  lodge.querySelector('.lodge__rooms-and-guests').textContent = getRoomsGuestsPlaceAsString();
  lodge.querySelector('.lodge__checkin-time').textContent = getCheckInOutPlaceAsString();
  lodge.querySelector('.lodge__features').appendChild(getFeaturesPlaceElement());
  lodge.querySelector('.lodge__description').textContent = place.offer.description;
  lodge.querySelector('.lodge__photos').appendChild(getAvatarPlaceElement());

  return lodge;
};

var similarPlace = similarPlaces[0];
var lodge = getLodge(similarPlace);
var dialogPanel = document.querySelector('.dialog__panel');
// var replacedDialogPanel =
dialogPanel.parentNode.replaceChild(lodge, dialogPanel);
// TODO: Delete replaced element replacedDialogPanel.parentNode.removeChild(dialogInsert);
var dialogTitle = document.querySelector('.dialog__title');
dialogTitle.querySelector('img').src = similarPlace.author.avatar;
