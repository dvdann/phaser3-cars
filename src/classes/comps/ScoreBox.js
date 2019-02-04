export default class ScoreBox extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);
    this.scene = config.scene;

    this.text1 = this.scene.add.text(0, 0, "SCORE: 0");
    this.text1.setOrigin(0.5, 0.5);
    this.add(this.text1); // add to the Container

    this.scene.add.existing(this);
    // console.log("set emitter");
    this.scene.game.emitter.on(this.scene.game.G.SCORE_UPDATED, this.scoreUpdated.bind(this));
  }

  scoreUpdated(){
    this.text1.setText("SCORE: " + this.scene.game.model.score);
  }
}
