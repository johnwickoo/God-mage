const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width=600;
const canvasHeight =canvas.height= 600;
const playerImage= new Image(); 
playerImage.src = "shadow_dog.png";
const playerWidth = 575;
const playerHeight = 523;
const playerState="run"
let x=0
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
    ctx.drawImage(playerImage,frameX,frameY,playerWidth,playerHeight, x, 550, playerWidth/10, playerHeight/10);

    /*if(gameFrames % staggerFrames === 0) {
         if (frameX <6) {
        frameX++;
        
    } else {
        frameX = 0;
    }
    } 
     this method was inneficient because some image column length differ and would require me changing both frameY and the if statement*/
     x+=1
    gameFrames++;
    requestAnimationFrame(animate);
}
animate()