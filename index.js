const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const mouse = {
	x: canvas.width / 2,
	y: canvas.height / 2
}

window.addEventListener('mousemove', (event)=>{
	mouse.x = event.clientX;
	mouse.y = event.clientY;

	drawParticle();
});

function Particle(x, y, radius, color, velocity){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	this.velocity = velocity;

	this.gravity = 0.5;
	this.friction = 0.3;


	this.draw = function(context){
		context.beginPath();
		context.fillStyle = this.color;
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		context.fill();
		context.closePath();
	}

	this.update = function(context){
		this.draw(context);

		//adding gravity
		if(this.y + this.radius + this.velocity.y > canvas.height - 100){
			this.velocity.y = - this.velocity.y * this.friction;
			this.radius -= 0.1;
		}else{
			this.velocity.y += this.gravity;
		}

		this.x += this.velocity.x;
		this.y += this.velocity.y;
	}
}

let particles = [];
let frames = 0;
let colorArray = ['#f0e803', '#f2c617'];

function drawParticle () {

	const particleCount = Math.random() * 3 + 1;
	const globalVelocity = Math.random() * 5 + 1;

	for(let i = 0; i < particleCount; i++){
		const radinaIncrement = Math.PI * 2 / particleCount;

		const x = mouse.x;
		const y = mouse.y;
		const radius = 7;
		const color = colorArray[Math.floor(Math.random() * colorArray.length)];
		const velocity = {
			x: Math.cos(radinaIncrement * i) * globalVelocity,
			y: Math.sin(radinaIncrement * i) * globalVelocity
		}

		particles.push(new Particle(x, y, radius, color, velocity));
	}
	
}


function animate () {
	requestAnimationFrame(animate);
	ctx.fillStyle = "rgba(0, 0, 0, 1)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	particles.forEach((particle, index)=>{
		particle.update(ctx);

		if(particle.radius < 0){
			particles.splice(index, 1);
		}
	});

	

	if(frames % 6 == 0){
		drawParticle();
	}

	frames++;

	if(frames == 600){
		frames = 0;
	}

}

animate();
