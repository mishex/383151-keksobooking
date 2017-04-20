// form.js

'use strict';

window.formNoticePublishing = (function () {

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

  formNotice.addEventListener('invalid', onFormNoticeInvald, true);
  formNotice.addEventListener('submit', onFormNoticeSubmit, true);

  function setAddressNotice(x, y) {
    addressNotice.value = 'x: ' + x + ', y: ' + y;
  }

  function syncSameSelect(fromElement, toElement) {
    toElement.selectedIndex = fromElement.selectedIndex;
  }

  function syncSelectValueWithMin(fromElement, toElement, valuesFromElement, minToElement) {
    var valueFromElement = fromElement.options[fromElement.selectedIndex].textContent;

    valuesFromElement.forEach(function (val, index) {
      if (valueFromElement === val) {
        toElement.min = minToElement[index];
        toElement.value = minToElement[index];
      }
    });
  }

  function syncSelectOptValueWithSelectOptValue(fromElement, toElement, valuesFromElement, valuesToElement) {
    debugger;
    var valueFromElement = fromElement.options[roomNumber.selectedIndex].value;

    valuesFromElement.forEach(function (val, index) {
      if (val === valueFromElement) {
        toElement.selectedIndex = toElement.querySelector('option[value="' + valuesToElement[index] + '"]').index;
      }
    });
  }

  window.synchronizeFields(checkinNotice, checkoutNotice, 'change', syncSameSelect);
  window.synchronizeFields(checkoutNotice, checkinNotice, 'change', syncSameSelect);
  window.synchronizeFields(typeNotice, priceNotice, 'change', syncSelectValueWithMin, ['Квартира', 'Дворец', 'Лачуга'], [1000, 10000, 0]);
  window.synchronizeFields(roomNumber, capacityNotice, 'change', syncSelectOptValueWithSelectOptValue, ['1', '2', '100'], ['0', '3', '3']);

  return {setAddress: setAddressNotice};

})();
