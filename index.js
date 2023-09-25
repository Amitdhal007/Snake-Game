const PlayGround = document.querySelector(".game-board");
const current_scoreElement = document.getElementById("score");
const HighScoreElement = document.querySelector(".high-score");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let velocityX = 0;
let VelocityY = 0;
let snakebody = [];
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem("high-score") || 0;
HighScoreElement.innerText = `High Score: ${highScore}`;

//Changing food position by passing a random value between 1 - 30
const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
    // snakeX = Math.floor(Math.random() * 30) + 1;
    // snakeY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game-Over !!! please OK to replay...");
    location.reload();
}


const changeDirections = (e) => {
    // console.log(e);
    if(e.key === "ArrowUp" && VelocityY != 1){
        velocityX = 0;
        VelocityY = -1;
    }
    else if(e.key === "ArrowDown" && VelocityY != -1){
        velocityX = 0;
        VelocityY = 1;
    }
    else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        VelocityY = 0;
    }
    else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        VelocityY = 0;
    }
}


const initGame = () => {
    if(gameOver) return handleGameOver();
    let HtmlMarkUp = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // if snake eats food change the position
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        snakebody.push([foodX,foodY]); //pushing food position to snake body array
        score++;

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score",highScore);
        current_scoreElement.innerText = `Score: ${score}`;
        HighScoreElement.innerText = `High Score: ${highScore}`;

    }

    for (let i = snakebody.length - 1; i > 0; i--) {
        snakebody[i] = snakebody[i-1];
    }

    snakebody[0] = [snakeX,snakeY];

    // updating head position based on snake current velocity
    snakeX += velocityX;
    snakeY += VelocityY;

    //condition for game over i.e if snake collides with wall
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameOver = true;
    }

    for (let i = 0; i < snakebody.length; i++) {
        HtmlMarkUp += `<div class="snake" style="grid-area: ${snakebody[i][1]} / ${snakebody[i][0]}"></div>`;
        if(i !== 0 && snakebody[0][1] === snakebody[i][1] && snakebody[0][0] === snakebody[i][0]){
            gameOver = true;
        }
    }

    PlayGround.innerHTML = HtmlMarkUp;
}


changeFoodPosition();
setIntervalId = setInterval( initGame, 125);
document.addEventListener("keydown", changeDirections);