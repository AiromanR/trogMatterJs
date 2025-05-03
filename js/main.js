const container = document.getElementById('canvas-container');
let width = container.clientWidth;
let height = container.clientHeight;

function scaleValue(value, isHeight = false) {
    const baseSize = isHeight ? 700 : 800;
    return value * (isHeight ? height / 700 : width / 800);
}

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
        width: width,
        height: height,
        wireframes: false,
        background: '#8c4743'
    }
});

function scaleValue(value) {
    if(width > height){
        return value * width / 1000;
    } 
    else if (height > width){
        return value * height /1000;
    } 
}

var boxA = Bodies.rectangle(width/2, 200, scaleValue(80), scaleValue(80), {   
    render: {
        sprite: {
            texture: 'https://i.postimg.cc/L8FtP649/ai.png',
            xScale: scaleValue(80) / 198,
            yScale: scaleValue(80) / 188,
        }, 
        fillStyle: null,
    },
    restitution: 1.15 + width / 8500
});
var img = Bodies.rectangle(width/2, 200, scaleValue(80), scaleValue(80), {   
    render: {
        sprite: {
            texture: 'https://i.postimg.cc/3JdYbPMv/image.png',
            xScale: scaleValue(80) / 960,
            yScale: scaleValue(80) / 960,

        }, 
    },
    restitution: 1.15 + width /8500
});
var boxB = Bodies.circle(width/2, 200,scaleValue(30), {   
    render: {
        sprite: {
            texture: 'https://i.postimg.cc/0N3p7gq0/image.png',
            xScale: scaleValue(80) / 931,
            yScale: scaleValue(80) / 931,
        }, 
    },
    restitution: 1.15 + width /9000
});
var boxC = Bodies.circle(width/2, 200, scaleValue(40), {
    restitution: 1.15 + width /9000,
    render: {
        sprite: {
            texture: 'https://i.postimg.cc/F9GC71kh/image.png',
            xScale: scaleValue(80) / 960,
            yScale: scaleValue(80) / 960,
        }, 
    }
});
var boxD = Bodies.circle(width/2, 290, scaleValue(40), {
    restitution: 1.15 + width /8500,
    render: {
        sprite: {
            texture: 'https://i.postimg.cc/VLRnD086/image.png',
            xScale: scaleValue(100) / 931,
            yScale: scaleValue(100) / 931,
        }, 
    }
});
var boxE = Bodies.circle(width/2, 270, scaleValue(80), {
    restitution: 1.15 + width /9000,
    render: {
        sprite: {
            texture: 'https://i.postimg.cc/FKJf5720/image.png',
            xScale: scaleValue(220)/ 778,
            yScale: scaleValue(220) / 778,
        }, 
    }
});
var boxF = Bodies.circle(width/2, 260, scaleValue(40), {
    restitution: 1.15 + width /8500,
    render: {
        sprite: {
            texture: 'https://i.postimg.cc/ZYj5Q8C1/image.png',
            xScale: scaleValue(100) / 252,
            yScale: scaleValue(100) / 252,
        }, 
    }
});
var box5 = Bodies.rectangle(width/2, 240, scaleValue(100), scaleValue(100), {
    render: {
        sprite: {
            texture: 'https://i.postimg.cc/02Qy1zSr/image.png',
            xScale: scaleValue(135) / 520,
            yScale: scaleValue(135) / 428,
        }, 
    },
    restitution: 1.15 + width /9000
});
var box6 = Bodies.rectangle(width/2, 220, scaleValue(40), scaleValue(40), {
    restitution: 1.15 + width /9000,
    render: {
        sprite: {
            texture: 'https://i.postimg.cc/ZRH41mKr/output-onlinegiftools.gif',
            xScale: scaleValue(40) / 65,
            yScale: scaleValue(40) / 65,
        }, 
    }
});

var groundA = Bodies.rectangle(width/2, height*1.47, width, height, { isStatic: true }); //пол
var groundD = Bodies.rectangle(width/2, 0-height, width, height, { isStatic: true }); //потолок


var groundB = Bodies.rectangle(0, 50, 50, height*2, { isStatic: true });
var groundC = Bodies.rectangle(width , 50, 50, height*2, { isStatic: true });

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
