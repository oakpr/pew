export const max_players = 2;

export let players: (Player | null)[] = [];

let keys_pressed_map = {};
document.addEventListener("keydown", e => {
	keys_pressed_map[e.key.toLocaleLowerCase()] = true
})
document.addEventListener("keyup", e => {
	keys_pressed_map[e.key.toLocaleLowerCase()] = false
})

export class Player {
	controller_id: number;
	movement: [number, number];
	buttons: boolean[];
	associated_entity: number;
	disconnected: boolean;

	constructor(controller: Gamepad | null) {
		if (controller) {
			this.controller_id = controller.index;
			// https://w3c.github.io/gamepad/#remapping
			this.movement = [controller.axes[0], controller.axes[1]];
			this.buttons = [controller.buttons[1].pressed, controller.buttons[0].pressed]
			this.associated_entity = 0; // When the player is implemented, add this
			this.disconnected = false;
		} else {
			this.controller_id = -1;
			this.movement = [0, 0];
			this.buttons = [keys_pressed_map['z'], keys_pressed_map['x']]
			this.associated_entity = 0;
			this.disconnected = false;
		}
	}

	tick() {
		if (this.controller_id >= 0) {
			// Find the controller, or die if it doesn't exist
			let controller: Gamepad;
			for (const c of navigator.getGamepads()) {
				if (c === null) {
					// chrome returns null sometimes i heard
					continue
				}
				if (c.index == this.controller_id) {
					controller = c
					break
				}
			}
			if (!controller) {
				this.disconnected = true
				return
			}

			// write inputs
			this.movement = [controller.axes[0], controller.axes[1]];
			this.buttons = [controller.buttons[1].pressed, controller.buttons[0].pressed]

			// if 'select' or the equivalent button is pressed, die
			if (this.buttons[8]) {
				this.disconnected = true
			}
		} else {
			this.movement = [0, 0]
			this.movement[0] -= 1 * (keys_pressed_map["arrowleft"] as number)
			this.movement[0] += 1 * (keys_pressed_map["arrowright"] as number)
			this.movement[1] -= 1 * (keys_pressed_map["arrowup"] as number)
			this.movement[1] += 1 * (keys_pressed_map["arrowdown"] as number)
			this.buttons = [keys_pressed_map['z'] || false, keys_pressed_map['x'] || false]

			if (keys_pressed_map['escape']) {
				this.disconnected = true;
			}
		}
	}
}

export function tick_player_input() {
	// Look for new controllers
	let existing_players: number[] = players.filter(v => !!v).map(v => v.controller_id);
	let new_controllers = navigator.getGamepads().filter(v => existing_players.indexOf(v.index) == -1).filter(v => v.buttons.filter(v => v).length > 0).map(v => new Player(v));
	if (existing_players.indexOf(-1) == -1) {
		let keyboard_active: boolean
		for (const key of ["z", "x", "arrowup", "arrowdown", "arrowleft", "arrowright"]) {
			keyboard_active = keyboard_active || keys_pressed_map[key]
		}
		if (keyboard_active) {
			new_controllers.push(new Player(null))
		}
	}
	for (const player of new_controllers) {
		let empty_slot = players.indexOf(null)
		if (empty_slot != -1) {
			players[empty_slot] = player
		} else if (players.length < max_players) {
			players.push(player)
		} else {
			console.log("can't add new player");
			continue;
		}
		console.log(players)
	}

	for (const player of players) {
		if (!player) {
			continue
		}
		// Tick players
		player.tick()
		// Remove a player if they are disconnecting
		if (player.disconnected) {
			console.log(`dropped player ${player}`)
			players[players.indexOf(player)] = null
			continue
		}
	}
}