const spriteCoordinates = []

const positionAdjust = { //objeto com as informação de ajuste offset
    s5: { x: 96, y: 128  }
}

function createImage(){
    const image = new Image()
    return image
}

const ImagesInfo = [ //line é a linha onde esta presente os frames em um spritesheet

    {
        name: "ninjafrog",
        state: "idle",
        frames: 11,
        line: 0,
        width: 32,
        height: 32,
        image: "../public/assets/images/Main Characters/Ninja Frog/Idle (32x32).png",
        imageInstance: createImage()
    },
    {
        name: "ninjafrog", 
        state: "hit",
        frames: 7,
        line: 0,
        width: 32,
        height: 32,
        image: "../public/assets/images/Main Characters/Ninja Frog/hit (32x32).png",
        imageInstance: createImage()
    },
    {
        name: "ninjafrog", 
        state: "doublejump",
        frames: 6,
        line: 0,
        width: 32,
        height: 32,
        image: "../public/assets/images/Main Characters/Ninja Frog/Double Jump (32x32).png",
        imageInstance: createImage()
    },
    {
        name: "ninjafrog", 
        state: "walljump",
        frames: 5,
        line: 0,
        width: 32,
        height: 32,
        image: "../public/assets/images/Main Characters/Ninja Frog/Wall Jump (32x32).png",
        imageInstance: createImage()
    },
    {
        name: "ninjafrog", 
        state: "run",
        frames: 12,
        line: 0,
        width: 32,
        height: 32,
        image: "../public/assets/images/Main Characters/Ninja Frog/Run (32x32).png",
        imageInstance: createImage()
    },
    {
        name: "ninjafrog", 
        state: "run",
        frames: 12,
        line: 0,
        width: 32,
        height: 32,
        image: "../public/assets/images/Main Characters/Ninja Frog/Run (32x32).png",
        imageInstance: createImage()
    },
    {
        name: "ninjafrog", 
        state: "jump",
        frames: 1,
        line: 0,
        width: 32,
        height: 32,
        image: "../public/assets/images/Main Characters/Ninja Frog/Jump (32x32).png",
        imageInstance: createImage()
    },
    {
        name: "ninjafrog", 
        state: "fall",
        frames: 1,
        line: 0,
        width: 32,
        height: 32,
        image: "../public/assets/images/Main Characters/Ninja Frog/Fall (32x32).png",
        imageInstance: createImage()
    },
    {
        name: "ninjafrog", 
        state: "desappearing",
        frames: 6,
        line: 0,
        width: 32,
        height: 32,
        image: "../public/assets/images/Main Characters/Desappearing (96x96)2.png",
        imageInstance: createImage()
    },
    {
        name: "fruit", 
        state: "strawberry",
        frames: 17,
        line: 0,
        width: 32,
        height: 32,
        image: "../public/assets/images/items/Fruits/Strawberry.png",
        imageInstance: createImage()
    },
    {
        name: "fruit", 
        state: "pineapple",
        frames: 17,
        line: 0,
        width: 32,
        height: 32,
        image: "../public/assets/images/items/Fruits/Pineapple.png",
        imageInstance: createImage()
    },
    {
        name: "fruit", 
        state: "orange",
        frames: 17,
        line: 0,
        width: 32,
        height: 32,
        image: "../public/assets/images/items/Fruits/Orange.png",
        imageInstance: createImage()
    },
    {
        name: "fruit", 
        state: "apple",
        frames: 17,
        line: 0,
        width: 32,
        height: 32,
        image: "../public/assets/images/items/Fruits/Apple.png",
        imageInstance: createImage()
    },
    {
        name: "fruit", 
        state: "bananas",
        frames: 17,
        line: 0,
        width: 32,
        height: 32,
        image: "../public/assets/images/items/Fruits/Bananas.png",
        imageInstance: createImage()
    },
    {
        name: "fruit", 
        state: "cherries",
        frames: 17,
        line: 0,
        width: 32,
        height: 32,
        image: "../public/assets/images/items/Fruits/Cherries.png",
        imageInstance: createImage()
    },
    {
        name: "fruit", 
        state: "kiwi",
        frames: 17,
        line: 0,
        width: 32,
        height: 32,
        image: "../public/assets/images/items/Fruits/Kiwi.png",
        imageInstance: createImage()
    },
    {
        name: "fruit", 
        state: "melon",
        frames: 17,
        line: 0,
        width: 32,
        height: 32,
        image: "../public/assets/images/items/Fruits/Melon.png",
        imageInstance: createImage()
    },
    {
        name: "fruit", 
        state: "collected",
        frames: 6,
        line: 0,
        width: 32,
        height: 32,
        image: "../public/assets/images/items/Fruits/Collected.png",
        imageInstance: createImage()
    },
    {
        name: "checkpoint", 
        state: "idle",
        frames: 10,
        line: 0,
        width: 64,
        height: 64,
        image: "../public/assets/images/Items/Checkpoints/Checkpoint/Checkpoint (Flag Idle)(64x64).png",
        imageInstance: createImage()
    },
    {
        name: "checkpoint", 
        state: "out",
        frames: 26,
        line: 0,
        width: 64,
        height: 64,
        image: "../public/assets/images/Items/Checkpoints/Checkpoint/Checkpoint (Flag Out) (64x64).png",
        imageInstance: createImage()
    },
    {
        name: "checkpoint", 
        state: "noflag",
        frames: 1,
        line: 0,
        width: 64,
        height: 64,
        image: "../public/assets/images/Items/Checkpoints/Checkpoint/Checkpoint (No Flag).png",
        imageInstance: createImage()
    },
    {
        name: "box1", 
        state: "idle",
        frames: 1,
        line: 0,
        width: 28,
        height: 24,
        image: "../public/assets/images/Items/Boxes/Box1/Idle.png",
        imageInstance: createImage()
    },
    {
        name: "box2", 
        state: "idle",
        frames: 1,
        line: 0,
        width: 28,
        height: 24,
        image: "../public/assets/images/Items/Boxes/Box2/Idle.png",
        imageInstance: createImage()
    },
    {
        name: "box3", 
        state: "idle",
        frames: 1,
        line: 0,
        width: 28,
        height: 24,
        image: "../public/assets/images/Items/Boxes/Box3/Idle.png",
        imageInstance: createImage()
    },
    {
        name: "end", 
        state: "idle",
        frames: 1,
        line: 0,
        width: 64,
        height: 64,
        image: "../public/assets/images/Items/Checkpoints/End/End (Idle).png",
        imageInstance: createImage()
    },
    {
        name: "end", 
        state: "pressed",
        frames: 8,
        line: 0,
        width: 64,
        height: 64,
        image: "../public/assets/images/Items/Checkpoints/End/End (Pressed) (64x64).png",
        imageInstance: createImage()
    },
    {
        name: "start", 
        state: "idle",
        frames: 1,
        line: 0,
        width: 64,
        height: 64,
        image: "../public/assets/images/Items/Checkpoints/Start/Start (Idle).png",
        imageInstance: createImage()
    },
    {
        name: "start", 
        state: "moving",
        frames: 17,
        line: 0,
        width: 64,
        height: 64,
        image: "../public/assets/images/Items/Checkpoints/Start/Start (Moving) (64x64).png",
        imageInstance: createImage()
    },
    {
        name: "block", 
        state: "hitside",
        frames: 3,
        line: 0,
        width: 22,
        height: 22,
        image: "../public/assets/images/Traps/Blocks/HitSide (22x22).png",
        imageInstance: createImage()
    },
    {
        name: "block", 
        state: "hittop",
        frames: 3,
        line: 0,
        width: 22,
        height: 22,
        image: "../public/assets/images/Traps/Blocks/HitTop (22x22).png",
        imageInstance: createImage()
    },
    {
        name: "block", 
        state: "idle",
        frames: 1,
        line: 0,
        width: 22,
        height: 22,
        image: "../public/assets/images/Traps/Blocks/idle.png",
        imageInstance: createImage()
    },
    {
        name: "platform", 
        state: "off",
        frames: 1,
        line: 0,
        width: 32,
        height: 10,
        image: "../public/assets/images/Traps/Falling Platforms/Off.png",
        imageInstance: createImage()
    },
    {
        name: "platform", 
        state: "on",
        frames: 4,
        line: 0,
        width: 32,
        height: 10,
        image: "../public/assets/images/Traps/Falling Platforms/On (32x10).png",
        imageInstance: createImage()
    },
    {
        name: "fan", 
        state: "on",
        frames: 4,
        line: 0,
        width: 24,
        height: 8,
        image: "../public/assets/images/Traps/Fan/On (24x8).png",
        imageInstance: createImage()
    },
    {
        name: "fan", 
        state: "off",
        frames: 1,
        line: 0,
        width: 24,
        height: 8,
        image: "../public/assets/images/Traps/Fan/Off.png",
        imageInstance: createImage()
    },
    {
        name: "saw", 
        state: "on",
        frames: 8,
        line: 0,
        width: 38,
        height: 38,
        image: "../public/assets/images/Traps/Saw/On (38x38).png",
        imageInstance: createImage()
    },
    {
        name: "spykes", 
        state: "idle",
        frames: 1,
        line: 0,
        width: 16,
        height: 16,
        image: "../public/assets/images/Traps/Spikes/Idle.png",
        imageInstance: createImage()
    },
    {
        name: "trampoline", 
        state: "idle",
        frames: 1,
        line: 0,
        width: 28,
        height: 28,
        image: "../public/assets/images/Traps/Trampoline/Idle.png",
        imageInstance: createImage()
    },
    {
        name: "trampoline", 
        state: "jump",
        frames: 8,
        line: 0,
        width: 28,
        height: 28,
        image: "../public/assets/images/Traps/Trampoline/Jump (28x28).png",
        imageInstance: createImage()
    }
]




ImagesInfo.forEach((content,index) => { //função que cria um array contendo um chave de facil acesso e varias informações para manipulação da imagem
    
    const {width,height,line,image, frames: nFrames,name,imageInstance: imageInst} = ImagesInfo[index]
    let frames = {
        location: []
    }
    for(let i = 0; i < ImagesInfo[index].frames; i++)
    {
        let positionX = i*width
        let positionY = line*height
        frames.location.push({
            x: positionX, 
            y: positionY, 
            w: width, 
            h: height, 
            line: line,
            id: name,
            frames: nFrames,
            image: image,
            imageInstance: imageInst
            })
    }
   
    spriteCoordinates[`${content.name}-${content.state}`] = frames
})

export {spriteCoordinates,positionAdjust}