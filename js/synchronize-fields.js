window.synchronizeFields = function (fromElement, toElement, eventType, cb, valuesFromElement, valuesToElement) {
  if (typeof cb === 'function') {
    function onFromElementSomewhatHappen(evt) {
      cb(fromElement, toElement, valuesFromElement, valuesToElement);
    }

    fromElement.addEventListener(eventType, onFromElementSomewhatHappen)
  }
};
