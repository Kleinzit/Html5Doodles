var centerX;
var centerY;
var radius;
var canvas;
var ctx;
var points = [];
var max = 200;
var mult = 2;
var random = 0.8;

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
ctx.canvas.width = document.body.clientWidth;
ctx.canvas.height = document.body.clientHeight;

function init() {    
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
    radius = canvas.height / 3;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'white';
    ctx.stroke();
    getPoints();
    draw();
    setTimeout(redraw,100);
};

function getPoints() {
    for (var i = 0; i < max; i++) {
        var X = Math.floor(Math.cos(2 * Math.PI / max * i) * radius + centerX);
        var Y = Math.floor(Math.sin(2 * Math.PI / max * i) * radius + centerY);
        var point = { x: X, y: Y };
        points.push(point);
    }
}

function draw() {
    for (var i = 0; i < max; i++) {
        point1 = points[i];
        point2 = points[i * mult % max];
        ctx.beginPath();
        ctx.moveTo(point1.x, point1.y);
        ctx.lineTo(point2.x, point2.y);        
        ctx.lineWidth = 1;
        ctx.strokeStyle = "white";
        ctx.stroke();
    }    
};

function redraw() {
    if (Math.random() > random) {
        mult = Math.floor(Math.random() * max);
        init();
    }
    else {
        setTimeout(redraw,100);
    }
}

init();