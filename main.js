const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width=600;
const canvasHeight =canvas.height= 600;
const playerImage= new Image(); 
playerImage.src = "shadow_dog.png";
const playerWidth = 575;
const playerHeight = 523;
const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  w: false,
  a: false,
  s: false,
  d: false
};
const playerState="run"

let gameFrames=0
const staggerFrames=2; // How many frames to wait before changing the sprite frame
const playerAnimation=[]
const animationState=[
    {name: 'idle', frames: 7}, 
    {name: 'jump', frames: 7}, 
    {name: 'fall',frames: 7},
    {name: 'run',frames: 9},
    {name: 'dizzy',frames: 11},
    {name: 'sit',frames: 5},
    {name: 'roll',frames: 7},
    {name: 'bite',frames: 7},
    {name: 'ko',frames: 12},
    {name: 'getHit',frames: 4}
]
animationState.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * playerWidth;
        frames.loc.push({x: positionX, y: index * playerHeight});
    }
    playerAnimation[state.name] = frames; // Store the frames in the playerAnimation object
});

function animate() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    //ctx.drawImage(sx,sy,sw,sh,playerImage, top, left, canvasWidth, canvasHeight);
    let position = Math.floor(gameFrames / staggerFrames) % playerAnimation[playerState].loc.length; // Calculate the current frame based on gameFrames and staggerFrames
    let frameX = position*playerWidth; 
    let frameY=playerAnimation[playerState].loc[position].y
    ctx.drawImage(playerImage,frameX,frameY,playerWidth,playerHeight, 0, 550, playerWidth/10, playerHeight/10);

    /*if(gameFrames % staggerFrames === 0) {
         if (frameX <6) {
        frameX++;
        
    } else {
        frameX = 0;
    }
    } 
     this method was inneficient because some image column length differ and would require me changing both frameY and the if statement*/
    
    gameFrames++;
    
    requestAnimationFrame(animate);
}
animate()
window.addEventListener('keydown', (e) => {
  if (keys.hasOwnProperty(e.key)) keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
  if (keys.hasOwnProperty(e.key)) keys[e.key] = false;
});


const canvas1 = document.getElementById('canvas1');
const ctx1= canvas1.getContext('2d');
const canvasWidth1 = canvas1.width=800;
const canvasHeight1 =canvas1.height= 700;
let gameSpeed = 15;
 const backgroundLayer1= new Image();
 backgroundLayer1.src= 'layer-1.png';
 const backgroundLayer2= new Image();
 backgroundLayer2.src= 'layer-2.png';
 const backgroundLayer3= new Image();
 backgroundLayer3.src= 'layer-3.png';
 const backgroundLayer4= new Image();
 backgroundLayer4.src= 'layer-4.png';
 const backgroundLayer5= new Image();
 backgroundLayer5.src= 'layer-5.png';
 
 class Layer{
    constructor(image, speedModifier){
        this.x=0;
        this.y=0;
        this.width=2400;
        this.height=700;
        this.x2=this.width;
        this.image=image;
        this.speedModifier=speedModifier;
        this.speed =gameSpeed*this.speedModifier;

    }
    update(){
        this.speed=gameSpeed*this.speedModifier;
        if(this.x< -2400){
            this.x=this.width+this.x2-this.speed;
        }
         if(this.x2< -2400){
            this.x2=this.width+this.x-this.speed;
        }
        this.x=Math.floor(this.x-this.speed);
        this.x2=Math.floor(this.x2-this.speed);
    
    }  
    draw(){
        ctx1.drawImage(this.image,this.x,this.y,this.width,this.height);
        ctx1.drawImage(this.image,this.x2,this.y,this.width,this.height);
    
    
    }
};
const layer1 =new Layer(backgroundLayer1,0.5)
const layer2 =new Layer(backgroundLayer2,1)
const layer3 =new Layer(backgroundLayer3,1.5)
const layer4 =new Layer(backgroundLayer4,0.5)
const layer5 =new Layer(backgroundLayer5,2)

const layers=[layer1,layer2,layer3,layer4,layer5]
 function backgroundAnimate(){
    ctx1.clearRect(0,0,canvasWidth1,canvasHeight1);
    layers.forEach((layer)=>{
        layer.update();
        layer.draw();
    })
    requestAnimationFrame(backgroundAnimate)
    
 }
 backgroundAnimate()