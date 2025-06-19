//© 2025 LeeKiJoon all rights reserved
'use strict';
addNoteButton.addEventListener('click', () => {
  const id = Date.now();
  window.api.openMemo(id);
});
