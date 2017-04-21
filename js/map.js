// map.js

'use strict';

window.tokyoMap = (function () {

  var pinPlaces = [];

  var NUMBER_PIN = 8;

  var ENTER_KEY_CODE = 13;
  var ESC_KEY_CODE = 27;

  var LEFT_PIN_BOUND = 300;
  var RIGHT_PIN_BOUND = 900;
  var TOP_PIN_BOUND = 100;
  var BOTTOM_PIN_BOUND = 500;


  var tokyo = document.querySelector('.tokyo');
  var dialog = tokyo.querySelector('.dialog');
  var tokyoPinMap = tokyo.querySelector('.tokyo__pin-map');
  var mainPin = tokyoPinMap.querySelector('.pin__main');

  var cbMoveMainPin;

  function setEventMap(callbackMoveMainPin) {
    cbMoveMainPin = callbackMoveMainPin;

    tokyo.addEventListener('dragover', onTokyoPinMapDragOver);
    tokyo.addEventListener('drop', onTokyoPinMapDrop);

    tokyo.addEventListener('click', onPinClick);
    dialog.querySelector('.dialog__close').addEventListener('click', onDialogCloseClick);
    tokyoPinMap.addEventListener('keydown', onPinPressEnter);
    dialog.querySelector('.dialog__close').addEventListener('keydown', onDialogClosePressEnter);
    tokyo.addEventListener('keydown', onPinPressEsc);
    mainPin.addEventListener('dragstart', onMainPinStartDrag);
  }

  function getPinPlace(indexPinPlaces) {
    return pinPlaces[indexPinPlaces];
  }

  function initMap() {
    pinPlaces = window.getRandomPlaces(NUMBER_PIN);
    window.insertPinsFragment(pinPlaces, tokyoPinMap);
    activatePin(tokyoPinMap.querySelector('#pin-0'));
  }

// ------*** functions ***-------

  function activatePin(pin) {
    var activePin = tokyoPinMap.querySelector('.pin--active');
    if (activePin) {
      activePin.classList.remove('pin--active');
    }

    pin.classList.add('pin--active');

    if (pin.id.includes('pin-')) {
      window.showDialog(pinPlaces[parseInt(pin.id.split('pin-')[1], 10)], window.getLodge);
    }
  }

  function deactivatePin() {
    tokyoPinMap.querySelector('.pin--active').classList.remove('pin--active');
    hideDialog();
  }

  function hideDialog() {
    dialog.style.display = 'none';
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

  // Chrome doesn't allow access to event.dataTransfer in dragover
  var offsetData;

  function onMainPinStartDrag(evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      var style = window.getComputedStyle(evt.target.parentNode, null);
      offsetData = (parseInt(style.getPropertyValue('left'), 10) - evt.clientX);
      offsetData += ',' + (parseInt(style.getPropertyValue('top'), 10) - evt.clientY);
      evt.dataTransfer.setData('text/plain', offsetData);
    }
  }

  function moveMainPin(left, top) {
    var x = (Math.min(Math.max(LEFT_PIN_BOUND, left), RIGHT_PIN_BOUND));
    var y = (Math.min(Math.max(TOP_PIN_BOUND, top), BOTTOM_PIN_BOUND));

    mainPin.style.left = x + 'px';
    mainPin.style.top = y + 'px';

    if (typeof cbMoveMainPin === 'function') {
      cbMoveMainPin(x, y);
    }
  }

  function onTokyoPinMapDragOver(evt) {
    var offset = offsetData.split(',');

    var left = evt.clientX + parseInt(offset[0], 10);
    var top = evt.clientY + parseInt(offset[1], 10);

    moveMainPin(left, top);

    evt.preventDefault();
    return false;
  }

  function onTokyoPinMapDrop(evt) {
    var offset = evt.dataTransfer.getData('text/plain').split(',');

    var left = evt.clientX + parseInt(offset[0], 10);
    var top = evt.clientY + parseInt(offset[1], 10);

    moveMainPin(left, top);

    evt.preventDefault();
    return false;
  }

  return {
    init: initMap,
    setEvent: setEventMap,
    getPinPlace: getPinPlace
  };
})();

window.tokyoMap.init();
window.tokyoMap.setEvent(window.formNoticePublishing.setAddress);
