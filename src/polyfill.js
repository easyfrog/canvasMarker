/**
 * draw round Rectangle
 */
if (!CanvasRenderingContext2D.prototype.roundRect) {
	CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
	     this.beginPath();
	     this.moveTo(x+r, y);
	     this.arcTo(x+w, y, x+w, y+h, r);
	     this.arcTo(x+w, y+h, x, y+h, r);
	     this.arcTo(x, y+h, x, y, r);
	     this.arcTo(x, y, x+w, y, r);
	     this.closePath();
	     return this;
	 }
}

/**
 * clone json
 */
if (!JSON.clone) {
	JSON.clone = function (json) {
		return JSON.parse(JSON.stringify(json));
	}
}