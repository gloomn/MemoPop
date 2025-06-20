//© 2025 LeeKiJoon all rights reserved
'use strict';
const { 
  app, 
  BrowserWindow,
  ipcMain 
} = require('electron/main')
const path = require('path')
let window;
const memoWindows = {};

function createWindow () 
{
  window = new BrowserWindow
    ({
        width: 400,
        height: 600,
        minWidth: 400,
        minHeight: 600,
        autoHideMenuBar: true,
        frame: false,
        webPreferences:
        {
            sandbox: true,
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js')
        },
        icon: path.join(__dirname, '../../assets/icons/win/png/icon.png'),
    });

    //Maximize/Restore window
    ipcMain.on('maximize-restore-window', () =>
    {
        if(window.isMaximized())
        {
            window.restore();
            console.log('Window restored');
        }
        else
        {
            window.maximize();
            console.log('Window maximized');
        }
    });

    //Send maximized status to renderer.js
    window.on('maximize', () => 
    {
        window.webContents.send('isMaximized');
    });
    
    //Send unmaximized status to renderer.js
    window.on('unmaximize', () => 
    {
        window.webContents.send('isRestored');
    });

    //Minimize window
    ipcMain.on('minimize-window', () =>
    {
        window.minimize();
        console.log('Window minimized');
    });

    //Close window
    ipcMain.on('close-window', () => 
    {
        if(window)
        {
            window.close();
        }
    });

  window.loadFile('src/html/index.html')
}

ipcMain.on('open-memo', (event, id) => 
{
  const memoWindow = new BrowserWindow(
  {
    width: 300,
    height: 300,
    modal: false,
    frame: false,
    autoHideMenuBar: true,
    webPreferences: 
    {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../../assets/icons/win/png/icon.png'),
  });

  memoWindow.loadFile('src/html/popup.html');
  memoWindow.webContents.once('did-finish-load', () => 
  {
    memoWindow.webContents.send('memo-id', id);
  });

  memoWindows[id] = memoWindow;

  memoWindow.on('closed', () => 
  {
    delete memoWindows[id];
  });
});

ipcMain.on('close-memo-window', (event, id) => 
{
  if (memoWindows[id]) 
  {
    memoWindows[id].close();
  }
});

app.whenReady().then(() => 
{
  createWindow();

  app.on('activate', () => 
  {
    if (BrowserWindow.getAllWindows().length === 0) 
    {
      createWindow()
    }
  });
});

app.on('window-all-closed', () => 
{
  if (process.platform !== 'darwin') 
  {
    app.quit();
  }
});