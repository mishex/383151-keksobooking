'use strict';

window.tokyoMap = (function () {
  var URL_LOAD_PINS = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';
  var pinPlaces = [];
  var filteredPinPlaces = [];

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

  var offsetData;

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

  function getPinPlaces() {
    return pinPlaces;
  }

  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '10px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  function onSuccessLoadPins(pins) {
    pinPlaces = pinPlaces.concat(pins);
    filteredPinPlaces = pinPlaces;
    window.filter.filterPins();
  }

  function updateMap(pins) {
    var oldPins = tokyoPinMap.querySelectorAll('.pin__notmain');
    oldPins.forEach(function (item) {
      item.parentNode.removeChild(item);
    });
    window.insertPinsFragment(pins, tokyoPinMap);
    filteredPinPlaces = pins;
    hideDialog();
  }

  function initMap() {
    window.load(URL_LOAD_PINS, onSuccessLoadPins, errorHandler);
  }

  function activatePin(pin) {
    if (!pin) {
      return;
    }

    var activatedPin = tokyoPinMap.querySelector('.pin--active');
    if (activatedPin) {
      activatedPin.classList.remove('pin--active');
    }

    pin.classList.add('pin--active');

    if (pin.id.includes('pin-')) {
      window.showDialog(filteredPinPlaces[parseInt(pin.id.split('pin-')[1], 10)], window.getLodge);
    }
  }

  function deactivatePin() {
    var activatedPin = tokyoPinMap.querySelector('.pin--active');

    if (activatedPin) {
      activatedPin.classList.remove('pin--active');
    }

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

  function onMainPinStartDrag(evt) {
    if (evt.target.tagName === 'IMG') {
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
    if (!offsetData) {
      return false;
    }

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

  setEventMap(window.formNoticePublishing.setAddress);
  window.filter.setPinsMethods(getPinPlaces, updateMap);
  initMap();

})();
