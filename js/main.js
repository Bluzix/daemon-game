// Is this the first keypress to close the Start Menu?
let firstKey = true;

// Are we still waiting for the player to load the game?
let loadingGame = true;

let world = document.getElementById('world');
/* The world will be a static height & width
world.width = innerWidth;
world.height = innerHeight;
*/

let worldCtx = world.getContext('2d');

// Initialize the viewport
let viewport = document.getElementById('viewport');
let camera = new Ratiovision(16, 9, viewport);
let animateId;

let room;
let player;

// "Save Slot" names
let savePrefix = "daemon_";
let lbSlot1 = savePrefix + "slot1";
let lbSlot2 = savePrefix + "slot2";
let lbSlot3 = savePrefix + "slot3";

// Currently loaded Save File
let currentSave;

// What is the Slot of the Currently Loaded Save File
let loadedSlot;

/**
 * Sounds
 */
/*let jumpSound = new Audio("sounds/jump.wav");
let hitSound = new Audio("sounds/hitBee.wav");
let buySound = new Audio("sounds/buy.wav");
let music = new Audio("sounds/music.mp3");
music.volume = 0.4;*/



function update(){
    //room.update();
    //player.update(room.height);
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
    //room.draw(worldCtx,world,player);
    //player.draw(worldCtx,room.height);
    /*for(let i = 0; i < beeArray.length; i++){
        beeArray[i].draw(ctx);
    }*/

    // if the player is in flight (jumped or gliding), have gravity affect them
    /*if (!player.launching){
        player.slowDown(room.gravity);
    }*/
    camera.drawGrid();
}

function animate(){
    //ctx.clearRect(0, 0, world.width, world.height);
    camera.clear();
    update();
    draw();
    animateId = requestAnimationFrame(animate);

}

function init(){
    //room = new Room(worldObjects.x, worldObjects.y, worldObjects.width, worldObjects.height);
    //player = new Player(100,room.height-100,10,20);

    //create random locations for bees
    /*for(let i = 0; i < 50; i++){
        let x = randomIntFromInterval(player.x*2, room.width);// the starting pos is just a guess
        let y = randomIntFromInterval(0, room.height-200);//lowers the chance of hitting a bee

        beeArray.push(new Bee(x,y));

    }*/
    animate();
};

/**
* Function openSlotSelect
* Used to open the Save Slot selection Menu.
*/
function openSlotSelect(){
  // hide Start Screent
  let startScreen = document.getElementById("start_screen");
  startScreen.style.display = "none"

  // target "Slot Select" buttons
  let btnSlot1 = document.getElementById("slot1");
  let btnSlot2 = document.getElementById("slot2");
  let btnSlot3 = document.getElementById("slot3");

  // check localStorage for usage
  if (localStorage.getItem(lbSlot1)){
    btnSlot1.innerHTML = "Continue Slot 1";
  }
  else{
    btnSlot1.innerHTML = "New Game";
  }
  if (localStorage.getItem(lbSlot2)){
    btnSlot2.innerHTML = "Continue Slot 2";
  }
  else{
    btnSlot2.innerHTML = "New Game";
  }
  if (localStorage.getItem(lbSlot3)){
    btnSlot3.innerHTML = "Continue Slot 3";
  }
  else{
    btnSlot3.innerHTML = "New Game";
  }

  // display "Slot Select" Screen
  let saveSelect = document.getElementById("save_select")
  saveSelect.style.display = "block";
}

function startGame(){
    let startScreen = document.getElementById("save_select");
    startScreen.style.display = "none";
    viewport.style.display = "block";
    init();
    //music.play();
};

/**
* Function useSlot
* Used to "Load the Game" stored in the localStorage represented by the clicked
* slot.
*
* @param {integer} selectedSlot the number of the slot: 0 = Slot 1, 1 = Slot 2,
* 2 = Slot 3
*/
function useSlot(selectedSlot){
  // evalute selectedSlot
  switch(selectedSlot){
    case 0:
      loadedSlot = lbSlot1;
      break;
    case 1:
      loadedSlot = lbSlot2;
      break;
    case 2:
      loadedSlot = lbSlot3;
      break;
  }

  // load the game based on the loadedSlot
  if (localStorage.getItem(loadedSlot)){
    // Load from localStorage
    currentSave = JSON.parse(localStorage.getItem(loadedSlot));
  }
  else{
    // Create a New Game
    currentSave = new SaveFile();
  }

  // we've loaded the game
  loadingGame = false;

  // start the game
  startGame();
}

/**
* Function deleteSlot
* Used to delete the "Saved Game" stored in the localStorage represented by the
* clicked slot.
*
* @param {integer} selectedSlot the number of the slot: 0 = Slot 1, 1 = Slot 2,
* 2 = Slot 3
*/
function deleteSlot(selectedSlot){
  // evalute selectedSlot
  let currentSlot;
  let updateBtn;

  switch(selectedSlot){
    case 0:
      currentSlot = lbSlot1;
      updateBtn = document.getElementById("slot1");
      break;
    case 1:
      currentSlot = lbSlot2;
      updateBtn = document.getElementById("slot2");
      break;
    case 2:
      currentSlot = lbSlot3;
      updateBtn = document.getElementById("slot3");
      break;
  }

  // confirm deletion of Save at Slot
  let choice = confirm("Delete the Saved Game from Slot " + (selectedSlot+1) + "?");

  if (choice){
    localStorage.removeItem(currentSlot);
    updateBtn.innerHTML = "New Game";
  }
}

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

/*** Controls ***/

document.addEventListener('keydown', function(e){
    if(firstKey || loadingGame){
        firstKey = false;
        openSlotSelect();
    // was }else if(player.launching && !shop.open){
    }/*else if(player.launching){
        player.launch();
        //jumpSound.play();
    // was }else if(!player.gliding && !shop.open){
    }else if(!player.gliding){
        player.glide();
    }*/
});

document.addEventListener('keyup', function(e){

});

viewport.addEventListener('touchstart', function(e){
    if(firstKey || loadingGame){
        firstKey = false;
        openSlotSelect();
    // was }else if(player.launching && !shop.open){
    }/*else if(player.launching){
        player.launch();
        //jumpSound.play();
    // was }else if(!player.gliding && !shop.open){
    }else if(!player.gliding){
        player.glide();
    }*/
});

document.addEventListener('mousedown', function(){
    if(firstKey || loadingGame){
        firstKey = false;
        openSlotSelect();
    // was }else if(player.launching && !shop.open){
    }/*else if(player.launching){
        player.launch();
        //jumpSound.play();
    // was }else if(!player.gliding && !shop.open){
    }else if(!player.gliding){
        player.glide();
    }*/
});

/*** When the Window is Resized ***/
window.addEventListener('resize', function(){
  // resize camera
  camera.resized();
});
