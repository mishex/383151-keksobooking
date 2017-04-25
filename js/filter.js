// filter.js

'use strict';

(function () {
  var filterElement = document.querySelector('.tokyo__filters');
  var type = filterElement.querySelector('#housing_type');
  var price = filterElement.querySelector('#housing_price');
  var roomNumber = filterElement.querySelector('#housing_room-number');
  var guestsNumber = filterElement.querySelector('#housing_guests-number');

  function trueFunctionFilter(it) {
    return true;
  }

  function TypeFilterFlat(type) {
    return (function (it) {
      return it.offer.type === type;
    });
  }

  function priceFilterMiddle(more, less) {
    return (function (it) {
      return it.offer.price >= more && it.offer.price <= less;
    });
  }

  function priceFilterMoreThan(more) {
    return (function (it) {
      return it.offer.price >= more;
    });
  }

  function PriceFilterLessThan(less) {
    return (function (it) {
      return it.offer.price <= less;
    });
  }

  function roomNumberFilter(num) {
    return (function () {
      return it.offer.rooms === num;
    });
  }

  function guestsNumberFilter(num) {
    return (function () {
      return it.offer.guests === num;
    });
  }

  var filters = {
    type: trueFunctionFilter,
    // price: priceFilterMiddle(10000, 50000),
    price: trueFunctionFilter,
    rooms: trueFunctionFilter,
    guests: trueFunctionFilter
  };

  function filterPins() {
    var pins = window.tokyoMap.getPinPlaces();
    for (var filter in filters) {
      pins = pins.filter(filters[filter]);
    }

    window.tokyoMap.updateMap(pins);
  }

  type.addEventListener('change', function () {
    switch (type.value) {
      case 'any':
        filters.type = trueFunctionFilter;
        break;
      case 'flat':
      case 'house':
      case 'bungalo':
        filters.type = TypeFilterFlat(type.value);
        break;
      default:
        filters.type = trueFunctionFilter;
    }

    filterPins();
  });

})();
