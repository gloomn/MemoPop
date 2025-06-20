//© 2025 LeeKiJoon all rights reserved
'use strict';
const { contextBridge, ipcRenderer } = require('electron');

const WINDOW_API = {
    //Close window
    closeWindow: () => 
    {
        ipcRenderer.send('close-window');
    },

    //Minimize window
    minimizeWindow: () => 
    {
        ipcRenderer.send('minimize-window');
    },

    //Maximize/Restore window
    checkMaximizeStatus: (callback) => 
    {
        ipcRenderer.on('isMaximized', () => 
        {
            callback(false);
        });

        ipcRenderer.on('isRestored', () => 
        {
            callback(true);
        });
    },

    maximizeRestoreWindow: () =>
    {
        ipcRenderer.send('maximize-restore-window');
    },

    closeMemoWindow: (id) =>
    {
        ipcRenderer.send('close-memo-window', id);
    },

    openMemo: (id) => 
    {
        ipcRenderer.send('open-memo', id)
    },

    receiveMemoId: (callback) => 
    {
        ipcRenderer.on('memo-id', (event, id) => callback(id))
    },
}
contextBridge.exposeInMainWorld('api', WINDOW_API);