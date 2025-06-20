//© 2025 LeeKiJoon all rights reserved
'use strict';
let memoId = null;

//receive memo id when new memo window created
window.api.receiveMemoId((id) => {
  memoId = id;
  console.log(memoId);
});

// close button event listener
closeMemoWindowButton.addEventListener('click', () => {
  if (memoId !== null) {
    window.api.closeMemoWindow(memoId);
    console.log(memoId);
  }
});