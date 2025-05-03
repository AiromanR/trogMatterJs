var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Mouse = Matter.Mouse,  
    Body = Matter.Body,
    Events = Matter.Events,            
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
var img = Bodies.rectangle(400, 200, 80, 80, {   
    render: {
        sprite: {
            texture: 'https://media.discordapp.net/attachments/977534405092470805/1280173507149303859/orig.png?ex=6816d1bc&is=6815803c&hm=75672d1101abf060f959f93df14a84c2bb6530115efda16b5c260d0718b2c19a&=&format=webp&quality=lossless&width=960&height=960',
            xScale: 80 / 960,
            yScale: 80 / 960,

        }, 
    },
    restitution: 1
});
var boxB = Bodies.circle(400, 200,30, {   
    render: {
        sprite: {
            texture: 'https://media.discordapp.net/attachments/977534405092470805/1368274719652188271/output-onlinepngtools_2.png?ex=6817a0a2&is=68164f22&hm=5568cd45123d6e94c83fb52c00b2a3af95c7706e1e6cedc0caa9059d8de6ed23&=&format=webp&quality=lossless&width=931&height=931',
            xScale: 80 / 931,
            yScale: 80 / 931,
        }, 
    },
    restitution: 1.2
});
var boxC = Bodies.circle(400, 200, 40, {
    restitution: 1.3,
    render: {
        sprite: {
            texture: 'https://media.discordapp.net/attachments/977534405092470805/1368190960261140510/output-onlinepngtools.png?ex=681752a0&is=68160120&hm=3370e769290fca0362bcbc8ec094049f40276dbc03b9de7c73d0b169c65b5913&=&format=webp&quality=lossless&width=960&height=960',
            xScale: 80 / 960,
            yScale: 80 / 960,
        }, 
    }
});
var boxD = Bodies.circle(420, 290, 40, {
    restitution: 1.3,
    render: {
        sprite: {
            texture: 'https://media.discordapp.net/attachments/977534405092470805/1368274732071518420/output-onlinepngtools_3.png?ex=6817a0a5&is=68164f25&hm=31f3ef4bb649e052b0b259fc7f2374b069b07cfbc00a258ab1acdab7a1315517&=&format=webp&quality=lossless&width=931&height=931',
            xScale: 100 / 931,
            yScale: 100 / 931,
        }, 
    }
});
var boxE = Bodies.circle(440, 270, 80, {
    restitution: 1.1,
    render: {
        sprite: {
            texture: 'https://media.discordapp.net/attachments/977534405092470805/1368274741193871510/output-onlinepngtools_4.png?ex=6817a0a7&is=68164f27&hm=57f7f04e95adf5afbbd82190d48e1e125bf714224bc9fbbd46d03f99819f2193&=&format=webp&quality=lossless&width=778&height=778',
            xScale: 220 / 778,
            yScale: 220 / 778,
        }, 
    }
});
var boxF = Bodies.circle(460, 260, 40, {
    restitution: 1.3,
    render: {
        sprite: {
            texture: 'https://media.discordapp.net/attachments/977534405092470805/1368277723465781320/output-onlinepngtools_5.png?ex=6817a36e&is=681651ee&hm=ba32dca4b98b9ca7f2fdb1f19ca77187c22d186c64fc9959ff42fae7c8ace28f&=&format=webp&quality=lossless&width=252&height=252',
            xScale: 100 / 252,
            yScale: 100 / 252,
        }, 
    }
});
var box5 = Bodies.rectangle(400, 240, 100, 100, {
    render: {
        sprite: {
            texture: 'https://media.discordapp.net/attachments/977534405092470805/1368278340494164089/586fd1fabf3a1957.png?ex=6817a401&is=68165281&hm=29531c0e885ec3a007962192a711ab17265dde136e95f0739612384c69dca412&=&format=webp&quality=lossless&width=520&height=428',
            xScale: 135 / 520,
            yScale: 135 / 428,
        }, 
    },
    restitution: 1.3
});
var box6 = Bodies.rectangle(400, 220, 40, 40, {
    restitution: 1.3,
    render: {
        sprite: {
            texture: 'https://media.discordapp.net/attachments/977534405092470805/1368279669941735586/output-onlinegiftools.gif?ex=6817a53e&is=681653be&hm=d52d504450725e323a5c9036ded5fcf1f26bc947de632524d1015ce54ca3a677&=&width=70&height=70',
            xScale: 40 / 65,
            yScale: 40 / 65,
        }, 
    }
});

var groundA = Bodies.rectangle(400, 1010, 810, 660, { isStatic: true }); //пол
var groundD = Bodies.rectangle(400, -800, 1100, 660, { isStatic: true }); //потолок


var groundB = Bodies.rectangle(-200, 40, 440, 1500, { isStatic: true });
var groundC = Bodies.rectangle(1000, 40, 440, 1500, { isStatic: true });

Composite.add(engine.world, [img, boxA, boxB,boxC, boxD,boxE, boxF, groundA, groundB,groundC,groundD,box5,box6]);

Events.on(engine, 'beforeUpdate', function() {
    const maxSpeed = 40;
    
    // Перебираем все тела
    Composite.allBodies(engine.world).forEach(body => {
        // Игнорируем статические тела (землю и т.д.)
        if (body.isStatic) return;
        
        const velocity = body.velocity;
        let changed = false;
        let newVelocity = { x: velocity.x, y: velocity.y };
        
        // Ограничиваем по X
        if (Math.abs(velocity.x) > maxSpeed) {
            newVelocity.x = Math.sign(velocity.x) * maxSpeed;
            changed = true;
        }
        
        // Ограничиваем по Y
        if (Math.abs(velocity.y) > maxSpeed) {
            newVelocity.y = Math.sign(velocity.y) * maxSpeed;
            changed = true;
        }
        
        // Применяем изменения если нужно
        if (changed) {
            Body.setVelocity(body, newVelocity);
        }
    });
});

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