var PLAY = 1;
var END = 0;
var gameState = PLAY;

var spaceship, obstacle;
var ground, invisibleGround;
var gameOver, restart;


var spaceship = createSprite(200,380,20,50);
spaceship.loadImage("Images/spaceship.jpeg");


spaceship.setCollider("rectangle",0,0,150,80,0);


spaceship.scale = 0.5;
spaceship.x = 50;

//create a ground sprite
var ground = createSprite(200,380,400,20);
ground.loadImage("Images/space.jpeg");
ground.x = ground.width /2;


var invisibleGround = createSprite(200,385,400,5);
invisibleGround.visible = false;

//create Obstacle and Cloud Groups
var ObstaclesGroup = createGroup();


//set text
textSize(18);
textFont("Georgia");
textStyle(BOLD);

//score
var count = 0;

function draw() {
  //set background to white
  background("white");
  //display score
  text("Score: "+ count, 250, 100);
  console.log(gameState);
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -6;
    //scoring
    count = Math.round(World.frameCount/4);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && spaceship.y >= 359){
      spaceship.velocityY = -12 ;
    }
  if (count%100 === 0&&count>0) {
   playSound("sound://category_bell/bells_win_high.mp3"); 
  }
  
  
    //add gravity
    spaceship.velocityY = spaceship.velocityY + 0.8;
    
    //spawn the clouds
    
  
    //spawn obstacles
    spawnObstacles();
    
    
    if(ObstaclesGroup.isTouching(spaceship)){
      
      playSound("sound://category_alerts/cartoon_negative_bling.mp3");
    }
  }
  
  else if(gameState === END) {
    //set velcity of each game object to 0
    ground.velocityX = 0;
    spaceship.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    
    
    
    
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    
    
    //place gameOver and restart icon on the screen
    var gameOver = createSprite(200,300);
    var restart = createSprite(200,340);
    
    gameOver.loadImage("Images/gameOver.png");
    gameOver.scale = 0.5;
    restart.loadImage("Images/restart.png");
    restart.scale = 0.5;
  }
  
  
  spaceship.collide(invisibleGround);
  
  drawSprites();
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = -(6+3*count/100);
    
    //generate random obstacles
    var rand = randomNumber(1,2);
    obstacle.loadImage("Images/meteor.jpeg" + rand);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 70;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

