const myCanvas = document.getElementById("myCanvas");
const ctx = myCanvas.getContext("2d");

const racketSpeed = 5;
let player1coordY = 200; 
let player2coordY = 200;
let key = {};
let ball = {
    coordX: 350,
    coordY: 230,
    speedX: 3,
    speedY: 0,
};

document.addEventListener('keydown', e => key[e.keyCode] = true);
document.addEventListener('keyup', e => key[e.keyCode] = false);

draw();
setInterval(loop, 1000 / 60);

function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 720, 480);
    ctx.fillStyle = 'white';
    ctx.fillRect(10, player1coordY, 10, 80);
    ctx.fillRect(700, player2coordY, 10, 80);
    ctx.fillRect(ball.coordX, ball.coordY, 10, 10);
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

    if (ball.coordX < 20 || ball.coordX > 690) {
        if (ball.coordY > player1coordY && ball.coordY < player1coordY + 80 && ball.speedX < 0) {
            ball.speedX = -ball.speedX;
            ball.speedY = (ball.coordY - player1coordY - 40) * 0.1;
        }

        if (ball.coordY > player2coordY && ball.coordY < player2coordY + 80 && ball.speedX > 0) {
            ball.speedX = -ball.speedX;
            ball.speedY = (ball.coordY - player2coordY - 40) * 0.1;
        }
    }

    if (ball.coordY < 0 || ball.coordY > 470) {
        ball.speedY = -ball.speedY;
    }

    if (ball.coordX < 0 || ball.coordX > 720) {
        ball = {
            coordX: 350,
            coordY: 230,
            speedX: 3,
            speedY: 0
        }
    }
}