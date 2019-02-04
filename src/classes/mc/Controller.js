class Controller {
  constructor(game) {
    game.emitter.on(game.G.SET_SCORE, this.setScore.bind(this));
    game.emitter.on(game.G.UP_POINTS, this.upPoints.bind(this));
    this.game = game;
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
