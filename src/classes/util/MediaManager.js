class MediaManager {
  constructor(config) {
    this.scene = config.scene;
    this.scene.game.emitter.on(this.scene.game.G.PLAY_SOUND, this.playSound.bind(this));
    this.scene.game.emitter.on(this.scene.game.G.MUSIC_CHANGED, this.musicChanged.bind(this));
  }

  musicChanged(){
    if (this.background){
      if (!this.scene.game.model.musicOn){
        this.background.stop();
      }
      else {
        this.background.play();
      }
    }
  }

  playSound(key){
    if (this.scene.game.model.soundOn){
      // console.log('sound: ' + this.scene.game.model.soundOn);
      let sound = this.scene.sound.add(key);
      sound.play();
    }
  }

  setBackgroundMusic(key){
    // console.log('setBackgroundMusic: ' + this.scene.game.model.musicOn);
    if (this.scene.game.model.musicOn){
      this.background = this.scene.sound.add(key, {
        volume: 0.5,
        loop: true
      });
      this.background.play();
    }
  }

}
