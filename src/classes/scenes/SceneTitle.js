export default class SceneTitle extends Phaser.Scene {
  constructor() {
    super('SceneTitle');
  }
  preload(){

  }
  create(){
    console.log("Scene title");
    this.game.emitter = new Phaser.Events.EventEmitter(); // part of toolbox
    this.game.controller = new Controller(this.game);

    this.alignGrid = new AlignGrid({rows: 11, cols: 11, scene: this}, this.game);
    // this.alignGrid.showNumbers();

    let title = this.add.image(0, 0, 'title');
    Align.scaleToGameW(title, 0.8, this.game);
    this.alignGrid.placeAtIndex(38, title);

    let btnStart = new FlatButton({
      scene: this,
      key: 'button3',
      text: 'START',
      event: 'start_game',
    });
    this.alignGrid.placeAtIndex(93, btnStart);

    this.game.emitter.on('start_game', this.start_game.bind(this));

    // installing some variable from MediaManager
    let mediaManager = new MediaManager({scene: this});
    mediaManager.setBackgroundMusic('backgroundMusic');
  }
  start_game(){
    this.scene.start('SceneMain');
  }
  update(){}
}
