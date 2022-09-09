// This file contains abstractions for rendering graphics

// Reset all of the context properties to their defaults.
export function reset(ctx: CanvasRenderingContext2D) {
	ctx.direction = "inherit"
	ctx.fillStyle = "white"
	ctx.filter = "none"
	ctx.font = '16px "Major Mono Display"'
	ctx.globalAlpha = 1.0
	ctx.globalCompositeOperation = "source-over"
	ctx.imageSmoothingEnabled = false
	ctx.imageSmoothingQuality = "medium"
	ctx.lineCap = "round"
	ctx.lineDashOffset = 0.0
	ctx.lineJoin = "miter"
	ctx.lineWidth = 1.0
	ctx.miterLimit = 10.0
	ctx.shadowBlur = 0
	ctx.shadowColor = "rgba(0,0,0,0)"
	ctx.shadowOffsetX = 0
	ctx.shadowOffsetY = 0
	ctx.strokeStyle = "white"
	ctx.textAlign = "left"
	ctx.textBaseline = "top"
	ctx.resetTransform()
	ctx.beginPath()
}