import { player } from "../engine/editor.js";
import AnimatedImage from "./AnimatedImage.js";

export default class Fan extends AnimatedImage {
  constructor(
    image,
    x,
    y,
    name,
    spriteFrames,
    line,
    w,
    h,
    canvas,
    imageSizeFactor,
    id,
  ) {
    super(
      image,
      x,
      y,
      name,
      spriteFrames,
      line,
      w,
      h,
      canvas,
      imageSizeFactor,
      id,
    );
    this.active = true;
  }

  checkCollisionWithPlayer() {
    //checa colisão com o player
    if (super.checkCollisionWithPlayer()) {
      // chama a função de colisão da classe super

      this.active = true;
      player.phisics.velocityY = -30;
      player.playerState.keyJumpIsUp = true;
      player.spriteState = player.selectAvatar() + "-jump";
    }
  }

  animate() {
    super.animate(); //pega a posição do position na superclasse
    if (
      this.active &&
      player.position.x < this.x + this.width &&
      player.position.x + player.spriteWidth > this.x
    ) {
      if (player.phisics.velocityY >= 5)
        player.phisics.velocityY = -Math.random() * 10;
      player.spriteState = player.selectAvatar() + "-jump";
    }
  }
}
