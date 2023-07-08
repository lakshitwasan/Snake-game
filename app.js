// CONSTANTS
let snakeVelocity = { x: 0, y: 0 };
let eatingSound = new Audio("music/food.mp3")
let overSound = new Audio("music/gameover.mp3")
let movingSound = new Audio("music/move.mp3")
let speed = 6;
let lastPaintTime = 2;
let snakeArray = [{ x: 13, y: 15 }]
let foodPosition = { x: 6, y: 7 }
let board = document.getElementById("board")
let score = 0;
let hiscoreBox = document.getElementById("hiscoreBox")
let scoreBox = document.getElementById("scoreBox")

// FUNCTIONS
function main(ctime) {
    window.requestAnimationFrame(main);
    // SETTING THE FRAME RATE SO THAT THE GAME IS PLAYABLE
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snakeArr) {
    // IF SNAKE EATS ITSELF
    for (let i = 1; i < snakeArray.length; i++) {
        if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
            return true;
        }
    }
    // COLLISION INTO THE BORDER WALL
    if (snakeArr[0].x > 18 || snakeArr[0].x < 0 || snakeArr[0].y > 18 || snakeArr[0].y < 0) {
        return true;
    }
};


function gameEngine() {
    // UPDATING THE SNAKE ARRAY
    if (isCollide(snakeArray)) {
        overSound.play();
        scoreBox.innerHTML = "Score: 0";
        snakeVelocity = { x: 0, y: 0 };
        alert("Game over, Press any key to start again");
        snakeArray = [{ x: 13, y: 15 }]
        score = 0;
    }

    // AFTER EATING THE FOOD , INCREMENT THE SCORE AND REGENERATE THE FOOD
    if (snakeArray[0].y === foodPosition.y && snakeArray[0].x === foodPosition.x) {
        snakeArray.unshift({ x: snakeArray[0].x + snakeVelocity.x, y: snakeArray[0].y + snakeVelocity.y })
        eatingSound.play()
        score += 1;
        if (score > hiscoreVal) {
            hiscoreVal = score;
            localStorage.setItem("highScore", JSON.stringify(hiscoreVal));
            hiscoreBox.innerHTML = "HighScore: " + hiscoreVal
        }
        scoreBox.innerHTML = "Score: " + score;
        let a = 1;
        let b = 18;
        foodPosition = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        // THIS IS HOW A RANDOM NUMBER IS GENERATED BETWEEN A AND B
    }

    // MOVING THE SNAKE
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = { ...snakeArray[i] };
    }

    snakeArray[0].x += snakeVelocity.x
    snakeArray[0].y += snakeVelocity.y


    // RENDERING SNAKE
    board.innerHTML = "";
    snakeArray.forEach((e, index) => {
        snake = document.createElement("div");
        snake.style.gridRowStart = e.y;
        snake.style.gridColumnStart = e.x;
        if (index == 0) {
            snake.classList.add("head")
        } else {
            snake.classList.add("snake")
        }
        board.appendChild(snake);
    });

    // RENDERING food
    food = document.createElement("div");
    food.style.gridRowStart = foodPosition.y;
    food.style.gridColumnStart = foodPosition.x;
    food.classList.add("food")
    board.appendChild(food);
}

// MAIN LOGIC
let hiscore = localStorage.getItem("highScore");
let hiscoreVal;
if (hiscore === null) {
    hiscoreVal = 0;
    localStorage.setItem("highScore", JSON.stringify(hiscoreVal));
} else {
    hiscoreVal = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HighScore: " + hiscore;
}

window.requestAnimationFrame(main);

window.addEventListener("keydown", e => {
    // STARTING THE GAME
    movingSound.play();
    switch (e.key) {
        case "ArrowUp":
            snakeVelocity.x = 0;
            snakeVelocity.y = -1;
            break;
        case "ArrowDown":
            snakeVelocity.x = 0;
            snakeVelocity.y = 1;
            break;
        case "ArrowLeft":
            snakeVelocity.x = -1;
            snakeVelocity.y = 0;
            break;
        case "ArrowRight":
            snakeVelocity.x = 1;
            snakeVelocity.y = 0;
            break;

        default:
            break;
    }
})