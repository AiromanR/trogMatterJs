var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;
    Mouse = Matter.Mouse,              
    MouseConstraint = Matter.MouseConstraint; 

var engine = Engine.create();

var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 700,
        wireframes: false,
        background: '#8c4743'
    }
});


var boxA = Bodies.rectangle(400, 200, 80, 80, {   
    render: {
        sprite: {
            texture: 'https://i.postimg.cc/L8FtP649/ai.png',
            xScale: 80 / 198,
            yScale: 80 / 188,
        }, 
        fillStyle: null,
    },
    restitution: 1.2
});
var img = Bodies.circle(400, 200, 40, {   
    render: {
        sprite: {
            texture: 'https://media.discordapp.net/attachments/977534405092470805/1280173507149303859/orig.png?ex=6816d1bc&is=6815803c&hm=75672d1101abf060f959f93df14a84c2bb6530115efda16b5c260d0718b2c19a&=&format=webp&quality=lossless&width=960&height=960',
            xScale: 80 / 960,
            yScale: 80 / 960,

        }, 
    },
    restitution: 0.8
});
var boxB = Bodies.circle(400, 200, 40, {   
    render: {
        sprite: {
            texture: 'https://media.discordapp.net/attachments/977534405092470805/1368190960261140510/output-onlinepngtools.png?ex=681752a0&is=68160120&hm=3370e769290fca0362bcbc8ec094049f40276dbc03b9de7c73d0b169c65b5913&=&format=webp&quality=lossless&width=960&height=960',
            xScale: 80 / 960,
            yScale: 80 / 960,
        }, 
    },
    restitution: 1.2
});
var boxC = Bodies.circle(400, 200, 40, { restitution: 1.3});
var boxD = Bodies.circle(450, 50, 40, { restitution: 1.3, render: { fillStyle: '#7fffd4' } });
var boxE = Bodies.circle(400, 200, 40, { restitution: 1.2});
var boxF = Bodies.circle (450, 50, 40, { restitution: 1.2});
var box5 = Bodies.circle(400, 200, 40, { restitution: 1.2});
var box6 = Bodies.circle (450, 50, 40, { restitution: 1.2});
var box7 = Bodies.circle (450, 50, 40, { restitution: 1.2});
var groundA = Bodies.rectangle(400, 710, 810, 60, { isStatic: true }, { restitution: 10 });
var groundB = Bodies.rectangle(0, 400, 40, 1000, { isStatic: true });
var groundC = Bodies.rectangle(800, 400, 40, 1000, { isStatic: true });
var groundD = Bodies.rectangle(400, -400, 110, 60, { isStatic: true },);

Composite.add(engine.world, [img, boxA, boxB,boxC, boxD,boxE, boxF, groundA, groundB,groundC,groundD,box5,box6,box7]);

const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});

Composite.add(engine.world, mouseConstraint);

render.mouse = mouse;


Render.run(render);


var runner = Runner.create();


Runner.run(runner, engine);