//© 2025 LeeKiJoon all rights reserved
'use strict';
//Close window button event listener
closeWindowButton.addEventListener('click', () =>
{
    window.api.closeWindow();
});

//Minimize window button event listener
minimizeWindowButton.addEventListener('click', () => 
{
    window.api.minimizeWindow();
});

//Resize window button event listener
resizeWindowButton.addEventListener('click', () =>
{
    window.api.maximizeRestoreWindow();
});

//Change maximize/restore button with window status
function changeMaximizeRestoreButton(windowMaximized)
{
    if(windowMaximized)
    {
        windowMaximized = false;
        resizeWindowButton.title = 'Restore';
        resizeWindowButton.classList.remove('title-bar-restore-button');
        resizeWindowButton.classList.add('title-bar-maximize-button');
        window.api.restoreWindow();
    }
    else
    {
        windowMaximized = true;
        resizeWindowButton.title = 'Maximize';
        resizeWindowButton.classList.remove('title-bar-maximize-button');
        resizeWindowButton.classList.add('title-bar-restore-button');
        window.api.maximizeWindow();
    }
    
};

//Check maximize status => if maximize: restore button, if restored: maximize button
window.api.checkMaximizeStatus((isMaximized) => {
    changeMaximizeRestoreButton(isMaximized);
});