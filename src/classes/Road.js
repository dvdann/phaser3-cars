export default class Road extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);
    this.scene = config.scene; // reference from constructor to get a scene data
    this.game = this.scene.game; // shorting the reference

    this.back = this.scene.add.image(0, 0, 'road');
    // add the 'road' to this go relative position (x, y)
    // in nutshell is going to be child
    this.add(this.back);
    this.scene.add.existing(this); //adds an existing display object to the game world

    Align.scaleToGameW(this.back, 0.5, this.game); // do scaling for image 50%
    // Sets the internal size of this Game Object, as used for frame or physics body creation.
    this.setSize(this.back.displayWidth, this.game.config.height);
    this.lineGroup = this.scene.add.group();
    this.countLine = 0;

    // add car
    this.car = this.scene.add.sprite(this.displayWidth/4, this.game.config.height*0.9, 'cars');
    Align.scaleToGameW(this.car, 0.1, this.game);
    this.add(this.car); // the position will relative on this 'road'
    this.car.isMoving = false;
    // this.depth = 1;

    // add click
    this.back.setInteractive();
    this.back.on('pointerdown', () => this.changeLane());

    this.addObject();
    // this.alpha = .5; // debug

  }

  addObject(){
    let objects = [
      {key: 'pcar1', speed: 5, scale: 10},
      {key: 'pcar2', speed: 8, scale: 10},
      {key: 'cone', speed: 0, scale: 8},
      {key: 'barrier', speed: 0, scale: 10}
    ];
    let index = Math.floor(Math.random() * 4);
    let key = objects[index].key;
    let speed = objects[index].speed;
    let scale = objects[index].scale/100;

    this.object = this.scene.add.sprite(-this.displayWidth/4, 0, key);
    this.object.speed = speed;
    let pickLane = Math.random() * 100;
    if (pickLane < 50){ // left lane or right lane
      this.object.x = this.object.x * -1;
    }
    Align.scaleToGameW(this.object, scale, this.game);
    this.add(this.object);
  }

  moveObject(){
    if (this.game.model.gameOver){
      return;
    }
    this.object.y += this.vSpace / 20 + this.object.speed;
    if (Collision.checkCollide(this.car, this.object)){
      this.game.emitter.emit(this.game.G.PLAY_SOUND, 'boom');
      this.game.model.gameOver = true;
      this.scene.tweens.add({
        targets: this.car,
        duration: 1000,
        y: this.game.config.height,
        angle: -270 // run into this angle rotation
      });
      this.scene.time.addEvent({
        delay: 2000,
        callback: this.goGameOver,
        callbackScope: this.scene,
        loop: false
      });
    }
    if (this.object.y > this.game.config.height + 32){
      this.scene.game.emitter.emit(this.scene.game.G.UP_POINTS, 1);
      this.object.destroy();
      this.addObject();
    }
  }

  goGameOver(){
    this.scene.start('SceneOver');
  }

  makeLines(){
    this.vSpace = this.displayHeight / 10; // space between line
    // generate 20 lines and keep it in lineGroup
    for (var i = 0; i < 20; i++) {
      var line = this.scene.add.image(this.x, this.vSpace * i, 'line');
      line.originY = line.y;
      this.lineGroup.add(line);
      // line.depth = 2;
    }
  }

  moveLines(){
    if (this.game.model.gameOver){
      return;
    }
    this.lineGroup.children.iterate(child => {
      child.y += this.vSpace / 20;
    });
    this.countLine++;
    if (this.countLine == 20){
      this.countLine = 0;
      this.lineGroup.children.iterate(child => {
        child.y = child.originY;
      });
    }
  }

  changeLane(){
    if (this.game.model.gameOver){
      return;
    }
    this.game.emitter.emit(this.game.G.PLAY_SOUND, 'whoosh');
    let lastPos = this.car.x;
    this.car.x = -1 * lastPos;
  }

  changeLanes(){
    let lastPos = this.car.x;
    if (!this.car.isMoving){
      this.car.isMoving = true;
      this.scene.tweens.add({
        targets: this.car,
        x: -1 * lastPos,
        duration: 250,
        onComplete: () => {
          this.car.isMoving = false;
          console.log('Moving end');
        }
      });
    }
  }
}
