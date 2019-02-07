class SoundButton extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);
    this.scene = config.scene;

    this.musicButton = new ToggleButton({
      scene: this.scene,
      backKey: 'toggleBack',
      onIcon: 'musicOn',
      offIcon: 'musicOff',
      event: this.scene.game.G.TOGGLE_MUSIC,
      x: 0, y: 0
    });
    this.sfxButton = new ToggleButton({
      scene: this.scene,
      backKey: 'toggleBack',
      onIcon: 'sfxOn',
      offIcon: 'sfxOff',
      event: this.scene.game.G.TOGGLE_SOUND,
      x: 0, y: 0
    });

    // this.add(this.musicButton);
    // this.add(this.sfxButton);

    this.musicButton.x = this.musicButton.width/2;
    this.musicButton.y = this.musicButton.height/2;
    this.musicButton.setScrollFactor(0);

    this.sfxButton.x = this.scene.game.config.width - this.sfxButton.width/2;
    this.sfxButton.y = this.musicButton.y;
    this.sfxButton.setScrollFactor(0);

    if (!this.scene.game.model.musicOn){
      this.musicButton.toggle();
    }
    if (!this.scene.game.model.soundOn){
      this.sfxButton.toggle();
    }
  }
}
