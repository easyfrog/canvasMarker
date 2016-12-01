# canvasMarker
Base html5 canvas to draw markers by JSON configure

``` javascript
var imageData = {
    width: 100,
    height: 150,
    background: {
        color: 0x00fff0,
        alpha: .3
    }, 
    elements: [{
            type: 'roundRect',
            name: 'rr',
            color: 0x0,
            alpha: .3,
            strokeColor: 0xffffff,
            lineWidth: 3,
            x: 5,
            y: 5,
            radius: 10,
            width: -10,
            height: -10
        },
        {
            type: 'image',
            name: 'icon2',
            url: './resources/start.png',
            x: 10,
            y: 30,
            width: 64,
            height: 64,
        },
        {
            type: 'group',
            name: 'group1',
            x: 10,
            y: 20,
            elements: [
                {
                    type: 'text',
                    name: 'text',
                    text: 'canvas Marker',
                    font: '24px Arial',
                    color: 0xff0000,
                    strokeColor: 0xfffff0,
                    lineWidth: 3,
                    x: 80,
                    y: 0
                },
                {
                    type: 'group',
                    name: 'group2',
                    x: -40,
                    y: 20,
                    elements: [
                        {
                            type: 'text',
                            name: 'text2',
                            text: 'Create by easyfrog',
                            font: '44px Arial',
                            color: 0x0,
                            strokeColor: 0xffffff,
                            lineWidth: 3,
                            x: 80,
                            y: 29
                        }
                    ]
                }
            ]
        },
        {
            type: 'shape',
            name: 'sha',
            color: 0xf0fff0,
            alpha: .9,
            strokeColor: 0x005500,
            lineWidth: 2,
            points: [{
                x: -15,
                y: -15
            },{
                x: .5,
                y: .5
            },{
                x: -15,
                y: 20
            }]
        },
        {
            type: 'circle',
            name: 'cir',
            color: 0x00ff00,
            alpha: .9,
            strokeColor: 0xffff00,
            lineWidth: 2,
            point: {
                x: .5,
                y: .5
            },
            radius: 20
        },
    ]
};

// 创建Marker
var marker = new Marker( imageData );

// 绘制完成后, 加入网页中.
marker.callback = function () {
    // clear the callback
    marker.callback = null;

    // add to document
    document.body.appendChild(marker.ctx.canvas);
}

marker.init();

```

# How to use
Look test.html
