// map.js

'use strict';

// ------*** Common variables ***------

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

var typeToDesc = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом'
};

var typeArray = Object.keys(typeToDesc);

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

var ENTER_KEY_CODE = 13;
var ESC_KEY_CODE = 27;

// ------*** Elements in html ***------

var tokyo = document.querySelector('.tokyo');
var dialog = tokyo.querySelector('.dialog');
var tokioPinMap = tokyo.querySelector('.tokyo__pin-map');

var lodgeTemplate = document.querySelector('#lodge-template').content;

var notice = document.querySelector('.notice');
var formNotice = notice.querySelector('.notice__form');
var checkinNotice = formNotice.querySelector('#time');
var checkoutNotice = formNotice.querySelector('#timeout');
var descriptionNotice = formNotice.querySelector('#description');
var featuresNotice = formNotice.querySelector('#features');
var addressNotice = formNotice.querySelector('#address');
var titleNotice = formNotice.querySelector('#title');
var typeNotice = formNotice.querySelector('#type');
var priceNotice = formNotice.querySelector('#price');
var roomNumber = formNotice.querySelector('#room_number');
var capacityNotice = formNotice.querySelector('#capacity');

// ------*** Set event Handler ***------

tokioPinMap.addEventListener('click', onPinClick);

dialog.querySelector('.dialog__close').addEventListener('click', onDialogCloseClick);

tokioPinMap.addEventListener('keydown', onPinPressEnter);

dialog.querySelector('.dialog__close').addEventListener('keydown', onDialogClosePressEnter);

tokyo.addEventListener('keydown', onPinPressEsc);

setFormNoticeRelationship();

formNotice.addEventListener('invalid', onFormNoticeInvald, true);

formNotice.addEventListener('submit', onFormNoticeSubmit, true);


// ------*** Create data and html ***------

var pinPlaces = getRandomPlaces(8);

insertPinsFragment();

activatePin(tokioPinMap.querySelector('#pin-0'));

// ------*** functions ***-------

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

function insertPinsFragment() {
  function createPinsFragment() {
    function renderPin(place) {
      function getPinTemplate() {
        var templatePin = document.createElement('div');
        templatePin.classList.add('pin');
        var pinImg = document.createElement('img');
        pinImg.width = '40';
        pinImg.height = '40';
        pinImg.classList.add('rounded');
        templatePin.appendChild(pinImg);

        return templatePin;
      }

      var pin = getPinTemplate();
      pin.style = 'left: ' + place.offer.address.x + 'px; top: ' + place.offer.address.y + 'px';
      pin.tabIndex = '0';
      var pinImg = pin.querySelector('img');
      pinImg.src = place.author.avatar;

      return pin;
    }

    var pinsFragment = document.createDocumentFragment();
    for (var i = 0; i < pinPlaces.length; i++) {
      var pinElement = renderPin(pinPlaces[i]);
      pinElement.id = 'pin-' + i;
      pinsFragment.appendChild(pinElement);
    }
    return pinsFragment;
  }

  var tokyoPinMap = tokyo.querySelector('.tokyo__pin-map');
  tokyoPinMap.appendChild(createPinsFragment());
}

function showDialog(pinPlacesIndex) {
  function getLodge(place) {
    function getFeaturesPlaceElement(features) {
      var featureFragment = document.createDocumentFragment();
      for (var i = 0; i < features.length; ++i) {
        var spanFeature = document.createElement('span');
        spanFeature.classList.add('feature__image');
        spanFeature.classList.add('feature__image--' + features[i]);
        featureFragment.appendChild(spanFeature);
      }

      return featureFragment;
    }

    var lodge = lodgeTemplate.cloneNode(true);
    lodge.querySelector('.lodge__title').textContent = place.offer.title;
    lodge.querySelector('.lodge__address').textContent = place.offer.address.x + ', ' + place.offer.address.y;
    lodge.querySelector('.lodge__price').innerHTML = place.offer.price + ' &#x20bd;/ночь';
    lodge.querySelector('.lodge__type').textContent = typeToDesc[place.offer.type];
    lodge.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + place.offer.guests +
      ' гостей в ' + place.offer.rooms + ' комнатах';
    lodge.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + place.offer.checkin +
      ' выезд до ' + place.offer.checkout;
    lodge.querySelector('.lodge__features').appendChild(getFeaturesPlaceElement(place.offer.features));
    lodge.querySelector('.lodge__description').textContent = place.offer.description;
    // lodge.querySelector('.lodge__photos')

    return lodge;
  }

  var dialogPanel = dialog.querySelector('.dialog__panel');
  var dialogTitle = dialog.querySelector('.dialog__title');

  dialogPanel.parentNode.replaceChild(getLodge(pinPlaces[pinPlacesIndex]), dialogPanel);
  dialogTitle.querySelector('img').src = pinPlaces[pinPlacesIndex].author.avatar;
  dialog.style.display = '';
}

