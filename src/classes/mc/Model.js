export default class Model {
  constructor(game) {
    this._score = 0;
    this.soundOn = true;
    this._musicOn = true;
    this.gameOver = false;
    this.game = game;
  }

  set musicOn(val){
    this._musicOn = val;
    this.game.emitter.emit(this.game.G.MUSIC_CHANGED);
  }

  get musicOn(){
    return this._musicOn;
  }

  set score(val){
    this._score = val;
    // console.log("get emitter");
    this.game.emitter.emit(this.game.G.SCORE_UPDATED);
    console.log("Score text updated!");
  }

  get score(){
    return this._score;
  }
}
