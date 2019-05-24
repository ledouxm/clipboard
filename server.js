const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron')
const robotJs = require('robotjs');

let mainWin,addWin;
global.sharedObject = {shortcutModel:null};

function createWindow () {
  // Cree la fenetre du navigateur.
  mainWin = new BrowserWindow({ width: 250, height: 100, show:false, webPreferences: { nodeIntegration: true } })
  addWin = new BrowserWindow({ width: 800, height: 600, show:false, webPreferences: { nodeIntegration: true } })


  const shortcut = globalShortcut.register('CmdOrCtrl+Space', () => {
  	if(mainWin.isVisible())mainWin.hide();
  	else mainWin.show();
  });

  if (!shortcut) { console.log('Registration failed.'); }
  // and load the index.html of the app.
  mainWin.loadFile('index.html')
  addWin.loadFile('add.html');
  addWin.hide();
}

app.on('ready', createWindow)

ipcMain.on('add',(event,arg)=>{
	console.log(arg);
	addWin.show();
	event.returnValue='pong';
});

ipcMain.on('endAdd',(event,arg)=>{
	addWin.hide();
	event.returnValue='pong';
});

ipcMain.on('hideMain',(event,arg)=>{
	mainWin.hide();
	event.returnValue='pong';
});