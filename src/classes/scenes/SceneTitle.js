export default class SceneTitle extends Phaser.Scene {
  constructor() {
    super('SceneTitle');
  }
  preload(){
    this.load.image('title', 'assets/title.png');
    this.load.image('button3', 'assets/ui/buttons/2/6.png');

    this.load.image('toggleBack', 'assets/toggles/1.png');
    this.load.image('sfxOn', 'assets/ui/icons/sfx_on.png');
    this.load.image('sfxOff', 'assets/ui/icons/sfx_off.png');
    this.load.image('musicOn', 'assets/ui/icons/music_on.png');
    this.load.image('musicOff', 'assets/ui/icons/music_off.png');

    this.load.audio('cat', ['assets/audio/meow.mp3', 'assets/audio/meow.ogg']);
    this.load.audio('backgroundMusic', ['assets/audio/random-race.mp3', 'assets/audio/random-race.ogg']);
    this.load.audio('boom', ['assets/audio/boom.mp3', 'assets/audio/boom.ogg']);
    this.load.audio('whoosh', ['assets/audio/whoosh.mp3', 'assets/audio/whoosh.ogg']);
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
  }
  start_game(){
    this.scene.start('SceneMain');
  }
  update(){}
}
