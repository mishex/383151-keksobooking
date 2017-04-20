// show-card.js

'use strict';

window.showDialog = (function () {
  var dialog = document.querySelector('.dialog');
  var dialogTitle = dialog.querySelector('.dialog__title');

  return (function (pinPlace) {
    // It's not closure element
    var dialogPanel = dialog.querySelector('.dialog__panel');

    dialogPanel.parentNode.replaceChild(window.getLodge(pinPlace), dialogPanel);
    dialogTitle.querySelector('img').src = pinPlace.author.avatar;
    dialog.style.display = '';
  });
})();
