const canvas = document.getElementById('canvas');

let playerName = document.querySelector('.nameInput');
let confirmButton = document.querySelector('.confirmButton');

let showPlayerName = "";

confirmButton.onclick = function () {
    showPlayerName = playerName.value;
    console.log(showPlayerName);
};



const ctx = canvas.getContext('2d');
const ground = new Image();
ground.src = "img/background.png";

const foodImg = new Image();
foodImg.src = "img/burger.png";

const bonusFoodImg = new Image();
bonusFoodImg.src = "img/egg.png";

let audioGameOver = new Audio();
audioGameOver.src = "audio/deadsecret.mp3";

let audioEat = new Audio();
audioEat.src = "audio/eat.wav";

let bonus = new Audio();
bonus.src = "audio/secret.mp3";
let bonus2 = new Audio();
bonus2.src = "audio/secret2.mp3";

let box = 32;
let score = 0;

//----------------FOOD-----------------//

let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

let bonusFood = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

//-------------SNAKE-------------//
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box,
};


//------------------Controls events--------------//
document.addEventListener("keydown", direction);

let dir;

function direction(event)   {
    if (event.keyCode == 37 && dir != "right") {
    dir = "left";
    } else if (event.keyCode == 38 && dir != "down") {
        dir = "up";
        } else if (event.keyCode == 39 && dir != "left") {
                dir = "right";
                } else if (event.keyCode == 40 && dir != "up") {
                    dir = "down";
                } else if (event.keyCode == 32 ) {
                    dir = "restart";
                }
}



//--------------------GAME OVER ELEMENTS------------//

function gameReload() {

   location.reload();
}

let reloadButton = function() {
    const gameOver = document.createElement('button');
        gameOver.innerHTML = 'Game Over';
        gameOver.className = 'btn btn-danger';
        gameOver.onclick = gameReload;
        document.body.append(gameOver);
        clearInterval(game);
        
};


const highScoreInput = function() {
    const highScore = document.createElement('input');
            highScore.type = 'text';
            highScore.placeholder = 'Ваши инициалы';
            highScore.className = '';
            document.body.append(highScore);
};

function eatTail(head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y) {
            reloadButton();
            highScoreInput();
            audioGameOver.play();
        }
    }
}



//--------------MAIN GAME FUMCTION----------------//

function drawGame() {
ctx.drawImage(ground, 0, 0);

ctx.drawImage(foodImg, food.x, food.y);

for(let i = 0; i < snake.length; i++) {
    ctx.strokeStyle = i == 0 ? "black" : "rgba(220, 0, 0, 1)";
    
    
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    
    
}
    ctx.fillStyle = "black";
    ctx.font = "23px Arial";
    ctx.fillText(`${showPlayerName} score ${score}`, box * 1, box * 2);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    let scoreCounter = score;
    if(scoreCounter == 25) {
        bonus.play();
        score++;
    }

    if(scoreCounter == 15) {
        bonus2.play();
        score++;
    }


    //function eatBonusFood() {
    //    if(scoreCounter == 10 || scoreCounter == 20 || scoreCounter == 30) {
    //        ctx.drawImage(bonusFoodImg, bonusFood.x, bonusFood.y);
    //    }
    //}
    //eatBonusFood(scoreCounter);

    //if(snakeX == bonusFood.x && snakeY == bonusFood.y) {
    //    score++;
    //    audioEat.play();
    //} 

    //if(snakeX < box || snakeX > box * 17 ||
    //     snakeY < 3 * box || snakeY > box * 17) {
    //        audioGameOver.play();
    //        reloadButton();
    //        highScoreInput();
    //}

    if(snakeX == food.x && snakeY == food.y) {
        score++;
        audioEat.play();
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
    } else {
        snake.pop();
    }

    if(dir == "left") {snakeX -= box;}
    if(dir == "right") {snakeX += box;}
    if(dir == "up") {snakeY -= box;}
    if(dir == "down") {snakeY += box;}
    if(dir == "restart") {gameReload();}

    if (snakeX<box) {snakeX = box*17;}
    if (snakeX>box*17) {snakeX = box;}
    if (snakeY<3*box) {snakeY = box*17;}
    if (snakeY>box*17) {snakeY = box*3;}

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);
}



let game = setInterval(drawGame, 100);



//zzzzz