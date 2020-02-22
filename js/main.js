// Is this the first keypress to close the Start Menu?
let firstKey = true;

// TODO: does world canvas need to be that big?
let canvas = document.getElementById('world');
canvas.width = innerWidth;
canvas.height = innerHeight;

let ctx = canvas.getContext('2d');

let animateId;

let room;
let player;

/**
 * Sounds
 */
/*let jumpSound = new Audio("sounds/jump.wav");
let hitSound = new Audio("sounds/hitBee.wav");
let buySound = new Audio("sounds/buy.wav");
let music = new Audio("sounds/music.mp3");
music.volume = 0.4;*/



function update(){
    room.update();
    player.update(room.height);
    /*for(let i = 0; i < beeArray.length; i++){
        beeArray[i].update();
        //check to see if the player hit it
        if(rectCollision(player, beeArray[i]) && !player.launching){
            player.land();
            hitSound.play();
        }
    }*/
}

function draw(){
    room.draw(ctx,canvas,player);
    player.draw(ctx,room.height);
    /*for(let i = 0; i < beeArray.length; i++){
        beeArray[i].draw(ctx);
    }*/

    // if the player is in flight (jumped or gliding), have gravity affect them
    /*if (!player.launching){
        player.slowDown(room.gravity);
    }*/
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    draw();
    animateId = requestAnimationFrame(animate);
}

function init(){
    room = new Room(worldObjects.x, worldObjects.y, worldObjects.width, worldObjects.height);
    player = new Player(100,room.height-100,10,20);

    //create random locations for bees
    /*for(let i = 0; i < 50; i++){
        let x = randomIntFromInterval(player.x*2, room.width);// the starting pos is just a guess
        let y = randomIntFromInterval(0, room.height-200);//lowers the chance of hitting a bee

        beeArray.push(new Bee(x,y));

    }*/
    animate();
};

function startGame(){
    let startScreen = document.getElementById("start_screen");
    startScreen.style.display = "none";
    canvas.style.display = "block";
    init();
    //music.play();
};

function rectCollision(rect1, rect2){
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y) {
         // collision detected!
         return true;
    }else{
        return false;
    }
}

document.addEventListener('keydown', function(e){
    if(firstKey){
        firstKey = false;
        startGame();
    // was }else if(player.launching && !shop.open){
    }else if(player.launching){
        player.launch();
        //jumpSound.play();
    // was }else if(!player.gliding && !shop.open){
    }else if(!player.gliding){
        player.glide();
    }
});

document.addEventListener('keyup', function(e){

});

canvas.addEventListener('touchstart', function(e){
    if(firstKey){
        firstKey = false;
        startGame();
    // was }else if(player.launching && !shop.open){
    }else if(player.launching){
        player.launch();
        //jumpSound.play();
    // was }else if(!player.gliding && !shop.open){
    }else if(!player.gliding){
        player.glide();
    }
});

document.addEventListener('mousedown', function(){
    if(firstKey){
        firstKey = false;
        startGame();
    // was }else if(player.launching && !shop.open){
    }else if(player.launching){
        player.launch();
        //jumpSound.play();
    // was }else if(!player.gliding && !shop.open){
    }else if(!player.gliding){
        player.glide();
    }
})
