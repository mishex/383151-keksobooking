'use strict';

window.showDialog = (function () {
  var dialog = document.querySelector('.dialog');
  var dialogTitle = dialog.querySelector('.dialog__title');

  return (function (pinPlace, renderPinPlace) {
    var dialogPanel = dialog.querySelector('.dialog__panel');

    if (typeof renderPinPlace === 'function') {
      dialogPanel.parentNode.replaceChild(renderPinPlace(pinPlace), dialogPanel);
    }

    dialogTitle.querySelector('img').src = pinPlace.author.avatar;
    dialog.style.display = '';
  });
})();
