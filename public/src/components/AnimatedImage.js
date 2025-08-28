//classe mãe para todas as imagens animadas
import { frames, player} from "../main.js";
import { staggerFrames } from "../utils/constants.js";

export default class AnimatedImage {
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
    rotateAngle
  ) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.spriteFrames = spriteFrames;
    this.line = line;
    this.width = w;
    this.height = h;
    this.image = image;
    this.ctxAnimations = canvas;
    this.size = imageSizeFactor;
    this.offset = {
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    };
    this.hitbox = this.calculateHitbox();
    this.id = id;
    this.rotateAngle = rotateAngle;
  }

  checkCollisionWithPlayer() {
    //atualiza a hitbox do player
    player.playerHitbox = player.calculateHitbox();
    this.hitbox = this.calculateHitbox();

    //checa colisão com o player, retorna verdadeiro se colidiu
    if (
      player.playerHitbox.bottom >= this.hitbox.top &&
      player.playerHitbox.top <= this.hitbox.bottom + 20 && // + Tiles.height &&
      player.playerHitbox.right >= this.hitbox.left &&
      player.playerHitbox.left <= this.hitbox.right
    ) {
      return true;
    }
  }

  calculateHitbox() {
    //retorna as coordenadas da hitbox
    return {
      top: this.y + this.offset.top * this.size,
      bottom: this.y + this.height * this.size - this.offset.bottom * this.size,
      left: this.x + this.offset.left * this.size,
      right: this.x + this.width * this.size - this.offset.right * this.size,
    };
  }

  showImageBorder() {
    //mostra contorno na imagem
    this.ctxAnimations.strokeRect(
      this.x,
      this.y,
      this.width * this.size,
      this.height * this.size
    );
  }

  rotateImage() {
    //animação de imagem rotacionada

    let position = Math.floor(frames / staggerFrames) % this.spriteFrames;
    let frameX = position * this.width;
    let frameY = this.line * this.height;

    this.ctxAnimations.save(); // Salva o estado original do contexto
    this.ctxAnimations.translate(
      this.x + (this.width / 2) * this.size,
      this.y + (this.height / 2) * this.size
    ); // Ajusta o ponto de origem
    this.ctxAnimations.rotate((this.rotateAngle * Math.PI) / 180);

    //  this.ctxAnimations.scale(1, -1); // Inverte a escala horizontal
    this.ctxAnimations.drawImage(
      this.image,
      frameX,
      frameY,
      this.width,
      this.height,
      -32,
      -32, // Ajustado para o sistema de coordenadas transformado
      this.width * this.size,
      this.height * this.size
    );
    this.ctxAnimations.restore(); //Restaura o estado original
  }

  showCenterPoint() {
    this.ctxAnimations.beginPath(); // Inicia um novo caminho
    this.ctxAnimations.arc(
      this.x + (this.width / 2) * this.size,
      this.y + (this.height / 2) * this.size,
      5, //raio
      0,
      2 * Math.PI
    ); // Define o arco (círculo completo)
    this.ctxAnimations.fillStyle = "red"; // Cor do preenchimento
    this.ctxAnimations.fill(); // Preenche o círculo
  }

  animate() {
    let position = Math.floor(frames / staggerFrames) % this.spriteFrames;
    let frameX = position * this.width;
    let frameY = this.line * this.height;

    this.ctxAnimations.drawImage(
      this.image,
      frameX,
      frameY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width * this.size,
      this.height * this.size
    );

    //retirar comentario para mostrar contorno na imagem e centro da imagem
    //this.showImageBorder()
    //this.showCenterPoint()

    return position;
  }
}
