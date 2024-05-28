const myCanvas = document.getElementById("myCanvas");
const ctx = myCanvas.getContext("2d");

const racketSpeed = 20;
let player1coordY = 320; 
let player2coordY = 320;
let key = {};
let ball = {
    coordX: 640,
    coordY: 355,
    speedX: 10,
    speedY: 0,
};
let player1Score = 0;
let player2Score = 0;

document.addEventListener('keydown', e => key[e.keyCode] = true);
document.addEventListener('keyup', e => key[e.keyCode] = false);

draw();
setInterval(loop, 1000 / 60);

function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 1280, 720);
    ctx.fillStyle = 'white';
    ctx.fillRect(10, player1coordY, 10, 80);
    ctx.fillRect(1260, player2coordY, 10, 80);
    ctx.fillRect(ball.coordX, ball.coordY, 10, 10);
    ctx.font = "50px monospace";
    ctx.fillText(player1Score, 100, 60)
    ctx.fillText(player2Score, 1125, 60)
    requestAnimationFrame(draw);
}

function loop() {
    if (key[38]) {
        player2coordY = player2coordY - racketSpeed;
    }
    if (key[40]) {
        player2coordY = player2coordY + racketSpeed;
    }
    if (key[87]) {
        player1coordY = player1coordY - racketSpeed;
    }
    if (key[83]) {
        player1coordY = player1coordY + racketSpeed;
    }

    ball.coordX = ball.coordX + ball.speedX;
    ball.coordY = ball.coordY + ball.speedY;

    if (ball.coordX < 20 || ball.coordX > 1250) {
        // Player 1
        if (ball.coordY > player1coordY && ball.coordY < player1coordY + 80 && ball.speedX < 0) {
            ball.speedX = -ball.speedX;
            ball.speedY = (ball.coordY - player1coordY - 60) * 0.1;
        }
        // Player 2
        if (ball.coordY > player2coordY && ball.coordY < player2coordY + 80 && ball.speedX > 0) {
            ball.speedX = -ball.speedX;
            ball.speedY = (ball.coordY - player2coordY - 60) * 0.1;
        }
    }

    if (ball.coordY < 0 || ball.coordY > 710) {
        ball.speedY = -ball.speedY;
    }

    if (ball.coordX < 0) {
        player2Score++;
        ball = {
            coordX: 640,
            coordY: 355,
            speedX: 10,
            speedY: 0
        }
    }
    if (ball.coordX > 1280) {
        player1Score++;
        ball = {
            coordX: 640,
            coordY: 355,
            speedX: 10,
            speedY: 0
        }
    }
    console.log(ball.speedX);
    console.log(ball.coordX);
}