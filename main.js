// Loading page
window.onload = function(){

  //Setting up canvas
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  //Variables
  var boxes = [];
  var imgArepa = new Image();
  imgArepa.src = 'images/reina-pepiada.png';

  //////////////////  CONSTRUCTOR FUNCTIONS  ////////////////////////

  //Game constructor function
  function Game(){
    this.george = {}
  }

  //Box constructor function
  function Box(x,y){
    this.x = x ;
    this.y = y;
    this.width = 72;
    this.height = 72;
  }

  //George constructor function
  var George = function(){
    this.x = 240;
    this.y = 600;
    this.width = 58;
    this.height = 72;
    this.img = new Image();
    this.img.src = 'images/george_harris.png';  
    this.health = 20;
  }

  

  //////////////////  DECLARATION OF CONSTRUCTOR FUNCTIONS  /////////

  var game = new Game();
  var theGeorge = new George();
  
  
  //////////////////  PROTOTYPES  ///////////////////////////////////

  ///Obsticles!------
  Game.prototype.generateBoxes = function(){
      for(var i=0; i < 21; i++){
        var randomI = Math.floor((Math.random() * 20))
        var newBox = new Box(randomI *73, 0);
        boxes.push(newBox);
      }

  }

  Game.prototype.drawBoxes = function(){
    for(var i=0; i < boxes.length; i++){
      boxes[i].y += 1;
    // ctx.fillRect(boxes[i].x, boxes[i].y, 72, 72);
    ctx.drawImage(imgArepa, boxes[i].x, boxes[i].y, 72, 72 )
    }
  }

  Box.prototype.drawArepas = function(){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
 /// End of obsticles----
 
 ///Character/ character movement
  George.prototype.drawGeorge = function(){
  ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  George.prototype.move = function(theX, theY){
    ctx.clearRect(this.x, this.y, this.width, this.height);
      this.x = theX
      this.y = theY
      if(game.george.canMove(this.x, this.y)) {
        game.george.drawGeorge();
      }
  }

  //makes sure that the image doenst go pass the border
  George.prototype.canMove = function (futurex, futurey) {
    if (futurex + this.width >= canvas.width) {
        this.x =canvas.width- this.width;
      } else if(futurex <= 0 ||
        futurey + this.height >= canvas.height ||
        futurey <= 0){
        return false
      } else {
        return true;
    }
  }
  /// End of character movement----


  //ANIMATE!!!-------
  Game.prototype.animate = function(){
  setInterval(function(){

    ctx.clearRect(0,0,canvas.width,canvas.height)
    game.drawBoxes();
    game.george.drawGeorge();
    for(var i = 0; i <  boxes.length; i++) {
      if (boxes[i].x < theGeorge.x + theGeorge.width && //from left
        boxes[i].x + boxes[i].width > theGeorge.x &&    //from right
        boxes[i].y < theGeorge.y + theGeorge.height &&  //from top
        boxes[i].height + boxes[i].y > theGeorge.y)     //from bottom
        {
          // collision detected!
          console.log('georges health', theGeorge.health)
          boxes.splice(i,1);
          theGeorge.health--;
        }
      }
    },17);
  }
  
  /////////////  END OF PROTOTYPES  /////////////////////////////////
  

  //////////////////  CALLING PROTOTYPES  ///////////////////////////

  game.generateBoxes();
  game.animate();
  game.george = theGeorge;  

  
  //////////////////   FUNCTIONS   //////////////////////////////////

  //Function to generate row every ten seconds
  setInterval(function(){
    game.generateBoxes();
  },3800);

  //mouse movement function

  function mousePos(e) {
    if (e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    } else if (e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
    theGeorge.move(mouseX, mouseY)
  }

  $(function () { 
    canvas.onmousemove = mousePos;
  });

  //////////////////  END OF FUNCTIONS  /////////////////////////////
  
  
}