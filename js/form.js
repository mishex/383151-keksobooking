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

  function syncValue(element, value) {
    element.value = value;
  }

  function syncValueAndMin(element, value) {
    syncValue(element, value);
    element.min = value;
  }

  checkinNotice.addEventListener('change', function () {
    window.synchronizeFields(checkinNotice, checkoutNotice, ['12', '13', '14'], ['12', '13', '14'], syncValue);
  });

  checkoutNotice.addEventListener('change', function () {
    window.synchronizeFields(checkoutNotice, checkinNotice, ['12', '13', '14'], ['12', '13', '14'], syncValue);
  });

  typeNotice.addEventListener('change', function () {
    window.synchronizeFields(typeNotice, priceNotice, ['flat', 'bungalo', 'palace'], ['1000', '0', '10000'], syncValueAndMin);
  });

  roomNumber.addEventListener('change', function () {
    window.synchronizeFields(roomNumber, capacityNotice, ['1', '2', '100'], ['0', '3', '3'], syncValue);
  });

  return {setAddress: setAddressNotice};

})();
