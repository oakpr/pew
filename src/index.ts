// If the browser doesn't support gamepads, there's no point in showing co-op options.
export const co_op_supported = !!navigator.getGamepads();
export const ctx: CanvasRenderingContext2D = (document.querySelector("canvas#viewport") as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;
export const display_width = 480;
export const display_height = 640;

export let entities: Entity[] = [];
export let speed_fac: number = 1.0;
export let paused: boolean = false;

let last_frame = Date.now()

import type { Entity } from './entity.js';
import { reset } from './gfx.js';
import { draw_hud } from './hud.js';
import { tick_player_input } from './player_input.js';
import { draw_stars } from './stars.js'

// The main game loop
while (true) {
	reset(ctx)
	// Wait for a frame to draw
	await new Promise(r => window.requestAnimationFrame(r));
	// Get delta time
	const now = Date.now()
	const delta = now - last_frame;
	last_frame = now;
	// Clear viewport
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, 480, 640);
	// Report frame rate
	ctx.textBaseline = "top"
	ctx.font = '16px "Major Mono Display"'
	ctx.strokeStyle = "white";
	ctx.fillStyle = "white";
	ctx.lineWidth = 1;
	ctx.strokeText("fps: " + (1000 / delta).toFixed(1), 10, 10)
	// Draw stars
	draw_stars(delta * speed_fac, ctx)
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
	draw_hud(delta, ctx)
	// Draw all entities' background graphics
	for (const entity of entities) {
		entity.draw_bg(ctx)
	}
	// Draw all entities' main graphics
	for (const entity of entities) {
		entity.draw(ctx)
	}
	// Draw all entities' effectx
	for (const entity of entities) {
		entity.draw_fx(ctx)
	}
	// Run controllers
	tick_player_input()
}