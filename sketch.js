var balloon;
var database;
var position;

function preload(){
  backgroundImg = loadImage("city.jpg");
  balloonImg = loadAnimation("balloon.png","balloon-1.png","balloon.png","balloon-2.png");
  balloonImg1 = loadImage("balloon-1.png");
  balloonImg2 = loadImage("balloon-2.png");
}

function setup(){
    createCanvas(800,400);

    database = firebase.database();

    balloonSprite = createSprite(400,200,0,0);
    balloonSprite.addAnimation("hotAir", balloonImg);
    balloonSprite.addImage("hotAir1", balloonImg1);
    balloonSprite.addImage("hotAir2", balloonImg2);

    var balloonPosition = database.ref('Balloon/Position');
    balloonPosition.on("value",readPosition,showError);
}

function draw(){
    background(backgroundImg);
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
        balloonSprite.changeImage("hotAir");
    }
    if(keyDown(RIGHT_ARROW)){
        writePosition(+1,0);
        balloonSprite.changeImage("hotAir");
    }
    if(keyDown(UP_ARROW)){
        writePosition(0,-1);
        balloonSprite.changeAnimation("hotAir1");
    }
    if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
        balloonSprite.changeAnimation("hotAir2");
    }
    drawSprites();

    fill("black");
    textSize(20);
    text("Move around with your cousins in the hot air balloon using ARROW KEYS to navigate", 10,380);
}

function readPosition(data){
    position = data.val();
    balloonSprite.x = position.x;
    balloonSprite.y = position.y;
}

function showError(){
    console.log("error in the database");
}

function writePosition(x, y){
    database.ref('Balloon/Position').set({
        'x': position.x + x,
        'y': position.y + y
    })

}

function keyReleased(){
  if(keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40){
    balloonSprite.changeAnimation("hotAir");
  }
}