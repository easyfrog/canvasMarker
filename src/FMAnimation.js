/////////////////////
// FMAnimation class //
/////////////////////
function FMAnimation(work, frameRate) {
	this.work = work;
	this.frameRate = frameRate || 30;
	this._stop = false;
	this._cnt = 0;
	this._lastTime = null;
}

FMAnimation.prototype = {
	constructor: FMAnimation,

	get frameRate() {
		return this._frameRate;
	},

	set frameRate(value) {
		value = Math.max(Math.min(60, value), 1);
		this._frameRate = value;
		this._renderStep = 60 / value;
	},
	
	play: function (params) {
		this._stop = false;
		this._frame();
	},
	stop: function () {
		this._stop = true;
	},
	_frame: function () {
		this._cnt += 1;

		if (!this._lastTime) {
			this._lastTime = Date.now();
		}

		if (this._cnt >= this._renderStep) {
			this._cnt = 0;

			var time = Date.now();
			var delta = time - this._lastTime;
			this._lastTime = time;

			if (this.work) {
				this.work(delta / 1000);
			}
		}

		if (!this._stop) {
			requestAnimationFrame(this._frame.bind(this));
		}
	}
};	