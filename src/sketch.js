 /*TODO:
         - controls
         -random force to prevent overlap
         - Publish
*/

//simulation parameters
const GRAVITY = 0.75,
      BOUNCE = 0.9,
      FRICTION = 0.999,
      ITERATIONS = 20;
let WIND; //can be changed
//colour scheme
const ropeCol = '#5eff99',
      backgroundCol = '#acc8e3',
      darkModeCol = '#38488f';

//global vars
var points = [],
    springs = [],
    obstacles = [],
    play = false,
    darkMode = false,
    eraseMode = false,
    drawLineFrom = null,
    dragPoint = null;

//objects
let sim = new Sim(),
    gui,
    controllers = new Controllers(),
    playButton,
    clearButton,
    darkButton,
    infoBox1,
    infoBox2,
    infoBox3,
    infoBox4,
    infoBox5,
    infoBox6,
    windButton,
    windSlider,
    clothButton,
    clothRowSlider,
    clothColSlider,
    rowCount,
    colCount;
    


function setup() {
  createCanvas(windowWidth, windowHeight);
  //prevent context menu opening on right-click of canvas
  //since custom right click functionality is added
  for (let element of document.getElementsByClassName("p5Canvas")) {
    element.addEventListener("contextmenu", (e) => e.preventDefault());
  }
  gui = createGui();
  darkMode? gui.loadStyle("Seafoam"):gui.loadStyle("Blue");
  gui.setTextSize(10);

  controllers.createControllers(windowWidth, windowHeight);
  WIND = createVector(0,0);
}

function draw() {  
  darkMode?  background(darkModeCol):background(backgroundCol);
  noStroke();
  drawGui();
  controllers.handleControllers();
  
  if(drawLineFrom != null){ //rope follows mouse if a point is clicked
    strokeWeight(4);
    stroke(ropeCol);
    line(drawLineFrom.x,drawLineFrom.y,mouseX, mouseY);
  }
  
  if(play){
    if(mouseIsPressed && dragPoint !=null){
        sim.addForce(dragPoint,createVector(mouseX, mouseY));
    }
    sim.simulate();
  }
  else{
    sim.display();
  }
}

function resetCanvas(){
    clear();
    points = [];
    springs = [];
    obstacles = [];
    play = false;
    darkMode = false;
    drawLineFrom = null;
    setup();
  
}

function createCloth(rows, cols){  
  var startWidth = width*0.4,
      endWidth = width*0.8,
      startHeight = height * 0.2,
      endHeight = height * 0.6;
  var spaceX = (endWidth - startWidth)/rows,
      spaceY = (endHeight - startHeight)/cols;
  for(let c= 0; c<cols; ++c){
    for(let r= 0; r<rows; ++r){
      let index = rows*c+r;
     //  console.log(index);
      let p = new Point(startWidth+spaceY*c, startHeight+spaceX*r);
      points[index] = p;
      if(r==0){
        if(Math.floor(c%2)==0 || c+1>=cols){
          points[index].locked = true;
        }
      }
      else{
        let currP = points[index],
            upP = points[index-1],
            s = new Spring(currP, upP);
        springs.push(s);
      }
      if(c>0){
          let currP = points[index],
              leftP = points[index-rows],
              s = new Spring(currP, leftP);
          springs.push(s);
      }
    }
  }
 }

//input  handlers
function keyTyped(){
  if(keyCode == 32){ //space is pressed
    controllers.handleControllers("playButton");
  }
  if(key == 'c' || key == 'C'){
    controllers.handleControllers("clearButton");    
  }
  if(key == 'd' || key == 'D'){
    controllers.handleControllers("darkButton");
  }
  return false
}
  
function mousePressed(){
  if(mouseButton == RIGHT){
    drawLineFrom = null;
    sim.deletePoints(createVector(mouseX, mouseY)); 
  }
  
  let i = sim.mouseOverPointIndex(createVector(mouseX, mouseY)),
      clickedPoint = (i>-1); 
    if(clickedPoint){
      dragPoint = points[i];
    }
}


function mouseClicked(){
  let i = sim.mouseOverPointIndex(createVector(mouseX, mouseY)),
      clickedPoint = (i>-1); 
  
   if(mouseX <= (width * 0.25)|| mouseX > width || mouseY>height){ //click outside canvas
      return false;
    }
  
   if(clickedPoint && (keyIsDown(90) || keyIsDown(122))){ // lower/upper 'Z' + click
     points[i].obstacle = !points[i].obstacle;
     if(points[i].isObstacle()){
       obstacles.push(points[i])
     }
     else{
       obstacles = obstacles.splice(i, 1);
     }
     sim.deleteSprings(points[i]);
     return false;
  }
  
   if(clickedPoint && keyIsDown(SHIFT)){ //shift + click to lock point
      points[i].locked = !points[i].locked;
      return false;
   }

  if(!play) { //draw points or ropes in editing mode
    if(clickedPoint && drawLineFrom == null){//first point clicked
      drawLineFrom = !points[i].isObstacle()? points[i]: null;
    }
    //second distinct point clicked
    else if(clickedPoint && drawLineFrom !=null 
            && points[i]!=drawLineFrom && !points[i].isObstacle()){ 
        let s = new Spring(drawLineFrom, points[i]);
        springs.push(s);
        drawLineFrom = null;
    }
    else if(drawLineFrom != null){ //first point and then canvas clicked
      drawLineFrom = null;
    }
    else{ //just canvas clicked (for new point)
      drawLineFrom = null;
      let p = new Point(mouseX, mouseY);
      points.push(p);
      shuffle(points,true); //shuffle points for smooth update
    }
  }
  return false;
}

function mouseReleased(){
  dragPoint = null;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  resetCanvas();
}