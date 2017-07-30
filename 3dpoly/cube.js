var Cube = {
    initPoly: function () {
        Poly.vertices = [
            [[0], [0], [0]], [[0], [0], [100]], [[0], [100], [0]], [[0], [100], [100]],
            [[100], [0], [0]], [[100], [0], [100]], [[100], [100], [0]], [[100], [100], [100]] //cube

        ];

        Poly.lines = [
            [0, 1], [0, 2], [0, 4], [1, 3], [1, 5], [2, 3],
            [3, 7], [4, 5], [4, 6], [5, 7], [6, 7], [6, 2] //cube

        ];
    },

    initCamera: function () {
        Camera.location = [[-50], [-150], [500]];
    },

    screen: [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0.0015, 0]],

    particles: [],

    projection: function () {
        Projection.vertices = [];
        for (var i = 0; i < Poly.vertices.length; i++) {
            var transpose = Matrix.add(Poly.vertices[i], Camera.location);
            transpose = Matrix.multiply(this.YrotationMatrix(), transpose);
            transpose.push([1]);
            transpose = Matrix.multiply(this.screen, transpose);
            Projection.vertices.push([transpose[0][0] / transpose[3][0], transpose[1][0] / transpose[3][0]]);
        }
    },


    YrotationMatrix: function () {
        var theta = Math.PI - Camera.theta;
        return [[Math.cos(theta), 0, Math.sin(theta)],
        [0, 1, 0],
        [-Math.sin(theta), 0, Math.cos(theta)]];
    },

    centerX: 0,
    centerY: 0,
    canvas: null,
    ctx: null,
    speed: 3,

    initCanvas: function () {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    },
    init: function () {
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
        this.ctx.canvas.width = document.body.clientWidth;
        this.ctx.canvas.height = document.body.clientHeight;
        this.centerX = canvas.width / 2 - 200;
        this.centerY = canvas.height / 2 - 100;
        this.initCanvas();
        this.initCamera();
        this.initPoly();
    },


    drawLines: function () {
        for (var i = 0; i < Poly.lines.length; i++) {
            var p1 = Projection.vertices[Poly.lines[i][0]];
            var p2 = Projection.vertices[Poly.lines[i][1]];
            this.ctx.beginPath();
            this.ctx.moveTo(p1[0] + this.centerX, p1[1] + this.centerY);
            this.ctx.lineTo(p2[0] + this.centerX, p2[1] + this.centerY);
            this.ctx.lineWidth = 3;
            this.ctx.strokeStyle = "white";
            //this.ctx.stroke();
        }
        for (var i = 0; i < Projection.vertices.length; i++) {
            var p = {
                x: Projection.vertices[i][0],
                y: Projection.vertices[i][1],
                age: 1
            };
            this.particles.push(p);
        }
        for (var i = 0; i < this.particles.length; i++) {
            this.ctx.beginPath();
            this.ctx.rect(this.particles[i].x + this.centerX, this.particles[i].y + this.centerY, 1, 1);
            this.ctx.fillStyle = 'white';
            this.ctx.fill();
            this.particles[i].age += 1;
            if (this.particles[i].age > 800) {
                this.particles.splice(i, 1);
            }
        }
    },

    draw: function () {
        Camera.location[1][0] += this.speed * Camera.direction;
        if (Camera.location[1][0] > 150 || Camera.location[1][0] < -200) {
            Camera.direction = Camera.direction * -1;
        }
        Camera.location[2][0] = 50 + 500 * Math.cos(Camera.theta);
        Camera.location[0][0] = 50 + 500 * Math.sin(Camera.theta);
        Camera.theta = (Camera.theta + 0.05) % (Math.PI * 2);
        // if(Math.random() > 0.8) {
        //     //MUTATE!
        //     var index1 = Math.floor(Math.random()*(Poly.vertices.length));
        //     var index2 = Math.floor(Math.random()*3);
        //     Poly.vertices[index1][index2][0] += Math.random()*10;
        // }
        this.initCanvas();
        this.projection();
        this.drawLines();
    }
}
Cube.init();
Animation.animate(Cube, Cube.canvas, Cube.ctx);