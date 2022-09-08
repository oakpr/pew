// If the browser doesn't support gamepads, there's no point in showing co-op options.
export const co_op_supported = !!navigator.getGamepads();
export const viewport: CanvasRenderingContext2D = (document.querySelector("canvas#viewport") as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;
export const display_width = 480;
export const display_height = 640;

let last_frame = Date.now()

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
	viewport.strokeStyle = "white";
	viewport.lineWidth = 1;
	viewport.strokeText("FPS: " + (1000 / delta).toFixed(1), 10, 15)
	// Draw stars
	draw_stars(delta, viewport)
}