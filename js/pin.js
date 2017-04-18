// pin.js

'use strict';

window.insertPinsFragment = (function () {

  function insertPinsFragment(pinPlaces, insertPlace) {

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

    insertPlace.appendChild(createPinsFragment());
  }

  return insertPinsFragment;
})();

