// synchronize-fields.js

'use strict';

window.synchronizeFields = function (fromElement, toElement, eventType, cb, valuesFromElement, valuesToElement) {
  function onFromElementSomewhatHappen(evt) {
    cb(fromElement, toElement, valuesFromElement, valuesToElement);
  }

  if (typeof cb === 'function') {
    fromElement.addEventListener(eventType, onFromElementSomewhatHappen);
  }
};
