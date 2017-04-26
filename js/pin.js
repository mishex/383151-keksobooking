'use strict';

window.insertPinsFragment = (function () {
  var pinTemplate = (function getPinTemplate() {
    var templatePin = document.createElement('div');
    templatePin.classList.add('pin');
    templatePin.classList.add('pin__notmain');

    var pinImg = document.createElement('img');
    pinImg.width = '40';
    pinImg.height = '40';
    pinImg.classList.add('rounded');

    templatePin.appendChild(pinImg);

    return templatePin;
  })();

  function renderPin(place) {
    var pin = pinTemplate.cloneNode(true);

    pin.style = 'left: ' + place.location.x + 'px; top: ' + place.location.y + 'px';
    pin.tabIndex = '0';
    var pinImg = pin.querySelector('img');
    pinImg.src = place.author.avatar;

    return pin;
  }

  function insertPinsFragment(pinPlaces, insertPlace) {
    var pinsFragment = document.createDocumentFragment();

    for (var i = 0; i < pinPlaces.length; i++) {
      var pinElement = renderPin(pinPlaces[i]);
      pinElement.id = 'pin-' + i;
      pinsFragment.appendChild(pinElement);
    }

    insertPlace.appendChild(pinsFragment);
  }

  return insertPinsFragment;
})();

