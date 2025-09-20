import { frames, player } from "../engine/editor.js";
import { staggerFrames } from "../utils/constants.js";
import AnimatedImage from "./AnimatedImage.js";
import { gameOverModal } from "../../editor/ui/interfaceButtons.js";
import { gameState } from "../../game/ui/gameState.js";

export default class Spikedball extends AnimatedImage {
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
    this.hit = false;
    this.origin = this.originPosition();
    this.direction = "right";
    this.time = 0;
    this.radious = 300;
    this.amplitude = 0.5 * Math.PI;
    this.phase = 0;
    this.gravity = 120;
    this.chain = new Image();
    this.chain.src = "public/assets/images/Traps/Spiked Ball/Chain.png";
  }

  originPosition() {
    return { x: this.x, y: this.y };
  }

  checkCollisionWithPlayer() {
    //checa colisão com o player
    if (super.checkCollisionWithPlayer()) {
      // chama a função de colisão da classe super
      //muda a animação do player
      this.hit = true;
      player.spriteState = player.selectAvatar() + "-desappearing";
      if (gameState.gameRunning == true) gameOverModal();
    }
  }

  animate() {
    super.animate();

    this.animateChain();

    const angularFrequency = Math.sqrt(this.gravity / this.radious); //W
    this.time += 0.04;

    this.x =
      -this.radious *
        Math.sin(
          this.amplitude * Math.cos(angularFrequency * this.time + this.phase),
        ) +
      this.origin.x;
    this.y =
      +this.radious *
        Math.cos(
          this.amplitude * Math.cos(angularFrequency * this.time + this.phase),
        ) +
      this.origin.y;
  }

  animateChain() {
    const image = this.chain;

    let position = Math.floor(frames / staggerFrames) % this.spriteFrames;
    let frameX = position * this.width;
    let frameY = this.line * this.height;

    const numberOfChains = Math.floor(this.radious / 20);
    let chainRadious = this.radious;

    for (let nChains = 0; nChains <= numberOfChains; nChains++) {
      let chainAngularFreq = Math.sqrt((chainRadious * 0.4) / chainRadious);

      const chainX =
        -chainRadious *
          Math.sin(
            this.amplitude *
              Math.cos(chainAngularFreq * this.time + this.phase),
          ) +
        this.origin.x +
        this.width / 1.3;
      const chainY =
        +chainRadious *
          Math.cos(
            this.amplitude *
              Math.cos(chainAngularFreq * this.time + this.phase),
          ) +
        this.origin.y;

      this.ctxAnimations.drawImage(
        image,
        frameX,
        frameY,
        this.width,
        this.height,
        chainX,
        chainY,
        this.width * this.size,
        this.height * this.size,
      ); //(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
      chainRadious -= 20;
    }
  }
}
