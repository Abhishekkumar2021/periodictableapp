
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

//context styles
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.fillStyle = "white";
context.strokeStyle = "white";
context.save();

//clear full canvas
const clearCanvas = () => {
	context.clearRect(0, 0, canvas.width, canvas.height);
};

const fadeCanvas = () => {
	context.fillStyle = "rgba(46,47,48,0.9)";
	context.fillRect(0, 0, canvas.width, canvas.height);
};
//the mouse
const mouse = {
	x: 0,
	y: 0,
};
let hue = 1;
//particle class
class Particle {
	constructor() {
		hue++;
		this.x = mouse.x;
		this.y = mouse.y;
		// this.x = canvas.width * Math.random();
		// this.y = canvas.height * Math.random();
		this.size = Math.random() * 10 + 10;
		this.color = `hsl(${hue},100%,70%)`;
		this.vx = Math.random() * 10 - 5;
		this.vy = Math.random() * 10 - 5;
	}
	randomColor() {
		const h = Math.random() * 360;
		const s = 100;
		const l = 50;
		return `hsl(${h},${s}%,${l}%)`;
	}
	draw() {
		context.fillStyle = this.color;
		context.beginPath();
		context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
		context.fill();
	}
	updatePosition({ x, y }) {
		this.x = x;
		this.y = y;
	}
	moveAndShrink() {
		this.x += this.vx;
		this.y += this.vy;
		if (this.size >= 0.3) this.size -= 0.1;
	}
}

//The particles array
let particles = [];

//fill 100 particles
const fillParticles = () => {
	for (let i = 0; i < 20; i++) {
		particles.push(new Particle());
	}
};

//the constellation effect
const constellation = () => {
	for (let i = 0; i < particles.length; i++) {
		for (let j = i + 1; j < particles.length; j++) {
			let deltaX = particles[j].x - particles[i].x;
			let deltaY = particles[j].y - particles[i].y;
			let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
			if (distance >= 50 && distance<=200) {
				context.strokeStyle = particles[i].color;
				context.beginPath();
				context.moveTo(particles[j].x, particles[j].y);
				context.lineTo(particles[i].x, particles[i].y);
				context.lineWidth = particles[j].size / 100;
				context.stroke();
				context.closePath();
			}
		}
	}
};

//The bursting effect

// fillParticles();
const handleParticles = () => {
	for (let particle of particles) {
		particle.moveAndShrink();
		particle.draw();
		if (particle.size < 0.3) {
			particles.splice(particles.indexOf(particle), 1);
		}
	}
};

canvas.addEventListener("mousemove", (evt) => {
	mouse.x = evt.x;
	mouse.y = evt.y;
	fillParticles();
});

// //animation
let id2;
const updateParticles = () => {
	clearCanvas();
	// fadeCanvas();
	handleParticles();
	// constellation();

	id2 = requestAnimationFrame(updateParticles);
};
updateParticles();