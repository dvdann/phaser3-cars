class ToggleButton extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);
    this.scene = config.scene;
    this.config = config;

    this.back = this.scene.add.image(0, 0, config.backKey);
    this.onIcon = this.scene.add.image(0, 0, config.onIcon);
    this.offIcon = this.scene.add.image(0, 0, config.offIcon);

    Align.scaleToGameW(this.back, 0.1, config.scene.game);
    Align.scaleToGameW(this.onIcon, 0.05, config.scene.game);
    Align.scaleToGameW(this.offIcon, 0.05, config.scene.game);

    this.add(this.back);
    this.add(this.onIcon);
    this.add(this.offIcon);

    if (!config.value){
      config.value = true;
    }

    this.value = config.value;
    this.setIcons();

    if (config.x){
      this.x = config.x;
    }
    if (config.y){
      this.y = config.y;
    }

    this.scene.add.existing(this);

    // set event emitter
    if (config.event){
      this.event = config.event;

      this.back.setInteractive();
      this.back.on('pointerdown', this.toggle.bind(this));
    }

  }

  toggle(){
    this.value = !this.value;
    this.setIcons();
    if (this.event){
      this.scene.game.emitter.emit(this.event, this.value);
    }
  }

  setIcons(){
    if (this.value){
      this.onIcon.visible = true;
      this.offIcon.visible = false;
    }
    else {
      this.onIcon.visible = false;
      this.offIcon.visible = true;
    }
  }
}
