# canvasMarker
Base html5 canvas to draw markers by JSON configure

```
style: {
  		width: 256, 
  		height: 128,
  		color: 0x444444,				(default color)
  		fontColor: 0x000000,			(default font color)
  		font: "32px Arial", 			(default font format)
  		background: {
  			color: 0xffffff,
  			alpha: 0
  		},
  		elements: [
  			{
  				type: 'image' | 'text',
  				name:
  				url:, 					(image only)
  				color:,					(text only if no only stroke)
  				strokeColor:, 			(text only if no only fill)
  				strokeAlpha:, 			(text only if no only fill)
  				text:, 					(text only)
  				font:, 					(css font format: "italic small-caps bold 12px arial")
  				lineWidth: 3, 			(text only)
  				width:, 				(<= 1 : percent, > 1 : value)
  				height:, 				...
  				x:, 					...
  				y:, 					...
  				shadow: {
  					offsetX:,
  					offsetY:,
  					color:,
  					alpha:,
  					blur:,
  				}
  			},
  			{
  				type: 'shape',			// shape
  				name:,
  				points: [
  					{
  						x:, y:
  					}
  				],
  				color:,
  				strokeColor:,
  				strokeAlpha:,
  				lineWidth:,
  				shadow:
  			},
  			{
  				type: 'roundRect',		// rect width round corner
  				name:,
  				points: [{
  					x:, y:
  				}],
  				radius:,
  				color:,
  				strokeColor:,
  				strokeAlpha:,
  				lineWidth:,
  				shadow:
  			},
  			{
  				type: 'rect',			// rectangle
  				name:,
  				point: {x:, y:},
  				width:,
  				height,
  				color:,
  				strokeColor:,
  				strokeAlpha:,
  				lineWidth:,
  				shadow:
  			},
  			{
  				type: 'circle',			// circle
  				name:,
  				point: {x:, y:},
  				radius:,
  				color:,
  				strokeColor:,
  				strokeAlpha:,
  				lineWidth:,
  				shadow:
  			}
  		]
  }
```

# How to use
look test.html
