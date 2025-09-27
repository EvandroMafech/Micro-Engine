import { player } from "../engine/editor.js";
import { animatedImagesArray } from "../utils/constants.js";
import { spriteCoordinates } from "../utils/imageData.js";
import AnimatedImage from "./AnimatedImage.js";

export default class Box extends AnimatedImage {
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
    boxImageId,
    life,
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
      boxImageId,
      life,
    );
    this.activated = false;
    this.life = life;
    this.boxImageId = boxImageId;
  }

  checkCollisionWithPlayer() {
    if (this.activated || !super.checkCollisionWithPlayer()) return;

    const playerBottom =
      player.position.y + player.spriteHeight * player.spriteSize;
    const playerTop = player.position.y;
    const playerRight =
      player.position.x + player.spriteWidth * player.spriteSize;
    const playerLeft = player.position.x;

    const boxTop = this.y;
    const boxBottom = this.y + this.height * this.size;
    const boxRight = this.x + this.width * this.size;
    const boxLeft = this.x;

    // Colisão por baixo (player bate a cabeça) 
    if (
      player.phisics.velocityY < 0 &&
      playerTop <= boxBottom &&
      playerBottom >= boxBottom
    ) {
      this.triggerHit();
      player.phisics.velocityY = 10;
      player.playerState.isJumping = false;
      return;
    }

    //  Colisão por cima (player pisa no box) 
    if (
      player.phisics.velocityY > 0 &&
      playerBottom >= boxTop &&
      playerTop <= boxTop
    ) {
      this.triggerHit();
      player.phisics.velocityY = -10;
      player.playerState.isJumping = false;
      return;
    }

    // Colisão lateral 
    if (playerBottom > boxTop && playerTop < boxBottom) {
      if (playerRight > boxRight && playerLeft < boxRight) {
        player.leftBlocked = true;
        player.position.x += player.phisics.speed;
      } else if (playerLeft < boxLeft && playerRight > boxLeft) {
        player.rightBlocked = true;
        player.position.x -= player.phisics.speed;
      }
    }
  }

  triggerHit() {
    this.image.src = spriteCoordinates[`${this.id}-hit`].location[0].image;
    this.spriteFrames = spriteCoordinates[`${this.id}-hit`].location[0].frames;
    this.activated = true;
    this.life--;
    this.frameCounter = 0;
  }

  animate() {
    const position = super.animate();

    if (this.life <= 0) {
      this.destroy();
    }

    if (this.activated) {
      this.handleAnimation();
    }

    return position;
  }

  handleAnimation() {
    this.frameCounter++;
    if (this.frameCounter >= this.spriteFrames) {
      this.image.src = spriteCoordinates[`${this.id}-idle`].location[0].image;
      this.spriteFrames =
        spriteCoordinates[`${this.id}-idle`].location[0].frames;
      this.activated = false;
    }
  }

  destroy() {
    const index = animatedImagesArray.findIndex(
      (img) => img.boxImageId === this.boxImageId,
    );
    if (index !== -1) {
      animatedImagesArray.splice(index, 1);
    }
  }
}
