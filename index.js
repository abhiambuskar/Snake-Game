let inputDir = {x:0, y:0}
let score = 0;
let realscore = document.getElementById("score")
let realHighscore = document.getElementById("highBox")
let speed = 5;
let k = 5;
let highBoxval ;
let lastPaintTime = 0
let snakeArr = [
   {x:13,y:15}
]

let food = {
    x:9, y:10
}
//Game Functions

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return
    }
    lastPaintTime = ctime
    gameEngine();
}

function isCollide(snake){
    // if you pump into yourself
    for(let i = 1; i < snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    // If you bump into the wall
    if(snake[0].x >= 18 ||snake[0].x <= 0 || snake[0].y >= 18 ||snake[0].y <= 0){
        return true;
    }
}

function gameEngine(){
    if(snakeArr.length >= k){
        speed++;
        k = k*1.5;
        console.log(k);
    }
    //part 1 upating the snake array and food
    if(isCollide(snakeArr)){
        inputDir = {x:0, y:0};
        alert("Game Over, Press any key to play again")
        snakeArr = [{x:13, y:15}];
        score = 0;
    }

    // if you have eaten the food ,increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        score++;
        if(score > hiscoreval){
            hiscoreval = score
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML = "HighScore : "+ hiscoreval

        }
        realscore.innerHTML = "Score: " + score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y})
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b - a)*Math.random()), y: Math.round(a + (b - a)*Math.random())}
    }

    // Moving the snake

    for(let i = snakeArr.length - 2; i >= 0; i--){
        snakeArr[i + 1] = {...snakeArr[i]}
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //part 2 display snake and food
    //DISPLAY THE SNAKE
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        if(index === 0){
            snakeElement.classList.add('head')
        }else{
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)
    })

    //DISPLAY THE FOOD
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    board.appendChild(foodElement)

   // console.log(snakeArr)
}


let hiscoreval;
let hiscore = localStorage.getItem('hiscore')
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}else{
    hiscoreval = JSON.parse(hiscore)
    hiscoreBox.innerHTML = `HIGHSCORE : `+ hiscore
}
//OUR GAME STARTS HERE

window.requestAnimationFrame(main)
window.addEventListener('keydown', e =>{
    inputDir = {x:0, y:1}  // start the game
    switch(e.key){
        case "ArrowUp":
            inputDir.x = 0 ;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0 ;
            inputDir.y =  1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0 ;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
    
})
