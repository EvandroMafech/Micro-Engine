export const spriteCoordinates = [];

export const positionAdjust = {
  //objeto com as informação de ajuste offset
  spykes: { x: 0, y: 0 },
  trampoline: { x: 10, y: 20 },
  fan: { x: 5, y: -40 },
  platform: { x: 15, y: 0 },
  fruit: { x: 15, y: 15 },
  spikedball: { x: 0, y: -15 },
  saw: { x: -8, y: -8 },
  box1: { x: 10, y: 5 },
  box2: { x: 10, y: 5 },
  box3: { x: 10, y: 5 },
  box: { x: 10, y: 5 },
  block: { x: 0, y: 0 },
  end: { x: 64, y: 128 },
  checkpoint: { x: 64, y: 128 },
  start: { x: 64, y: 128 },
};

function createImage(path) {
  const image = new Image();
  image.src = path
  return image;
}

const ImagesInfo = [
  {
    name: "ninjafrog",
    state: "idle",
    frames: 11,
    line: 0,
    width: 32,
    height: 32,
    image:
      "../public/assets/images/Main Characters/Ninja Frog/Idle (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Ninja Frog/Idle (32x32).png"
    ),
  },
  {
    name: "ninjafrog",
    state: "hit",
    frames: 7,
    line: 0,
    width: 32,
    height: 32,
    image: "../public/assets/images/Main Characters/Ninja Frog/hit (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Ninja Frog/hit (32x32).png"
    ),
  },
  {
    name: "ninjafrog",
    state: "doublejump",
    frames: 6,
    line: 0,
    width: 32,
    height: 32,
    image:
      "../public/assets/images/Main Characters/Ninja Frog/Double Jump (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Ninja Frog/Double Jump (32x32).png"
    ),
  },
  {
    name: "ninjafrog",
    state: "walljump",
    frames: 5,
    line: 0,
    width: 32,
    height: 32,
    image:
      "../public/assets/images/Main Characters/Ninja Frog/Wall Jump (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Ninja Frog/Wall Jump (32x32).png"
    ),
  },
  {
    name: "ninjafrog",
    state: "run",
    frames: 12,
    line: 0,
    width: 32,
    height: 32,
    image: "../public/assets/images/Main Characters/Ninja Frog/Run (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Ninja Frog/Run (32x32).png"
    ),
  },
  {
    name: "ninjafrog",
    state: "run",
    frames: 12,
    line: 0,
    width: 32,
    height: 32,
    image: "../public/assets/images/Main Characters/Ninja Frog/Run (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Ninja Frog/Run (32x32).png"
    ),
  },
  {
    name: "ninjafrog",
    state: "jump",
    frames: 1,
    line: 0,
    width: 32,
    height: 32,
    image:
      "../public/assets/images/Main Characters/Ninja Frog/Jump (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Ninja Frog/Jump (32x32).png"
    ),
  },
  {
    name: "ninjafrog",
    state: "fall",
    frames: 1,
    line: 0,
    width: 32,
    height: 32,
    image:
      "../public/assets/images/Main Characters/Ninja Frog/Fall (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Ninja Frog/Fall (32x32).png"
    ),
  },
  {
    name: "ninjafrog",
    state: "desappearing",
    frames: 6,
    line: 0,
    width: 32,
    height: 32,
    image: "../public/assets/images/Main Characters/Desappearing (96x96)2.png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Desappearing (96x96)2.png"
    ),
  },
  {
    name: "maskdude",
    state: "idle",
    frames: 11,
    line: 0,
    width: 32,
    height: 32,
    image: "../public/assets/images/Main Characters/Mask Dude/Idle (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Mask Dude/Idle (32x32).png"
    ),
  },
  {
    name: "maskdude",
    state: "hit",
    frames: 7,
    line: 0,
    width: 32,
    height: 32,
    image: "../public/assets/images/Main Characters/Mask Dude/hit (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Mask Dude/hit (32x32).png"
    ),
  },
  {
    name: "maskdude",
    state: "doublejump",
    frames: 6,
    line: 0,
    width: 32,
    height: 32,
    image:
      "../public/assets/images/Main Characters/Mask Dude/Double Jump (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Mask Dude/Double Jump (32x32).png"
    ),
  },
  {
    name: "maskdude",
    state: "walljump",
    frames: 5,
    line: 0,
    width: 32,
    height: 32,
    image:
      "../public/assets/images/Main Characters/Mask Dude/Wall Jump (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Mask Dude/Wall Jump (32x32).png"
    ),
  },
  {
    name: "maskdude",
    state: "run",
    frames: 12,
    line: 0,
    width: 32,
    height: 32,
    image: "../public/assets/images/Main Characters/Mask Dude/Run (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Mask Dude/Run (32x32).png"
    ),
  },
  {
    name: "maskdude",
    state: "run",
    frames: 12,
    line: 0,
    width: 32,
    height: 32,
    image: "../public/assets/images/Main Characters/Mask Dude/Run (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Mask Dude/Run (32x32).png"
    ),
  },
  {
    name: "maskdude",
    state: "jump",
    frames: 1,
    line: 0,
    width: 32,
    height: 32,
    image: "../public/assets/images/Main Characters/Mask Dude/Jump (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Mask Dude/Jump (32x32).png"
    ),
  },
  {
    name: "maskdude",
    state: "fall",
    frames: 1,
    line: 0,
    width: 32,
    height: 32,
    image: "../public/assets/images/Main Characters/Mask Dude/Fall (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Mask Dude/Fall (32x32).png"
    ),
  },
  {
    name: "maskdude",
    state: "desappearing",
    frames: 6,
    line: 0,
    width: 32,
    height: 32,
    image: "../public/assets/images/Main Characters/Desappearing (96x96)2.png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Desappearing (96x96)2.png"
    ),
  },
  {
    name: "pinkman",
    state: "idle",
    frames: 11,
    line: 0,
    width: 32,
    height: 32,
    image: "../public/assets/images/Main Characters/Pink Man/Idle (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Pink Man/Idle (32x32).png"
    ),
  },
  {
    name: "pinkman",
    state: "hit",
    frames: 7,
    line: 0,
    width: 32,
    height: 32,
    image: "../public/assets/images/Main Characters/Pink Man/hit (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Pink Man/hit (32x32).png"
    ),
  },
  {
    name: "pinkman",
    state: "doublejump",
    frames: 6,
    line: 0,
    width: 32,
    height: 32,
    image:
      "../public/assets/images/Main Characters/Pink Man/Double Jump (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Pink Man/Double Jump (32x32).png"
    ),
  },
  {
    name: "pinkman",
    state: "walljump",
    frames: 5,
    line: 0,
    width: 32,
    height: 32,
    image:
      "../public/assets/images/Main Characters/Pink Man/Wall Jump (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Pink Man/Wall Jump (32x32).png"
    ),
  },
  {
    name: "pinkman",
    state: "run",
    frames: 12,
    line: 0,
    width: 32,
    height: 32,
    image: "../public/assets/images/Main Characters/Pink Man/Run (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Pink Man/Run (32x32).png"
    ),
  },
  {
    name: "pinkman",
    state: "run",
    frames: 12,
    line: 0,
    width: 32,
    height: 32,
    image: "../public/assets/images/Main Characters/Pink Man/Run (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Pink Man/Run (32x32).png"
    ),
  },
  {
    name: "pinkman",
    state: "jump",
    frames: 1,
    line: 0,
    width: 32,
    height: 32,
    image: "../public/assets/images/Main Characters/Pink Man/Jump (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Pink Man/Jump (32x32).png"
    ),
  },
  {
    name: "pinkman",
    state: "fall",
    frames: 1,
    line: 0,
    width: 32,
    height: 32,
    image: "../public/assets/images/Main Characters/Pink Man/Fall (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Pink Man/Fall (32x32).png"
    ),
  },
  {
    name: "pinkman",
    state: "desappearing",
    frames: 6,
    line: 0,
    width: 32,
    height: 32,
    image: "../public/assets/images/Main Characters/Desappearing (96x96)2.png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Desappearing (96x96)2.png"
    ),
  },
  {
    name: "virtualguy",
    state: "idle",
    frames: 11,
    line: 0,
    width: 32,
    height: 32,
    image:
      "../public/assets/images/Main Characters/Virtual Guy/Idle (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Virtual Guy/Idle (32x32).png"
    ),
  },
  {
    name: "virtualguy",
    state: "hit",
    frames: 7,
    line: 0,
    width: 32,
    height: 32,
    image:
      "../public/assets/images/Main Characters/Virtual Guy/hit (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Virtual Guy/hit (32x32).png"
    ),
  },
  {
    name: "virtualguy",
    state: "doublejump",
    frames: 6,
    line: 0,
    width: 32,
    height: 32,
    image:
      "../public/assets/images/Main Characters/Virtual Guy/Double Jump (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Virtual Guy/Double Jump (32x32).png"
    ),
  },
  {
    name: "virtualguy",
    state: "walljump",
    frames: 5,
    line: 0,
    width: 32,
    height: 32,
    image:
      "../public/assets/images/Main Characters/Virtual Guy/Wall Jump (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Virtual Guy/Wall Jump (32x32).png"
    ),
  },
  {
    name: "virtualguy",
    state: "run",
    frames: 12,
    line: 0,
    width: 32,
    height: 32,
    image:
      "../public/assets/images/Main Characters/Virtual Guy/Run (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Virtual Guy/Run (32x32).png"
    ),
  },
  {
    name: "virtualguy",
    state: "run",
    frames: 12,
    line: 0,
    width: 32,
    height: 32,
    image:
      "../public/assets/images/Main Characters/Virtual Guy/Run (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Virtual Guy/Run (32x32).png"
    ),
  },
  {
    name: "virtualguy",
    state: "jump",
    frames: 1,
    line: 0,
    width: 32,
    height: 32,
    image:
      "../public/assets/images/Main Characters/Virtual Guy/Jump (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Virtual Guy/Jump (32x32).png"
    ),
  },
  {
    name: "virtualguy",
    state: "fall",
    frames: 1,
    line: 0,
    width: 32,
    height: 32,
    image:
      "../public/assets/images/Main Characters/Virtual Guy/Fall (32x32).png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Virtual Guy/Fall (32x32).png"
    ),
  },
  {
    name: "virtualguy",
    state: "desappearing",
    frames: 6,
    line: 0,
    width: 32,
    height: 32,
    image: "../public/assets/images/Main Characters/Desappearing (96x96)2.png",
    imageInstance: createImage(
      "../public/assets/images/Main Characters/Desappearing (96x96)2.png"
    ),
  },

  {
    name: "fruit",
    state: "strawberry",
    frames: 17,
    line: 0,
    width: 32,
    height: 32,
    image: "../public/assets/images/Items/Fruits/Strawberry.png",
    imageInstance: createImage(
      "../public/assets/images/Items/Fruits/Strawberry.png"
    ),
  },
  {
    name: "fruit",
    state: "pineapple",
    frames: 17,
    line: 0,
    width: 32,
    height: 32,
    image: "../public/assets/images/Items/Fruits/Pineapple.png",
    imageInstance: createImage(
      "../public/assets/images/Items/Fruits/Pineapple.png"
    ),
  },
  {
    name: "fruit",
    state: "orange",
    frames: 17,
    line: 0,
    width: 32,
    height: 32,
    image: "../public/assets/images/Items/Fruits/Orange.png",
    imageInstance: createImage(
      "../public/assets/images/Items/Fruits/Orange.png"
    ),
  },
  {
    name: "fruit",
    state: "apple",
    frames: 17,
    line: 0,
    width: 32,
    height: 32,
    image: "../public/assets/images/Items/Fruits/Apple.png",
    imageInstance: createImage(
      "../public/assets/images/Items/Fruits/Apple.png"
    ),
  },
  {
    name: "fruit",
    state: "bananas",
    frames: 17,
    line: 0,
    width: 32,
    height: 32,
    image: "../public/assets/images/Items/Fruits/Bananas.png",
    imageInstance: createImage(
      "../public/assets/images/Items/Fruits/Bananas.png"
    ),
  },
  {
    name: "fruit",
    state: "cherries",
    frames: 17,
    line: 0,
    width: 32,
    height: 32,
    image: "../public/assets/images/Items/Fruits/Cherries.png",
    imageInstance: createImage(
      "../public/assets/images/Items/Fruits/Cherries.png"
    ),
  },
  {
    name: "fruit",
    state: "kiwi",
    frames: 17,
    line: 0,
    width: 32,
    height: 32,
    image: "../public/assets/images/Items/Fruits/Kiwi.png",
    imageInstance: createImage("../public/assets/images/Items/Fruits/Kiwi.png"),
  },
  {
    name: "fruit",
    state: "melon",
    frames: 17,
    line: 0,
    width: 32,
    height: 32,
    image: "../public/assets/images/Items/Fruits/Melon.png",
    imageInstance: createImage(
      "../public/assets/images/Items/Fruits/Melon.png"
    ),
  },
  {
    name: "fruit",
    state: "collected",
    frames: 6,
    line: 0,
    width: 32,
    height: 32,
    image: "../public/assets/images/Items/Fruits/Collected.png",
    imageInstance: createImage(
      "../public/assets/images/Items/Fruits/Collected.png"
    ),
  },
  {
    name: "checkpoint",
    state: "idle",
    frames: 10,
    line: 0,
    width: 64,
    height: 64,
    image:
      "../public/assets/images/Items/Checkpoints/Checkpoint/Checkpoint (Flag Idle)(64x64).png",
    imageInstance: createImage(
      "../public/assets/images/Items/Checkpoints/Checkpoint/Checkpoint (Flag Idle)(64x64).png"
    ),
  },
  {
    name: "checkpoint",
    state: "out",
    frames: 26,
    line: 0,
    width: 64,
    height: 64,
    image:
      "../public/assets/images/Items/Checkpoints/Checkpoint/Checkpoint (Flag Out) (64x64).png",
    imageInstance: createImage(
      "../public/assets/images/Items/Checkpoints/Checkpoint/Checkpoint (Flag Out) (64x64).png"
    ),
  },
  {
    name: "checkpoint",
    state: "noflag",
    frames: 1,
    line: 0,
    width: 64,
    height: 64,
    image:
      "../public/assets/images/Items/Checkpoints/Checkpoint/Checkpoint (No Flag).png",
    imageInstance: createImage(
      "../public/assets/images/Items/Checkpoints/Checkpoint/Checkpoint (No Flag).png"
    ),
  },
  {
    name: "box1",
    state: "idle",
    frames: 1,
    line: 0,
    width: 28,
    height: 24,
    image: "../public/assets/images/Items/Boxes/Box1/Idle.png",
    imageInstance: createImage(
      "../public/assets/images/Items/Boxes/Box1/Idle.png"
    ),
  },
  {
    name: "box1",
    state: "hit",
    frames: 3,
    line: 0,
    width: 28,
    height: 24,
    image: "../public/assets/images/Items/Boxes/Box1/Hit (28x24).png",
    imageInstance: createImage(
      "../public/assets/images/Items/Boxes/Box1/Hit (28x24).png"
    ),
  },
  {
    name: "box2",
    state: "idle",
    frames: 1,
    line: 0,
    width: 28,
    height: 24,
    image: "../public/assets/images/Items/Boxes/Box2/Idle.png",
    imageInstance: createImage(
      "../public/assets/images/Items/Boxes/Box2/Idle.png"
    ),
  },
  {
    name: "box2",
    state: "hit",
    frames: 4,
    line: 0,
    width: 28,
    height: 24,
    image: "../public/assets/images/Items/Boxes/Box2/Hit (28x24).png",
    imageInstance: createImage(
      "../public/assets/images/Items/Boxes/Box2/Hit (28x24).png"
    ),
  },
  {
    name: "box3",
    state: "idle",
    frames: 1,
    line: 0,
    width: 28,
    height: 24,
    image: "../public/assets/images/Items/Boxes/Box3/Idle.png",
    imageInstance: createImage(
      "../public/assets/images/Items/Boxes/Box3/Idle.png"
    ),
  },
  {
    name: "box3",
    state: "hit",
    frames: 2,
    line: 0,
    width: 28,
    height: 24,
    image: "../public/assets/images/Items/Boxes/Box3/Hit (28x24).png",
    imageInstance: createImage(
      "../public/assets/images/Items/Boxes/Box3/Hit (28x24).png"
    ),
  },
  {
    name: "end",
    state: "idle",
    frames: 1,
    line: 0,
    width: 64,
    height: 64,
    image: "../public/assets/images/Items/Checkpoints/End/End (Idle).png",
    imageInstance: createImage(
      "../public/assets/images/Items/Checkpoints/End/End (Idle).png"
    ),
  },
  {
    name: "end",
    state: "pressed",
    frames: 8,
    line: 0,
    width: 64,
    height: 64,
    image:
      "../public/assets/images/Items/Checkpoints/End/End (Pressed) (64x64).png",
    imageInstance: createImage(
      "../public/assets/images/Items/Checkpoints/End/End (Pressed) (64x64).png"
    ),
  },
  {
    name: "start",
    state: "idle",
    frames: 1,
    line: 0,
    width: 64,
    height: 64,
    image: "../public/assets/images/Items/Checkpoints/Start/Start (Idle).png",
    imageInstance: createImage(
      "../public/assets/images/Items/Checkpoints/Start/Start (Idle).png"
    ),
  },
  {
    name: "start",
    state: "moving",
    frames: 17,
    line: 0,
    width: 64,
    height: 64,
    image:
      "../public/assets/images/Items/Checkpoints/Start/Start (Moving) (64x64).png",
    imageInstance: createImage(
      "../public/assets/images/Items/Checkpoints/Start/Start (Moving) (64x64).png"
    ),
  },
  {
    name: "block",
    state: "hit",
    frames: 3,
    line: 0,
    width: 22,
    height: 22,
    image: "../public/assets/images/Traps/Blocks/HitTop (22x22).png",
    imageInstance: createImage(
      "../public/assets/images/Traps/Blocks/HitTop (22x22).png"
    ),
  },
  {
    name: "block",
    state: "idle",
    frames: 1,
    line: 0,
    width: 22,
    height: 22,
    image: "../public/assets/images/Traps/Blocks/Idle.png",
    imageInstance: createImage("../public/assets/images/Traps/Blocks/Idle.png"),
  },
  {
    name: "platform",
    state: "off",
    frames: 1,
    line: 0,
    width: 32,
    height: 10,
    image: "../public/assets/images/Traps/Falling Platforms/Off.png",
    imageInstance: createImage(
      "../public/assets/images/Traps/Falling Platforms/Off.png"
    ),
  },
  {
    name: "platform",
    state: "on",
    frames: 4,
    line: 0,
    width: 32,
    height: 10,
    image: "../public/assets/images/Traps/Falling Platforms/On (32x10).png",
    imageInstance: createImage(
      "../public/assets/images/Traps/Falling Platforms/On (32x10).png"
    ),
  },
  {
    name: "fan",
    state: "on",
    frames: 4,
    line: 0,
    width: 24,
    height: 8,
    image: "../public/assets/images/Traps/Fan/On (24x8).png",
    imageInstance: createImage(
      "../public/assets/images/Traps/Fan/On (24x8).png"
    ),
  },
  {
    name: "fan",
    state: "off",
    frames: 1,
    line: 0,
    width: 24,
    height: 8,
    image: "../public/assets/images/Traps/Fan/Off.png",
    imageInstance: createImage("../public/assets/images/Traps/Fan/Off.png"),
  },
  {
    name: "saw",
    state: "on",
    frames: 8,
    line: 0,
    width: 38,
    height: 38,
    image: "../public/assets/images/Traps/Saw/On (38x38).png",
    imageInstance: createImage(
      "../public/assets/images/Traps/Saw/On (38x38).png"
    ),
  },
  {
    name: "spykes",
    state: "idle",
    frames: 1,
    line: 0,
    width: 16,
    height: 16,
    image: "../public/assets/images/Traps/Spikes/Idle.png",
    imageInstance: createImage("../public/assets/images/Traps/Spikes/Idle.png"),
  },
  {
    name: "trampoline",
    state: "idle",
    frames: 1,
    line: 0,
    width: 28,
    height: 28,
    image: "../public/assets/images/Traps/Trampoline/Idle.png",
    imageInstance: createImage(
      "../public/assets/images/Traps/Trampoline/Idle.png"
    ),
  },
  {
    name: "trampoline",
    state: "jump",
    frames: 8,
    line: 0,
    width: 28,
    height: 28,
    image: "../public/assets/images/Traps/Trampoline/Jump (28x28).png",
    imageInstance: createImage(
      "../public/assets/images/Traps/Trampoline/Jump (28x28).png"
    ),
  },
  {
    name: "spikedball",
    state: "chained",
    frames: 1,
    line: 0,
    width: 28,
    height: 28,
    image: "../public/assets/images/Traps/Spiked Ball/Spiked Ball.png",
    imageInstance: createImage(
      "../public/assets/images/Traps/Spiked Ball/Spiked Ball.png"
    ),
  },
];

ImagesInfo.forEach((content, index) => {
  //função que cria um array contendo um chave de facil acesso e varias informações para manipulação da imagem

  const {
    width,
    height,
    line,
    image,
    frames: nFrames,
    name,
    imageInstance: imageInst,
  } = ImagesInfo[index];
  let frames = {
    location: [],
  };
  for (let i = 0; i < ImagesInfo[index].frames; i++) {
    let positionX = i * width;
    let positionY = line * height;
    frames.location.push({
      x: positionX,
      y: positionY,
      w: width,
      h: height,
      line: line,
      id: name,
      frames: nFrames,
      image: image,
      imageInstance: imageInst,
    });
  }

  spriteCoordinates[`${content.name}-${content.state}`] = frames;
});
