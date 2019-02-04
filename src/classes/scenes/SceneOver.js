export default class SceneOver extends Phaser.Scene {
  constructor() {
    super('SceneOver');
  }
  preload(){
    this.load.image('button2', 'assets/ui/buttons/1/5.png');
    this.load.image('title', 'assets/title.png');

  }
  create(){
    console.log("Scene over");

    this.alignGrid = new AlignGrid({rows: 11, cols: 11, scene: this}, this.game);
    // this.alignGrid.showNumbers();

    let title = this.add.image(0, 0, 'title');
    Align.scaleToGameW(title, 0.8, this.game);
    this.alignGrid.placeAtIndex(38, title);

    let btnStart = new FlatButton({
      scene: this,
      key: 'button2',
      text: 'PLAY AGAIN!',
      event: 'start_game',
    });
    this.alignGrid.placeAtIndex(93, btnStart);

    this.game.emitter.on('start_game', this.start_game.bind(this));
  }
  start_game(){
    this.scene.start('SceneMain');
  }
  update(){}
}
