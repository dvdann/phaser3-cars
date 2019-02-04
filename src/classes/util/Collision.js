class Collision {
  static checkCollide(obj1, obj2){
    let distX = Math.abs(obj1.x - obj2.x);
    let distY = Math.abs(obj1.y - obj2.y);
    // if the distance over a half of sprite, it's mean teh obj collided
    if (distX < obj1.width / 2){
      if (distY < obj1.height / 2){
        return true;
      }
    }
    return false;
  }
}
