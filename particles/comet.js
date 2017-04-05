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
        particleAge: 100,
        particleSize: 3,
        particleNumber: 20,
        particleDrift: 2
    },
    filter: {
        strength: 10,
        frameTime: 0,
        lastLoop: new Date,
        thisLoop: new Date,
        updateFps: function () {
            var thisFrameTime = (this.thisLoop = new Date) - this.lastLoop;
            this.frameTime += (thisFrameTime - this.frameTime) / this.strength;
            this.lastLoop = this.thisLoop;
            document.getElementById("FPS").innerHTML = "FPS: " + (1000 / this.frameTime).toFixed(0);            
        }
    },
    particles: [],
    draw: function (canvas, context) {
        if (this.props.startTime == null) {
            this.props.startTime = new Date().getTime();
        }

        this.reposition(canvas);

        this.drawSquare(context);

        this.drawParticles(context);

        for (var i = 0; i < this.props.particleNumber; i++) {
            this.particles.push({
                x: this.props.x + this.props.radius / 2 - this.props.particleSize / 2,
                y: this.props.y + this.props.radius / 2 - this.props.particleSize / 2,
                age: this.props.particleAge,
            });

        }

        this.filter.updateFps();
        document.getElementById("counter").innerHTML = "Particles: " + this.particles.length;

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
        context.fillStyle = 'rgba(255,' + Math.floor((particle.age / this.props.particleAge) * 255) + ',0,' + particle.age / this.props.particleAge + ')';
        context.fill();
        particle.age -= 1;
        particle.y += (Math.random() - 0.5) * this.props.particleDrift;
        particle.x += (Math.random() - 0.5) * this.props.particleDrift;
    },
    setParticleSize: function () {
        document.getElementById("particleSizeText").innerHTML = "Particle Size: " + document.getElementById("particleSize").value;
        this.props.particleSize = parseInt(document.getElementById("particleSize").value);
    },
    setParticleNumber: function () {
        document.getElementById("particleNumberText").innerHTML = "Particle Number: " + document.getElementById("particleNumber").value;
        this.props.particleNumber = parseInt(document.getElementById("particleNumber").value);
    },
    setParticleAge: function () {
        document.getElementById("particleAgeText").innerHTML = "Particle Age: " + document.getElementById("particleAge").value;
        this.props.particleAge = parseInt(document.getElementById("particleAge").value);
    },
    setParticleDrift: function () {
        document.getElementById("particleDriftText").innerHTML = "Particle Drift: " + document.getElementById("particleDrift").value;
        this.props.particleDrift = parseInt(document.getElementById("particleDrift").value);
    },
    setParticleSpeed: function () {
        document.getElementById("particleSpeedText").innerHTML = "Rotation Speed: " + document.getElementById("particleSpeed").value;
        this.props.speed = parseFloat(document.getElementById("particleSpeed").value);
    }
}