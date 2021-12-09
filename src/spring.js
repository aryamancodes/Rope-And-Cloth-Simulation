class Spring{
  constructor(pointA,pointB){
    this.pointA = pointA;
    this.pointB = pointB
    this.restLength = this.findLength();
    this.normalCol = '#ababab'
    this.darkModeCol = '#5eff99'
    this.alive = true;
  }
  
  findLength(){
    let aVector = createVector(this.pointA.x, this.pointA.y);
    let bVector = createVector(this.pointB.x, this.pointB.y);
    return aVector.dist(bVector);
  }
  
  display(){
    if(this.alive){
      push(); //push/pop to set stroke properties only to springs
      if(darkMode){
        stroke(this.darkModeCol);
      }
      else{
        stroke(this.normalCol);
      }
      strokeWeight(4);
      line(this.pointA.x, this.pointA.y, this.pointB.x, this.pointB.y);
      pop();
    }
  }
}