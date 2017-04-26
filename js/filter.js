'use strict';

window.filter = (function () {
  var filterElement = document.querySelector('.tokyo__filters');
  var type = filterElement.querySelector('#housing_type');
  var price = filterElement.querySelector('#housing_price');
  var roomNumber = filterElement.querySelector('#housing_room-number');
  var guestsNumber = filterElement.querySelector('#housing_guests-number');
  var features = filterElement.querySelector('#housing_features');

  var setFilterFeatures = [];

  var pinsMapMethods = {
    get: function () {
      return [];
    },
    show: function () {}
  };

  function filterTrueFunction(it) {
    return true;
  }

  function filterType(typeOfBuild) {
    return (function (it) {
      return it.offer.type === typeOfBuild;
    });
  }

  function filterPriceMiddle(more, less) {
    return (function (it) {
      return it.offer.price >= more && it.offer.price <= less;
    });
  }

  function filterPriceMoreThan(more) {
    return (function (it) {
      return it.offer.price >= more;
    });
  }

  function filterPriceLessThan(less) {
    return (function (it) {
      return it.offer.price <= less;
    });
  }

  function filterRoomNumber(num) {
    return (function (it) {
      return it.offer.rooms === num;
    });
  }

  function filterGuestsNumber(num) {
    return (function (it) {
      return it.offer.guests === num;
    });
  }

  function filterFeatures() {
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
    type: filterTrueFunction,
    price: filterPriceMiddle(10000, 50000),
    rooms: filterTrueFunction,
    guests: filterTrueFunction,
    features: filterTrueFunction
  };

  function filterPins() {
    var pins = pinsMapMethods.get();
    for (var filter in filters) {
      if (filters.hasOwnProperty(filter)) {
        pins = pins.filter(filters[filter]);
      }
    }

    window.debounce(pinsMapMethods.show.bind({}, pins));
  }

  type.addEventListener('change', function (evt) {
    switch (evt.target.value) {
      case 'any':
        filters.type = filterTrueFunction;
        break;
      case 'flat':
      case 'house':
      case 'bungalo':
        filters.type = filterType(evt.target.value);
        break;
      default:
        filters.type = filterTrueFunction;
    }

    filterPins();
  });

  price.addEventListener('change', function (evt) {
    switch (evt.target.value) {
      case 'middle':
        filters.price = filterPriceMiddle(10000, 50000);
        break;
      case 'low':
        filters.price = filterPriceLessThan(10000);
        break;
      case 'high':
        filters.price = filterPriceMoreThan(50000);
        break;
      default:
        filters.price = filterTrueFunction;
    }

    filterPins();
  });

  roomNumber.addEventListener('change', function (evt) {
    switch (evt.target.value) {
      case 'any':
        filters.rooms = filterTrueFunction;
        break;
      case '1':
      case '2':
      case '3':
        filters.rooms = filterRoomNumber(parseInt(evt.target.value, 10));
        break;
      default:
        filters.rooms = filterTrueFunction;
    }

    filterPins();
  });

  guestsNumber.addEventListener('change', function (evt) {
    switch (evt.target.value) {
      case 'any':
        filters.guests = filterTrueFunction;
        break;
      case '1':
      case '2':
        filters.guests = filterGuestsNumber(parseInt(evt.target.value, 10));
        break;
      default:
        filters.guests = filterTrueFunction;
    }

    filterPins();
  });

  features.addEventListener('change', function (evt) {
    if (evt.target.tagName === 'INPUT') {
      if (evt.target.checked && setFilterFeatures.indexOf(evt.target.value) === -1) {
        setFilterFeatures.push(evt.target.value);
      } else {
        var indexSetFilterFeatures = setFilterFeatures.indexOf(evt.target.value);
        if (indexSetFilterFeatures !== -1) {
          setFilterFeatures = setFilterFeatures.slice(0, indexSetFilterFeatures).
          concat(setFilterFeatures.slice(indexSetFilterFeatures + 1, indexSetFilterFeatures.length));
        }
      }
    }

    filters.features = filterFeatures();

    filterPins();
  });

  function setPinsMethods(get, show) {
    if (typeof get === 'function') {
      pinsMapMethods.get = get;
    }

    if (typeof show === 'function') {
      pinsMapMethods.show = show;
    }
  }

  return {
    filterPins: filterPins,
    setPinsMethods: setPinsMethods
  };
})();
