export default class SceneLoad extends Phaser.Scene {
  constructor() {
    super('SceneLoad');
  }
  preload(){
    this.progBar = new Bar({scene: this, x: 240, y: 320});
    this.progText = this.add.text(
        this.game.config.width/2,
        this.game.config.height/2,
        "0%",
        {
          color: '#ffffff',
          fontSize: '40px'
        });
    this.progText.setOrigin(0.5);
    this.load.on('progress', this.onProgress.bind(this));

    this.load.image('road', 'assets/road.jpg');
    this.load.spritesheet('cars', 'assets/cars.png', {
      frameWidth: 60,
      frameHeight: 126
    });
    this.load.image('line', 'assets/line.png');
    this.load.image('pcar1', 'assets/pcar1.png');
    this.load.image('pcar2', 'assets/pcar2.png');
    this.load.image('cone', 'assets/cone.png');
    this.load.image('barrier', 'assets/barrier.png');

    this.load.image('button1', 'assets/ui/buttons/2/1.png');
    this.load.image('button2', 'assets/ui/buttons/2/4.png');
    this.load.image('title', 'assets/title.png');
    this.load.image('button3', 'assets/ui/buttons/2/6.png');

    this.load.image('toggleBack', 'assets/toggles/1.png');
    this.load.image('sfxOn', 'assets/ui/icons/sfx_on.png');
    this.load.image('sfxOff', 'assets/ui/icons/sfx_off.png');
    this.load.image('musicOn', 'assets/ui/icons/music_on.png');
    this.load.image('musicOff', 'assets/ui/icons/music_off.png');

    this.load.audio('backgroundMusic', ['assets/audio/random-race.mp3', 'assets/audio/random-race.ogg']);
    this.load.audio('boom', ['assets/audio/boom.mp3', 'assets/audio/boom.ogg']);
    this.load.audio('whoosh', ['assets/audio/whoosh.mp3', 'assets/audio/whoosh.ogg']);
  }
  onProgress(val){
    this.progText.text = Math.round(val*100) + "%";
    this.progBar.setPercent(val);
  }
  create(){
    this.game.model = new Model(this.game);
    this.scene.start('SceneTitle');
  }
}
