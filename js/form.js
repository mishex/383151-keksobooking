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

  function setFormNoticeSubmitBehavior() {
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
  }

  return {
    setFormBehavior: setFormNoticeRelationship,
    setFormSubmitBehavior: setFormNoticeSubmitBehavior
  };
})();

window.formNoticePublishing.setFormBehavior();
window.formNoticePublishing.setFormSubmitBehavior();
