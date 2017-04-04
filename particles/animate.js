window.requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var Animation = {    
    animate: function (DrawObject, canvas, context) {
        // clear
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);

        //draw next frame
        DrawObject.draw(canvas,context);

        // request new frame
        requestAnimFrame(function () {
            Animation.animate(DrawObject, canvas, context);
        });
    }
}