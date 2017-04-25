// filter.js

'use strict';

(function () {
  var filterElement = document.querySelector('.tokyo__filters');
  var type = filterElement.querySelector('#housing_type');
  var price = filterElement.querySelector('#housing_price');
  var roomNumber = filterElement.querySelector('#housing_room-number');
  var guestsNumber = filterElement.querySelector('#housing_guests-number');
  var features = filterElement.querySelector('#housing_features');

  var setFilterFeatures = [];

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

  function priceFilterLessThan(less) {
    return (function (it) {
      return it.offer.price <= less;
    });
  }

  function roomNumberFilter(num) {
    return (function (it) {
      return it.offer.rooms === num;
    });
  }

  function guestsNumberFilter(num) {
    return (function (it) {
      return it.offer.guests === num;
    });
  }

  function featuresFilter() {
    return (function (it) {
      for (var i = 0; i < setFilterFeatures.length; ++i) {
        if (it.offer.features.indexOf(setFilterFeatures[i]) === -1) {
          return false;
        }
      }
      return true;
    });
  }

  var filters = {
    type: trueFunctionFilter,
    price: trueFunctionFilter,
    rooms: trueFunctionFilter,
    guests: trueFunctionFilter,
    features: trueFunctionFilter
  };

  function filterPins() {
    var pins = window.tokyoMap.getPinPlaces();
    for (var filter in filters) {
      pins = pins.filter(filters[filter]);
    }

    window.debounce(window.tokyoMap.updateMap.bind({}, pins));
  }

  type.addEventListener('change', function (evt) {
    switch (evt.target.value) {
      case 'any':
        filters.type = trueFunctionFilter;
        break;
      case 'flat':
      case 'house':
      case 'bungalo':
        filters.type = TypeFilterFlat(evt.target.value);
        break;
      default:
        filters.type = trueFunctionFilter;
    }

    filterPins();
  });

  price.addEventListener('change', function (evt) {
    switch (evt.target.value) {
      case 'middle':
        filters.price = priceFilterMiddle(10000, 50000);
        break;
      case 'low':
        filters.price = priceFilterLessThan(10000);
        break;
      case 'high':
        filters.price = priceFilterMoreThan(50000);
        break;
      default:
        filters.price = trueFunctionFilter;
    }

    filterPins();
  });

  roomNumber.addEventListener('change', function (evt) {
    switch (evt.target.value) {
      case 'any':
        filters.rooms = trueFunctionFilter;
        break;
      case '1':
      case '2':
      case '3':
        filters.rooms = roomNumberFilter(parseInt(evt.target.value, 10));
        break;
      default:
        filters.rooms = trueFunctionFilter;
    }

    filterPins();
  });

  guestsNumber.addEventListener('change', function (evt) {
    switch (evt.target.value) {
      case 'any':
        filters.guests = trueFunctionFilter;
        break;
      case '1':
      case '2':
        filters.guests = guestsNumberFilter(parseInt(evt.target.value, 10));
        break;
      default:
        filters.guests = trueFunctionFilter;
    }

    filterPins();
  });

  features.addEventListener('change', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'input') {
      if (evt.target.checked) {
        if (setFilterFeatures.indexOf(evt.target.value) === -1) {
          setFilterFeatures.push(evt.target.value);
        }
      } else {
        var indexSetFilterFeatures = setFilterFeatures.indexOf(evt.target.value);
        if (indexSetFilterFeatures !== -1) {
          setFilterFeatures = setFilterFeatures.slice(0, indexSetFilterFeatures).
          concat(setFilterFeatures.slice(indexSetFilterFeatures + 1, indexSetFilterFeatures.length));
        }
      }
    }

    filters.features = featuresFilter();

    filterPins();
  })

})();
