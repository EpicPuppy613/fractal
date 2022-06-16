canvas = document.getElementById('test');
debug = document.getElementById('debug');
/** @type {CanvasRenderingContext2D} */
ctx = canvas.getContext('2d');
pattern = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
]

layers = 6;
tiles = [3, 3];
maxlayer = layers - 1;
size = [tiles[0] ** layers, tiles[1] ** layers];
canvas.width = size[0];
canvas.height = size[1];
ctx.fillRect(0, 0, size[0], size[1]);
function Draw(pos, tiles, size) {
    for (var y = 0; y < pattern.length; y++) {
        for (var x = 0; x < pattern[y].length; x++) {
            if (pattern[y][x]) ctx.fillStyle = 'black';
            else ctx.fillStyle = 'white';
            ctx.fillRect(pos[0] + x * (size[0] / tiles[0]), pos[1] + y * (size[1] / tiles[1]), (size[0] / tiles[0]), (size[1] / tiles[1]))
        }
    }
}
var F = {};
F.x = 0;
F.y = 0;
F.layers = 1;
function RecursiveCheck(x, y, layer) {
    check = layer;
    while (check > 0) {
        if (!pattern[Math.floor(y / tiles[1] ** (check - 1)) % tiles[1]][Math.floor(x / tiles[0] ** (check - 1)) % tiles[0]]) {
            return false;
        }
        check--;
    }
    return true;
}
function Main() {
    try {
    debug.innerHTML = `x: ${F.x}, y: ${F.y}, layers: ${F.layers}, true: ${pattern[F.y % tiles[1]][F.x % tiles[0]]}`
    if (RecursiveCheck(F.x, F.y, F.layers)) Draw([F.x * (size[0] / tiles[0] ** F.layers), F.y * (size[1] / tiles[1] ** F.layers)], tiles, [size[0] / tiles[0] ** F.layers, size[1] / tiles[1] ** F.layers]);
    F.y++;
    if (F.y >= Math.pow(tiles[1], F.layers)) {
        F.y = 0;
        F.x++;
    }
    if (F.x >= Math.pow(tiles[0], F.layers)) {
        F.y = 0;
        F.x = 0;
        F.layers++;
    }
    if (F.layers > maxlayer) {
        clearInterval(loop);
        return;
    }   
    } catch (err) {
        debug.innerHTML = err.stack;
    }
}
var loop = setInterval(() => {}, 10);
function Generate() {
    var speed = document.getElementById('speed').value;
    var interval = 2;
    switch (speed) {
        case "1":
            interval = 256;
            break;
        case "2":
            interval = 128;
            break;
        case "3":
            interval = 64;
            break;
        case "4":
            interval = 32;
            break;
        case "5":
            interval = 16;
            break;
        case "6":
            interval = 8;
            break;
        case "7":
            interval = 4;
            break;
        case "8":
            interval = 2;
            break;
        case "9":
            interval = 1;
            break;
        default:
            interval = 10;
    }
    for (x = 0; x < 3; x++) {
        for (y = 0; y < 3; y++) {
            pattern[y][x] = document.getElementById(x + ',' + y).checked;
        }
    }
    Draw([0, 0], tiles, size);
    F.x = 0;
    F.y = 0;
    F.layers = 1;
    clearInterval(loop);
    loop = setInterval(function () {
        for (var i = 0; i < tiles[0] ** (F.layers - 1); i++) {
            Main();
        }
    }, interval);
}