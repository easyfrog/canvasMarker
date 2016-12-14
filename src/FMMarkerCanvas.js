/**
 * FMMarkerCanvas class
 *
 * style: {
 * 		width: 256, 
 * 		height: 128,
 * 		color: 0x444444,				(default color)
 * 		fontColor: 0x000000,			(default font color)
 * 		font: "32px Arial", 			(default font format)
 * 		background: {
 * 			color: 0xffffff,
 * 			alpha: 0
 * 		},
 * 		elements: [
 * 			{
 * 				type: 'image' | 'text',
 * 				name:
 * 				url:, 					(image only)
 * 				color:,					(text only if no only stroke)
 * 				strokeColor:, 			(text only if no only fill)
 * 				strokeAlpha:, 			(text only if no only fill)
 * 				text:, 					(text only)
 * 				font:, 					(css font format: "italic small-caps bold 12px arial")
 * 				lineWidth: 3, 			(text only)
 * 				width:, 				(<= 1 : percent, > 1 : value)
 * 				height:, 				...
 * 				x:, 					...
 * 				y:, 					...
 * 				shadow: {
 * 					offsetX:,
 * 					offsetY:,
 * 					color:,
 * 					alpha:,
 * 					blur:,
 * 				}
 * 			},
 * 			{
 * 				type: 'shape',			// shape
 * 				name:,
 * 				points: [
 * 					{
 * 						x:, y:
 * 					}
 * 				],
 * 				color:,
 * 				strokeColor:,
 * 				strokeAlpha:,
 * 				lineWidth:,
 * 				shadow:
 * 			},
 * 			{
 * 				type: 'roundRect',		// rect width round corner
 * 				name:,
 * 				points: [{
 * 					x:, y:
 * 				}],
 * 				radius:,
 * 				color:,
 * 				strokeColor:,
 * 				strokeAlpha:,
 * 				lineWidth:,
 * 				shadow:
 * 			},
 * 			{
 * 				type: 'rect',			// rectangle
 * 				name:,
 * 				point: {x:, y:},
 * 				width:,
 * 				height,
 * 				color:,
 * 				strokeColor:,
 * 				strokeAlpha:,
 * 				lineWidth:,
 * 				shadow:
 * 			},
 * 			{
 * 				type: 'circle',			// circle
 * 				name:,
 * 				point: {x:, y:},
 * 				radius:,
 * 				color:,
 * 				strokeColor:,
 * 				strokeAlpha:,
 * 				lineWidth:,
 * 				shadow:
 * 			}
 * 		]
 * }
 */
function FMMarkerCanvas(params) {
	var s = this;

	s.style = {};

	Object.assign(s.style, {
		width: 256,
		height: 128,
		color: 0x444444,
		fontColor: 0x000000,
		font: '24px 微软雅黑',
		elements: [],
		background: {
			color: 0xffffff,
			alpha: 0
		}
	}, params);

	s.ctx = document.createElement('canvas').getContext('2d');

	// drawing state
	s.isDrawing = false;

	s._elements = [];

	s.ctx.canvas.width = s.style.width;
	s.ctx.canvas.height = s.style.height;
}

