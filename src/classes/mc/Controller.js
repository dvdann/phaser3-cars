class Controller {
  constructor(game) {
    game.emitter.on(game.G.SET_SCORE, this.setScore.bind(this));
    game.emitter.on(game.G.UP_POINTS, this.upPoints.bind(this));
    game.emitter.on(game.G.TOGGLE_SOUND, this.toggleSound.bind(this));
    game.emitter.on(game.G.TOGGLE_MUSIC, this.toggleMusic.bind(this));
    this.game = game;
  }

  toggleSound(val){
    this.game.model.soundOn = val;
  }

  toggleMusic(val){
    this.game.model.musicOn = val;
  }

  setScore(val){
    this.game.model.score = val;
  }

  upPoints(val){
    let score = this.game.model.score;
    score += val;
    this.game.model.score = score;
  }
}
