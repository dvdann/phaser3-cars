import Road from './classes/Road';
import ScoreBox from './classes/comps/ScoreBox'
import Model from './classes/mc/Model'

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super('SceneMain');
  }
  preload(){
    // Load images and sounds
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
  }
  create(){
    // Define our objects
    console.log("Ready!");


    // PART WORKAROUND

    this.sb = new ScoreBox({scene: this});
    this.game.model = new Model(this.game);

    // installing some variable from MediaManager
    let mediaManager = new MediaManager({scene: this});
    // mediaManager.setBackgroundMusic('backgroundMusic');

    this.game.model.gameOver = false;

    // this.game.emitter.emit(this.game.G.SET_SCORE, 99);
    // this.game.emitter.emit(this.game.G.UP_POINTS, 1);
    // console.log(this.game.model.score);
    console.log(this.game.G.SET_SCORE + ' | ' + this.game.G.SCORE_UPDATED);

    let gridConfig = {
      rows: 5,
      cols: 5,
      scene: this
    }
    this.game.alignGrid = new AlignGrid(gridConfig, this.game);
    this.game.alignGrid.placeAtIndex(4, this.sb);

    // let toggleButton = new ToggleButton({
    //   scene: this,
    //   backKey: 'toggleBack',
    //   onIcon: 'sfxOn',
    //   offIcon: 'sfxOff',
    //   event: this.game.G.TOGGLE_SOUND,
    //   x: 80, y: 450
    // });
    // END OF WORKAROUND

    this.road = new Road({scene: this});
    this.road.x = this.game.config.width / 2;
    this.road.makeLines();
    // this.game.alignGrid.showNumbers();

    this.input.keyboard.on('keydown_SPACE', event => {
      this.road.changeLanes();
    });

    // let fireText = {color: 'black', fontSize: '32px'}
    // let flatButton1 = new FlatButton({
    //   scene: this,
    //   key: 'button1',
    //   text: 'Fire!',
    //   x: 240, y: 100,
    //   event: 'button_pressed',
    //   params: 'SceneOver',
    //   textConfig: fireText
    // });
    // let flatButton2 = new FlatButton({
    //   scene: this,
    //   key: 'button2',
    //   text: 'Destruct!',
    //   x: 240, y: 180,
    //   event: 'button_pressed',
    //   params: 'SceneTitle'
    // });
    this.game.emitter.on('button_pressed', this.buttonPressed.bind(this));

    let soundBtn = new SoundButton({scene: this});
  }
  buttonPressed(params){
    this.scene.start(params);
    // this.game.emitter.emit(this.game.G.PLAY_SOUND, 'cat');
  }
  update(){
    // Constant running loop
    this.road.moveLines();
    this.road.moveObject();
  }
}
