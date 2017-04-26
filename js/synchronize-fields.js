'use strict';

window.synchronizeFields = (function (fromElement, toElement, valuesFromElement, valuesToElement, cb) {
  if (typeof cb === 'function') {
    for (var i = 0; i < valuesFromElement.length; ++i) {
      if (fromElement.value === valuesFromElement[i]) {
        cb(toElement, valuesToElement[i]);
        break;
      }
    }
  }
});
