class Point{
  constructor(x,y){
    //positions
    this.x = x;
    this.y = y; 
    this.prevX = x;
    this.prevY = y;
    //properties
    this.locked = false;
    this.obstacle = false;
    //colour scheme
    this.lockedCol = '#db4f42';
    this.unlockedCol = 'white';
    this.darkLockedCol = '#ff00f7';
    this.darkUnlockedCol = '#e8e83a';
    this.obstacleCol = 'black';
    this.radius = 7.5;
    
  }
  isLocked(){
    return (this.locked==true);
  }
  
  isObstacle(){
    return (this.obstacle==true);
  }
  
  collideIndex(){
    for(let i=0; i<obstacles.length; ++i){
      let obstacle = obstacles[i];
      if(obstacle.x == this.x && obstacle.y == this.y){
        continue;
      }
      
      if(collideCircleCircle(this.x, this.y, this.radius*2, obstacle.x, obstacle.y, this.radius*2)){
      return i;
      }
    }
     return -1;
  }
  
  display(){
    strokeWeight(1.5);
    if(this.isObstacle()){ //special case of no green highlighting in edit mode
      push();
      fill(this.obstacleCol);
      noStroke();
      ellipse(this.x, this.y, this.radius * 2);
      pop();
      return;
    }
    else if(darkMode){
      this.isLocked()? fill(this.darkLockedCol): 
                       fill(this.darkUnlockedCol);      
    }
    else{
      this.isLocked()? fill(this.lockedCol):
                       fill(this.unlockedCol);
      
    }
    ellipse(this.x, this.y, this.radius * 2);
  }
}