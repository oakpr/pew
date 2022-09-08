// If the browser doesn't support gamepads, there's no point in showing co-op options.
export const co_op_supported = !!navigator.getGamepads();
export const viewport: CanvasRenderingContext2D = (document.querySelector("canvas#viewport") as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;
export const display_width = 480;
export const display_height = 640;

export let entities: Entity[] = [];
export let speed_fac: number = 1.0;
export let paused: boolean = false;

let last_frame = Date.now()

import type { Entity } from './entity.js';
import { draw_hud } from './hud.js';
import { draw_stars } from './stars.js'

// The main game loop
while (true) {
	// Wait for a frame to draw
	await new Promise(r => window.requestAnimationFrame(r));
	// Get delta time
	const now = Date.now()
	const delta = now - last_frame;
	last_frame = now;
	// Clear viewport
	viewport.fillStyle = "black";
	viewport.fillRect(0, 0, 480, 640);
	// Report frame rate
	viewport.textBaseline = "top"
	viewport.font = '16px "Major Mono Display"'
	viewport.strokeStyle = "white";
	viewport.fillStyle = "white";
	viewport.lineWidth = 1;
	viewport.strokeText("fps: " + (1000 / delta).toFixed(1), 10, 10)
	// Draw stars
	draw_stars(delta * speed_fac, viewport)
	if (!paused) {
		// Tick all entities
		for (const entity of entities) {
			entity.tick(delta * speed_fac)
			if (entity.dead) {
				entities.splice(entities.indexOf(entity), 1)
			}
		}
	}
	// Draw HUD
	draw_hud(delta, viewport)
	// Draw all entities' background graphics
	for (const entity of entities) {
		entity.draw_bg(viewport)
	}
	// Draw all entities' main graphics
	for (const entity of entities) {
		entity.draw(viewport)
	}
	// Draw all entities' effectx
	for (const entity of entities) {
		entity.draw_fx(viewport)
	}
}