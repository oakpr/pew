var entity_counter = 0;

export class Entity {
	position: [number, number];
	// The collision radius of the entity.
	// Two entities will collide when the distance between them is less than the sum of their radii.
	radius: number;
	id: number;
	dead: boolean;
	health: number;

	constructor() {
		this.position = [0, 0];
		this.radius = 30;
		this.id = entity_counter++;
		this.dead = false;
		this.health = 100.0;
	}

	// Ticks the entity's state.
	// Runs only when the game is running.
	tick(delta: number) {
		return
	}

	// Draws "background" elements for the entity, like a glow
	// Runs first
	draw_bg(ctx: CanvasRenderingContext2D) {
		return
	}

	// Draws the main body of the entity.
	// Runs second
	draw(ctx: CanvasRenderingContext2D) {
		return
	}

	// Draws "effects" for the entity, like a screen blur effect.
	// Runs third
	draw_fx(ctx: CanvasRenderingContext2D) {
		return
	}
}