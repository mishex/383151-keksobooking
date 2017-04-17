// map.js

'use strict';

window.tokyoMap = (function () {

  var pinPlaces = [];

  var NUMBER_PIN = 8;

  var ENTER_KEY_CODE = 13;
  var ESC_KEY_CODE = 27;

  var tokyo = document.querySelector('.tokyo');
  var dialog = tokyo.querySelector('.dialog');
  var tokyoPinMap = tokyo.querySelector('.tokyo__pin-map');
  var dialogPanel = dialog.querySelector('.dialog__panel');
  var dialogTitle = dialog.querySelector('.dialog__title');

  function setEventMap() {
    tokyoPinMap.addEventListener('click', onPinClick);
    dialog.querySelector('.dialog__close').addEventListener('click', onDialogCloseClick);
    tokyoPinMap.addEventListener('keydown', onPinPressEnter);
    dialog.querySelector('.dialog__close').addEventListener('keydown', onDialogClosePressEnter);
    tokyo.addEventListener('keydown', onPinPressEsc);
  }

  function initMap() {
    pinPlaces = getRandomPlaces(NUMBER_PIN);
    insertPinsFragment(pinPlaces, tokyoPinMap);
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
      showDialog(pin.id.split('pin-')[1]);
    }
  }

  function deactivatePin() {
    tokyoPinMap.querySelector('.pin--active').classList.remove('pin--active');
    hideDialog();
  }

  function showDialog(pinPlacesIndex) {
    dialogPanel = dialog.querySelector('.dialog__panel');
    dialogTitle = dialog.querySelector('.dialog__title');
    dialogPanel.parentNode.replaceChild(getLodge(pinPlaces[pinPlacesIndex]), dialogPanel);
    dialogTitle.querySelector('img').src = pinPlaces[pinPlacesIndex].author.avatar;
    dialog.style.display = '';
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

  return {
    init: initMap,
    setEvent: setEventMap
  };
})();

window.tokyoMap.init();
window.tokyoMap.setEvent();