FMMarkerCanvas.prototype =  {
	constructor: FMMarkerCanvas,

	toRgba: function (color, alpha) {
		var r, g, b;
		alpha = alpha == undefined ? 1 : alpha;

		// 0x value to length 6
		function colorLen(str) {
			if (str.length < 6) {
				var cnt = 6 - str.length;
				for (var i = 0; i < cnt; i++) {
					str = '0' + str;
				}
			}
			return str;
		}

		if (typeof color == 'number') {
			color = color.toString(16);
			color = colorLen(color);
		} else if (typeof color == 'string') {
			color = color.slice(1);
		}

		if (color.length != 6) {
			throw 'wrong color length: color 0xffffff, or #ffffff length = 6';
		}

		function toInt(str , s, e) {
			return parseInt('0x' + str.slice(s, e));
		}

		r = toInt(color, 0, 2);
		g = toInt(color, 2, 4);
		b = toInt(color, 4, 6);

		return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
	},

	setStyle: function (params) {
		var s = this;

		if (!params) {return;}

		// set background
		if (params.background) {
			Object.assign(s.style.background, params.background);
		}

		// get element setting by name
		function getElementSetting(name) {
			for (var i = 0; i < s.style.elements.length; i++) {
				if (s.style.elements[i].name == name) {
					return s.style.elements[i];
				}
			}
		}

		// set elements
		if (params.elements) {
			params.elements.forEach(function (itm) {
				if (itm.name) {
					var setting = getElementSetting(itm.name);
					Object.assign(setting, itm);
				}
			});
		}
	},

	readElementSytle: function (data) {
		var s = this;

		if (data.color != undefined) {
			s.ctx.fillStyle = s.toRgba(data.color, data.alpha);
		}

		if (data.strokeColor != undefined) {
			s.ctx.strokeStyle = s.toRgba(data.strokeColor, data.strokeAlpha);
		}

		if (data.lineWidth) {
			s.ctx.lineWidth = data.lineWidth;
		}

		if (data.textBaseline) {
			s.ctx.textBaseline = data.textBaseline;
		} else {
			s.ctx.textBaseline = 'top';
		}

		if (data.shadow) {
			if (data.shadow.offsetX != undefined) {
				s.ctx.shadowOffsetX = data.shadow.offsetX;
			}
			if (data.shadow.offsetY != undefined) {
				s.ctx.shadowOffsetY = data.shadow.offsetY;
			}
			if (data.shadow.blur != undefined) {
				s.ctx.shadowBlur = data.shadow.blur;
			}
			if (data.shadow.color != undefined) {
				s.ctx.shadowColor = s.toRgba(data.shadow.color, data.shadow.alpha);
			}
		} else {
			s.ctx.shadowBlur = 0;
			s.ctx.shadowOffsetX = 0;
			s.ctx.shadowOffsetY = 0;
		}
	},

	getValue: function (data, prop, isWidth) {
		var value = data[prop];
		var offset = {x: 0, y: 0};
		if (data.groups && (prop == 'x' || prop == 'y')) {
			var offset = data.groups.reduce(function(p, n) {
				return {
					x: p.x + n.x,
					y: p.y + n.y
				};
			}, offset);
		}
		if (value <= 1 && value >= 0) {  	// 0 ~ 1
			return isWidth ? this.style.width * value + offset.x : this.style.height * value + offset.y;
		} else if (value < 0) {				// < 0
			return isWidth ? this.style.width + value + offset.x: this.style.height + value + offset.y;
		} else {
			return isWidth ? value + offset.x : value + offset.y;
		}
	},

	getStyleByName: function (name) {
		var res = null;
		(function _get(obj) {
			if (obj.elements && !res) {
				for (var i = 0; i < obj.elements.length; i++) {
					var itm = obj.elements[i];
					if (itm.name == name) {
						res = itm;
					}
					_get(itm);
				}
			}
		})(this.style);

		return res;
	},

	drawBackground: function () {
		this.ctx.fillStyle = this.toRgba(this.style.background.color, this.style.background.alpha);
		this.ctx.fillRect(0, 0, this.style.width, this.style.height);
	},
	
	drawRoundRect: function (data, isRound) {
		var s = this;
		s.readElementSytle(data);

		if (!data.width || !data.height) {return;}

		var x = s.getValue(data, 'x', true);
		var y = s.getValue(data, 'y');
		var w = s.getValue(data, 'width', true);
		var h = s.getValue(data, 'height');

		s.ctx.beginPath();
		if (isRound) {
			s.ctx.roundRect(x, y, w, h, (data.radius || 5));
		} else {
			s.ctx.rect(x, y, w, h);
		}
		s.ctx.closePath();

		if (data.lineWidth != undefined && data.strokeColor != undefined) {
			s.ctx.stroke();
		}

		if (data.color != undefined) {
			s.ctx.fill();
		}
		s.next();
	},

	drawCircle: function (data) {
		var s = this;
		if (data.radius == undefined || data.point == undefined) {return;}
		
		s.readElementSytle(data);

		var x = s.getValue(data.point, 'x', true);
		var y = s.getValue(data.point, 'y');

		s.ctx.beginPath();
		s.ctx.arc(x, y, data.radius, 0, Math.PI * 2, true);
		s.ctx.closePath();

		if (data.lineWidth != undefined && data.strokeColor != undefined) {
			s.ctx.stroke();
		}

		if (data.color != undefined) {
			s.ctx.fill();
		}
		s.next();
	},

	drawShape: function (data) {
		var s = this;
		if (data.points == undefined && data.points.length < 3) {return;}
		
		s.readElementSytle(data);

		s.ctx.beginPath();
		for (var i = 0; i < data.points.length; i++) {
			var x = s.getValue(data.points[i], 'x', true);
			var y = s.getValue(data.points[i], 'y');

			if (i == 0) {
				s.ctx.moveTo(x, y);
			} else {
				s.ctx.lineTo(x, y);
			}
		}
		s.ctx.closePath();

		if (data.lineWidth != undefined && data.strokeColor != undefined) {
			s.ctx.stroke();
		}

		if (data.color != undefined) {
			s.ctx.fill();
		}

		s.next();
	},

	drawImage: function (data) {
		var s = this;
		var img = null;

		function _drawImage() {
			s.readElementSytle(data);

			var x = s.getValue(data, 'x', true);
			var y = s.getValue(data, 'y');

			if (data.width && data.height) {
				var w = s.getValue(data, 'width', true);
				var h = s.getValue(data, 'height');

				s.ctx.drawImage(data.image, x, y, w, h);
			} else {
				s.ctx.drawImage(data.image, x, y);
			}
		}

		if (!data.image) {
			img = new Image();
			img.src = data.url;
			img.onload = function () {
				data.image = img;
				_drawImage(img);
				s.next();
			}
		} else {
			_drawImage(data.img);
			s.next();
		}
	},

	drawText: function (data) {
		var s = this;
		var font = data.font || s.style.font;
		var sizes = font.match(/\d+/);
		var size = 24;
		if (sizes.length > 0) {
			size = parseInt(sizes[0]);
		}

		s.readElementSytle(data);

		s.ctx.font = font;

		var x = s.getValue(data, 'x', true);
		var y = s.getValue(data, 'y');

		if (data.lineWidth) {
			s.ctx.lineWidth = data.lineWidth;
			s.ctx.strokeStyle = data.strokeColor || 0xffffff;
			s.ctx.strokeText(data.text, x, y);
		}

		s.ctx.fillText(data.text, x, y);

		s.next();
	},

	drawElement: function (data) {
		// visible
		if (data.visible === false) {
			this.next();
			return;
		}

		// groups visible
		if (data.groups) {
			for (var i = 0; i < data.groups.length; i++) {
				if (data.groups[i].visible === false) {
					this.next();
					return;
				}
			}
		}

		switch (data.type) {
			case 'image':
				this.drawImage(data);
			break;
			case 'text':
				this.drawText(data);
			break;
			case 'roundRect':
				this.drawRoundRect(data, true);
			break;
			case 'rect':
				this.drawRoundRect(data, false);
			break;
			case 'circle':
				this.drawCircle(data);
			break;
			case 'shape':
				this.drawShape(data);
			break;
		}
	},

	/**
	 * 将原始的group嵌套的绘制描述,"拉平"为同一级
	 */
	normalizeStyle: function (obj, groups) {
		if (obj.elements) {
			for (var i = 0; i < obj.elements.length; i++) {
				var itm = obj.elements[i];
		
				if (itm.type == 'group') {
					var res = [];
					if (groups) {
						res = groups.slice();
						res.push(itm);
					} else {
						res = [itm];
					}
					this.normalizeStyle(obj.elements[i], res);
				} else {
					if (groups) {
						itm.groups = groups;
					}
					
					this._elements.push(itm);
				}
			}
		}
	},

	next: function () {
		var s = this;
		s.index ++;
		if (s.index < s._elements.length) {
			s.drawElement(s._elements[s.index]);
		} else {
			s.isDrawing = false;

			// 调用绘制完成后的回调函数
			if (s.callback) {
				s.callback();
			}
		}
	},

	init: function () {
		this.update(null, true);
	},

	update: function (params, needNormalize) {
		var s = this;

		if (s.isDrawing) {return;}

		if (needNormalize) {
			s._elements = [];
			s.normalizeStyle(s.style);
		}

		s.isDrawing = true;
		s.index = -1;

		// update style
		s.setStyle(params);

		// width & height
		var w = s.style.width;
		var h = s.style.height;

		if (w != s.ctx.canvas.width) {
			s.ctx.canvas.width = w;
		}

		if (h != s.ctx.canvas.height) {
			s.ctx.canvas.height = h;
		}

		// clear first
		s.ctx.clearRect(0, 0, w, h);

		// background
		s.drawBackground(params);

		// elements
		s.next();
	}
};