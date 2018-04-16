const path = require('path');
const {app, BrowserWindow, TouchBar} = require('electron');
const {TouchBarButton} = TouchBar;

let window;
const petes = [];
const numOfPetes = 6;
let peteFrame = 0;

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const init = () => {
    for (let x = 0; x < numOfPetes; x++) {
        petes.push(new TouchBarButton({
            icon: path.join(__dirname, '/img/pete000.png'),
            backgroundColor: '#fff'
        }));
    }
    return petes;
}

const touchBar = new TouchBar(init());

const render = () => {
    peteFrame = peteFrame > numOfPetes ? 0 : peteFrame += 1;

    const petePath = path.join(__dirname, `/img/pete00${peteFrame}.png`);

    for (let x = 0; x < numOfPetes; x++) {
        petes[x].icon = petePath;
        petes[x].backgroundColor = getRandomColor();
    }
}

const animatePetes = () => {
    setInterval(render, 100)
}

// electron init
app.once('ready', () => {
    window = new BrowserWindow({
        width: 200,
        height: 200
    });
    window.loadURL(`file://${path.join(__dirname, '/index.html')}`);
    window.setTouchBar(touchBar);
    animatePetes();
})

app.on('window-all-closed', () => {
    app.quit();
});
