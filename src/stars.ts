const stars_count = 60;
let stars: Star[] = []

export let speed_fac = 1.0;

import { display_height, display_width } from "./index";

export function draw_stars(delta: number, ctx: CanvasRenderingContext2D) {
	// If there aren't any stars, populate them and simulate a few seconds
	if (stars.length == 0) {
		init_stars()
	}
	while (stars.length < stars_count) {
		spawn_star()
	}
	for (const star of stars) {
		star.tick(delta)
		star.draw(ctx)
		if (star.position[1] > display_height) {
			stars.splice(stars.indexOf(star), 1)
		}
	}
}

function init_stars() {
	console.log("Init stars")
	while (stars.length < stars_count) {
		spawn_star()
	}
	let d = 0;
	while (d < 5000) {
		while (stars.length < stars_count) {
			spawn_star()
		}
		for (const star of stars) {
			star.tick(100)
			if (star.position[1] > display_height) {
				stars.splice(stars.indexOf(star), 1)
			}
		}
		d += 100
	}
}

function spawn_star() {
	let star = new Star();
	stars.push(star);
}
class Star {
	last_position: [number, number];
	position: [number, number];
	vel: [number, number];
	brightness: number;
	constructor() {
		this.position = [rand(0, display_width), 0]
		this.last_position = this.position
		this.vel = [rand(-1, 1), rand(40, 300)]
		this.brightness = rand(0.2, 1)
	}

	tick(delta: number) {
		this.position[0] += this.vel[0] * (delta / 1000) * speed_fac
		this.position[1] += this.vel[1] * (delta / 1000) * speed_fac
		this.last_position = ([] as number[]).concat(this.position) as [number, number];
		this.last_position[0] -= this.vel[0] * (1 / 60) * speed_fac
		this.last_position[1] -= this.vel[1] * (1 / 60) * speed_fac
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.strokeStyle = "white"
		ctx.globalAlpha = this.brightness;
		ctx.moveTo(this.last_position[0], this.last_position[1])
		ctx.lineTo(this.position[0], this.position[1])
		ctx.stroke();
		ctx.globalAlpha = 1.0;
	}
}

function rand(min: number, max: number) {
	return Math.random() * (max - min) + min;
}