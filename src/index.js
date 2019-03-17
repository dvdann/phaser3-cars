import Phaser from 'phaser';
import SceneMain from './SceneMain';
import SceneTitle from './classes/scenes/SceneTitle';
import SceneOver from './classes/scenes/SceneOver';
import SceneLoad from './classes/scenes/SceneLoad';

let game;

window.onload = () => {
  let isMobile = navigator.userAgent.indexOf("Mobile");
  let config;
  let scenes = [];

  scenes.push(SceneLoad);
  scenes.push(SceneTitle);
  scenes.push(SceneOver);
  scenes.push(SceneMain);

  if (isMobile == -1){
    isMobile = navigator.userAgent.indexOf("Tablet");
  }
  if (isMobile == -1){
    config = {
      type: Phaser.AUTO,
      parent: 'phaser-game',
      width: 480,
      height: 640,
      scene: scenes
    };
  }
  else {
    config = {
      type: Phaser.AUTO,
      parent: 'phaser-game',
      width: window.innerWidth,
      height: window.innerHeight,
      scene: scenes
    };
  }
  game = new Phaser.Game(config);
  game.G = new Constants();
  game.isMobile = isMobile;
};
