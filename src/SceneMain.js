import Road from './classes/Road';
import ScoreBox from './classes/comps/ScoreBox'

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super('SceneMain');
  }
  preload(){
    // Load images and sounds

  }
  create(){
    // Define our objects
    console.log("Ready!");


    // PART WORKAROUND

    this.sb = new ScoreBox({scene: this});

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
