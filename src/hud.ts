import { display_height, display_width } from "./index";

const hud_margin = 16;
const hud_lines = 4;
const font_height = 16;
const font_margin = 2;
export function draw_hud(delta: number, ctx: CanvasRenderingContext2D) {
	// Calculate the height of the hud
	const height = (hud_margin * 2) + ((font_height + font_margin) * hud_lines)

	ctx.fillStyle = "black"
	ctx.lineWidth = 2
	ctx.fillRect(0, display_height - height, display_width, height)
	ctx.beginPath()
	ctx.moveTo(0, display_height - height)
	ctx.lineTo(display_width, display_height - height)
	ctx.stroke()

	let p1_cursor = [hud_margin, (display_height - height) + hud_margin, 0]
	let p2_cursor = [(display_width / 2) + (hud_margin / 2), (display_height - height) + hud_margin, 1]
	for (const cursor of [p1_cursor, p2_cursor]) {
		ctx.textBaseline = "top"
		ctx.lineWidth = 1
		ctx.font = `${font_height}px "Major Mono Display"`
		ctx.strokeStyle = "white"
		// Only do this if the player is here, otherwise say 'not here'.
		ctx.strokeText("player " + (cursor[2] + 1).toString(), cursor[0], cursor[1])
		cursor[1] += font_height + font_margin
		ctx.strokeText("armr [===========]", cursor[0], cursor[1]);
		cursor[1] += font_height + font_margin
		ctx.strokeText("bomb [===========]", cursor[0], cursor[1]);
		cursor[1] += font_height + font_margin
		ctx.strokeText("shld [===========]", cursor[0], cursor[1]);
	}
}