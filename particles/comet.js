var Comet = {
    props: {
        speed: 1.7,
        x: 0,
        y: 0,
        origX: 0,
        origY: 0,
        radius: 5,
        rotation: 200,
        startTime: null,
        color: '#FFFFFF',
        particleAge: 200,
        particleSize: 3
    },
    particles: [],
    draw: function (canvas, context) {
        if (this.props.startTime == null) {
            this.props.startTime = new Date().getTime();
        }

        this.reposition(canvas);

        this.drawSquare(context);

        this.drawParticles(context);

        for (var i = 0; i < 10; i++) {
            this.particles.push({
                x: this.props.x + this.props.radius / 2 - this.props.particleSize / 2,
                y: this.props.y + this.props.radius / 2 - this.props.particleSize / 2,
                age: this.props.particleAge,
            });

        }
    },
    reposition: function (canvas) {
        var time = (new Date().getTime() - this.props.startTime) / 1000 * this.props.speed;
        this.props.x = this.props.origX + this.props.rotation * Math.sin(time);
        this.props.y = this.props.origY + this.props.rotation * Math.cos(time);
        if (this.props.x >= canvas.width) {
            this.props.x = 0;
        }
        //this.props.y = this.props.y + Math.sin(this.props.startTime)*10;

    },
    drawSquare: function (context) {
        context.beginPath();
        context.rect(this.props.x, this.props.y, this.props.radius, this.props.radius);
        context.fillStyle = this.props.color;
        context.fill();
    },
    drawParticles: function (context) {
        var i = this.particles.length - 1;
        while (i >= 0) {
            if (this.particles[i].age > 0) {
                this.drawSingleParticle(context, this.particles[i]);
            }
            else {
                this.particles.splice(i, 1);
            }
            i -= 1;
        }
    },
    drawSingleParticle: function (context, particle) {
        context.beginPath();
        context.rect(particle.x, particle.y, this.props.particleSize, this.props.particleSize);
        context.fillStyle = 'rgba(255,' + Math.floor((particle.age / this.props.particleAge) * 255) + ',0,'+particle.age / this.props.particleAge+')';
        context.fill();
        particle.age -= 1;
        particle.y += (Math.random() - 0.5) * 2;
        particle.x += (Math.random() - 0.5) * 2;
    },
    hex2rgb: function (hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
}