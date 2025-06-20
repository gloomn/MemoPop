//© 2025 LeeKiJoon all rights reserved
'use strict';
let memoId = null;

//receive memo id when new memo window created
window.api.receiveMemoId((id) => 
{
  memoId = id;
  console.log(memoId);
});

// close button event listener
closeMemoWindowButton.addEventListener('click', () => 
{
  if (memoId !== null) {
    window.api.closeMemoWindow(memoId);
    console.log(memoId);
  }
});

addNewMemoButton.addEventListener('click', () =>
{
  const id = Date.now();
  window.api.openMemo(id);
})

window.addEventListener('focus', () =>
{
  document.getElementById('memoFocusFooter').style.display = 'flex';
  requestAnimationFrame(() => 
  {
    document.getElementById('memoFocusFooter').style.opacity = '1';
  });
});

window.addEventListener('blur', () =>
{
  document.getElementById('memoFocusFooter').style.opacity = '0'; 
  setTimeout(() => 
  {
    document.getElementById('memoFocusFooter').style.display = 'none'; 
  }, 300);
});