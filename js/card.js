// card.js

'use strict';


window.getLodge = (function () {
  var typeToDesc = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };

  var lodgeTemplate = document.querySelector('#lodge-template').content;

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

  return getLodge;
})();

