
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const button = document.getElementById("playagain");
const getRandomNumer = function (min, max) {
    "use strict";
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const on = document.getElementById("on");
const off = document.getElementById("off");



function Moon() {
    this.x = getRandomNumer(15, 800);
    this.y = getRandomNumer(-1, -50);
    this.speedY = 4;
    this.width = 50;
    this.height = 50;
    this.image = new Image();
    this.image.src = "./images/moon.png"
    this.update = function() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    this.move = function() {
        this.y += this.speedY
    }
    this.collide = function() {
            if (mySound.sound.ended == false) {
                mySound.sound.currentTime = 0
                mySound.play()
            }
            else {
                mySound.play()
            }

            score += 5;
            spec.pop()
    }
}


function Star() {
    this.x = getRandomNumer(15, 800);
    this.y = getRandomNumer(-1, -500);
    this.width = 40;
    this.height = 40;
    this.speedY = getRandomNumer(1, 6);
    this.image = new Image();
    this.image.src = "./images/star1.png";
    this.update = function () {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    };
    this.move = function () {
        this.y += this.speedY;
    };

}

function Jar() {
    this.x = canvas.width / 2;
    this.y = (canvas.height - 80);
    this.height = 80;
    this.width = 54;
    this.image = new Image();
    this.image.src = "./images/jar.png";
    this.update = function () {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        if (score > 20) {
                jar.image.src = "./images/jar1.png"
                if (score > 50) {
                    jar.image.src = "./images/jar2.png"
                    if (score > 80) {
                        jar.image.src = "./images/jar3.png"
                        if (score > 125) {
                            jar.image.src = "./images/jar4.png"
                        }
                    }
                }
        }
    };
}
let jar = new Jar();


function calculateMousePos(evt) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = evt.clientX - rect.left - root.scrollLeft;
    let mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    };
    this.stop = function () {
        this.sound.pause();
    };
}

let mySound = new Sound("./sounds/score.mp3");
let backSound = new Sound("./sounds/back.mp3")
backSound.sound.loop = "true"

on.addEventListener("click", function() {
    backSound.play()
})
off.addEventListener("click", function() {
    backSound.stop()
})



let score = 0;
let star_count = 0;
let star1 = new Star();
let star2 = new Star();
let star3 = new Star();
let star4 = new Star();
let star5 = new Star();
let star6 = new Star();

let stars = [star1, star2, star3, star4, star5, star6];
let missed = 0;

let spec = []
let moon;
let licznik = 20;

function moveMoon() {
    if (star_count == licznik && spec.length == 0) {
        moon = new Moon();
        spec = [moon];
        licznik += 20
    }
    for(let i = 0; i < spec.length; i++)
        if (spec.length != 0) {
            spec[i].update()
            spec[i].move()
            if ((spec[i].x + (spec[i].width/2) > jar.x && spec[i].x + (spec[i].width/2) < jar.x + jar.width) && (spec[i].y + (spec[i].height/2) > jar.y && spec[i].y + (spec[i].height/2) < canvas.height)) {
            spec[i].collide()
            }
            else if ((spec[i].x + (spec[i].width/2) < jar.x || spec[i].x + (spec[i].width/2) > jar.x + jar.width) && (spec[i].y + (spec[i].height/2) > canvas.height)) {
                spec.pop()
            }
        }
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 800, 20, 100, 100);
}
function moveStars() {
    for (let i = 0; i < stars.length; i++) {
        stars[i].update()
        stars[i].move()
        if ((stars[i].y >= canvas.height - jar.height) && ((stars[i].x + stars[i].width / 2) > jar.x && stars[i].x + (stars[i].width / 2) < jar.x + jar.width)) {
            if (mySound.sound.ended == false) {
                mySound.sound.currentTime = 0
                mySound.play()
            }
            else {
                mySound.play()
            }
            star_count += 1
            score += 1
            stars[i].y = getRandomNumer(-1, -10)
            stars[i].x = getRandomNumer(15, 850)
            if (score > 25) {
                stars[i].speedY = getRandomNumer(4, 7)
                if (score > 50) {
                    stars[i].speedY = getRandomNumer(5, 8)
                    if (score > 75) {
                        stars[i].speedY = getRandomNumer(6, 9)
                        if (score > 100) {
                            stars[i].speedY = getRandomNumer(7, 10)
                        }
                    }
                }
            }

            else {
                stars[i].speedY = getRandomNumer(3, 6)
            }
        }
        if (stars[i].y > canvas.height) {
            star_count += 1
            stars[i].y = getRandomNumer(-1, -500)
            stars[i].x = getRandomNumer(15, 850)
            stars[i].speedY = getRandomNumer(2, 6)
            missed += 1
            console.log(missed)
        }
    }
}

function drawGame() {
    jar.update();
    drawScore();
    moveStars();
    moveMoon();
}

function restart() {
    for (let i = 0; i < stars.length; i++) {
        stars[i].y = getRandomNumer(-5, -200);
        stars[i].update();
        stars[i].speedY = getRandomNumer(2, 6)
    }
    spec.pop();
    licznik = 20;
    star_count = 0;
    score = 0;
    missed = 0;
    jar.image.src = "./images/jar.png";
    backSound.sound.currentTime = 0;
}


function game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGame();
    if (missed > 10) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawScore();
        button.style.zIndex = "1";
        on.style.zIndex = "-1"
        off.style.zIndex = "-1"
        backSound.stop()
        return;
    }
    window.requestAnimationFrame(game);
}

function start() {
    canvas.addEventListener("mousemove", function (evt) {
        let mousePos = calculateMousePos(evt)
        jar.x = mousePos.x - (jar.width / 2)
    })
    button.addEventListener("click", function() {
        restart();
        button.style.zIndex = "-1";
        on.style.zIndex = "1"
        off.style.zIndex = "1"
        backSound.play()
        game()
    })


}

window.onload = start
