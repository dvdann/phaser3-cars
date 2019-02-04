class AlignGrid {
  constructor(config, game) {
    this.config = config;
    if (!config.scene){
      console.log("Missing scene");
      return;
    }
    if (!config.rows){
      config.rows = 5;
    }
    if (!config.cols){
      config.cols = 5;
    }
    if (!config.height){
      config.height = game.config.height;
    }
    if (!config.width){
      config.width = game.config.width;
    }

    this.scene = config.scene;
    // setup cell in rows and cols
    this.cw = config.width / config.cols;
    this.ch = config.height / config.rows;
  }

  show(){
    this.graphics = this.scene.add.graphics();
    this.graphics.lineStyle(2, 0xff0000);
    for (let i = 0; i < this.config.width; i+=this.cw) {
      this.graphics.moveTo(i, 0);
      this.graphics.lineTo(i, this.config.height);
    }
    for (let i = 0; i < this.config.height; i+=this.ch) {
      this.graphics.moveTo(0, i);
      this.graphics.lineTo(this.config.width, i);
    }
    this.graphics.strokePath();
  }

  // calc position based on cell that created
  placeAt(x, y, obj){
    // make them in the middle, instead in point
    let _x = this.cw * x + this.cw/2;
    let _y = this.ch * y + this.ch/2;
    obj.x = _x;
    obj.y = _y;
  }

  placeAtIndex(index, obj){
    let y = Math.floor(index / this.config.cols);
    let x = index - (y * this.config.cols);
    this.placeAt(x, y, obj);
  }

  showNumbers(){
    this.show();
    let count = 0;
    for (let i = 0; i < this.config.rows; i++) {
      for (let j = 0; j < this.config.cols; j++) {
        let numText = this.scene.add.text(0, 0, count, {color: '#ff0000'});
        numText.setOrigin(0.5, 0.5);
        this.placeAtIndex(count, numText);
        count++;
      }
    }
  }
}
