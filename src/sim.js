 function Sim(){
    this.simulate = function(){
    this.updatePoints();
    this.hitObstacle();
    this.constrainPoints();
    this.updateSprings();
    this.display();
  }
  
  this.updatePoints = function(){
    for(let i=0; i<points.length; ++i){
      let p = points[i];

      if(!p.isLocked() && !p.isObstacle()){

        let dx = (p.x - p.prevX) * FRICTION,
            dy = (p.y - p.prevY) * FRICTION;

        p.prevX = p.x;
        p.prevY = p.y;
        p.x += dx + WIND.x;
        p.y += dy + GRAVITY - WIND.y;
      }
    }
  }
  
  this.hitObstacle = function(){
    for(let i=0; i<points.length; ++i){
      let p = points[i],
          hitIndex = p.collideIndex();
      if(hitIndex>-1){
        let hit = obstacles[hitIndex],
            direction = createVector(p.x-hit.x,p.y-hit.y);
        direction.normalize();
        if(!p.isLocked() || p.isLocked()){
          p.prevX = p.x;
          p.prevY = p.y;
          p.x += direction.x *  p.radius;
          p.y += direction.y * p.radius;
        }
      }
    }
  }
  this.constrainPoints = function(){
    for(let i =0; i<points.length; ++i){
      let p = points[i],
          dx = (p.x - p.prevX) * FRICTION,
          dy = (p.y - p.prevY) * FRICTION;
      if(p.x >= width - p.radius){
        p.x = width - p.radius;
        p.prevX = p.x + dx * BOUNCE;
      }

      if(p.x<=((width * 0.05 + width * 0.165) +p.radius)){
        p.x = (width * 0.05 + width * 0.165) + p.radius;
        p.prevX = p.x + dx * BOUNCE; 
      }

      if(p.y >= height - p.radius){
        p.y = height - p.radius;
        p.prevY = p.y + dy * BOUNCE; 
      }

      if(p.y<=p.radius){
        p.y = p.radius;
        p.prevY = p.y + dy * BOUNCE;
      } 
    }
  }
  
  this.updateSprings = function(){
      for(let i=0; i<ITERATIONS; ++i){
        for(let i=0; i<springs.length; ++i){
        let s = springs[i],
            dx = s.pointB.x - s.pointA.x,
            dy = s.pointB.y - s.pointA.y,
            currDistance = Math.sqrt(dx*dx + dy*dy),
            difference = s.restLength - currDistance,

            //ratio of change, calculated from the center of the spring
            delta = difference / currDistance / 2,

            offsetX = dx * delta, 
            offsetY = dy * delta;

        if(!s.pointA.isLocked() && !s.pointA.isObstacle()){
          s.pointA.x -= offsetX;
          s.pointA.y -= offsetY;
        }

        if(!s.pointB.isLocked() && !s.pointB.isObstacle()){
           s.pointB.x += offsetX;
          s.pointB.y += offsetY;
        } 
      }
    }
  }
  
  this.display = function(){
    for(let i =0; i<springs.length; ++i){
      springs[i].display();
    }
      for(let i=0; i<points.length; ++i){
      points[i].display();
    }
  }
  
  this.deletePoints =  function(mouseCoords){
      let i = this.mouseOverPointIndex(mouseCoords);
      let clickedPoint = (i>-1);
      if(clickedPoint){
        this.deleteSprings(points[i]);
        points[i] = null;
        points.splice(i,1);
      }    
  }


 this.deleteSprings = function(point){
    for(let i=0; i<springs.length; i++){
      if(springs[i].pointA == point || springs[i].pointB == point){
        springs[i] = null;
        springs.splice(i,1);
        i--;
      }
    }
  }
 
  this.mouseOverPointIndex = function(mouseCoords){
    for(let i=0; i<points.length; i++){
       let position = createVector(points[i].x, points[i].y); 
       let distance = position.dist(mouseCoords);
       if(distance<points[i].radius){
         return i;
       }
    }
    return -1;
  }
  
  this.addForce = function(Point, force){
    let delta = createVector(force.x - Point.x ,force.y - Point.y);
    Point.x += delta.x;
    Point.y += delta.y
  }
  
}