function activatePin(pin) {
  var activePin = tokioPinMap.querySelector('.pin--active');
  if (activePin) {
    activePin.classList.remove('pin--active');
  }

  pin.classList.add('pin--active');

  if (pin.id.includes('pin-')) {
    showDialog(pin.id.split('pin-')[1]);
  }
}

function hideDialog() {
  dialog.style.display = 'none';
}

function deactivatePin() {
  tokioPinMap.querySelector('.pin--active').classList.remove('pin--active');
  hideDialog();
}

function onPinClick(evt) {
  if (evt.target.classList.contains('pin')) {
    activatePin(evt.target);
  } else if (evt.target.parentNode.classList.contains('pin')) {
    activatePin(evt.target.parentNode);
  }
}

function onDialogCloseClick() {
  deactivatePin();
}

function onPinPressEnter(evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    if (evt.target.classList.contains('pin')) {
      activatePin(evt.target);
    }
  }
}

function onDialogClosePressEnter(evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    deactivatePin();
  }
}

function onPinPressEsc(evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    deactivatePin();
  }
}

function setFormNoticeRelationship() {
  function onCheckinNoticeChange() {
    checkoutNotice.selectedIndex = checkinNotice.selectedIndex;
  }

  function onCheckoutNoticeChange() {
    checkinNotice.selectedIndex = checkoutNotice.selectedIndex;
  }

  function ontypeNoticeChange() {
    var valueTypeNotice = typeNotice.options[typeNotice.selectedIndex].textContent;
    switch (valueTypeNotice) {
      case 'Квартира':
        priceNotice.min = 1000;
        priceNotice.value = 1000;
        break;
      case 'Дворец':
        priceNotice.min = 10000;
        priceNotice.value = 10000;
        break;
      default:
        priceNotice.min = 0;
        priceNotice.value = 0;
        break;
    }
  }

  function onRoomNumberChange() {
    if (roomNumber.options[roomNumber.selectedIndex].value > 1) {
      capacityNotice.selectedIndex = capacityNotice.querySelector('option[value="3"]').index;
    } else {
      capacityNotice.selectedIndex = capacityNotice.querySelector('option[value="0"]').index;
    }
  }

  checkinNotice.addEventListener('change', onCheckinNoticeChange);
  checkoutNotice.addEventListener('change', onCheckoutNoticeChange);
  typeNotice.addEventListener('change', ontypeNoticeChange);
  roomNumber.addEventListener('change', onRoomNumberChange);
}

function makeElementNoticeRed(element) {
  element.style.borderWidth = '10px';
  element.style.borderColor = 'red';
}

function onFormNoticeInvald(evt) {
  // evt.preventDefault();
  makeElementNoticeRed(evt.target);
}

function restoreDefaultFormNotice() {
  titleNotice.value = '';
  titleNotice.style.borderWidth = '1px';
  titleNotice.style.borderColor = '#d9d9d3';

  typeNotice.selectedIndex = typeNotice.querySelector('option[selected]').index;

  priceNotice.min = 1000;
  priceNotice.value = 1000;
  priceNotice.style.borderWidth = '1px';
  priceNotice.style.borderColor = '#d9d9d3';

  roomNumber.selectedIndex = roomNumber.querySelector('option[selected]').index;
  capacityNotice.selectedIndex = capacityNotice.querySelector('option[selected]').index;
  checkinNotice.selectedIndex = checkinNotice.querySelector('option[selected]').index;
  checkoutNotice.selectedIndex = checkoutNotice.querySelector('option[selected]').index;
  descriptionNotice.value = '';
  addressNotice.value = '';

  var allFeaturesNotice = featuresNotice.querySelectorAll('input[type="checkbox"]');
  for (var i = 0; i < allFeaturesNotice.length; ++i) {
    allFeaturesNotice[i].checked = false;
  }
}

function onFormNoticeSubmit(evt) {
  evt.preventDefault();
  restoreDefaultFormNotice();
}
