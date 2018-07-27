var direction;
var lastDirection;
var pieceX;
var pieceY;
var interval;
var container = document.getElementById('PlayArea');
var table = document.getElementById("table");
var baseX;
var baseY;
var lastX;
var lastY;
var bodySize;
var body = new Array(530);
var speed = 200;
var difficultySpeed = 200;
var gameIsOver = false;
radioGlow(3);

document.getElementById("PlayButton").addEventListener("click", function() {
    clearInterval(interval);
    direction = 1;
    lastDirection = 1;
    baseX = 0;
    baseY = 0;
    lastX = 0;
    lastY = 0;
    bodySize = 0;
    gameIsOver = false;
    while (container.hasChildNodes())
        container.removeChild(container.lastChild);

    var head = document.createElement('div');
    head.id = "head";
    container.appendChild(head);
    var btns = document.getElementsByName('difficulty');

    for (var i=0; i < btns.length; i++) {
        if (btns[i].checked) {
            if(btns[i].value === "e")
                difficultySpeed = 250;
            else if(btns[i].value === "n")
                difficultySpeed = 200;
            else if(btns[i].value === "h")
                difficultySpeed = 100;
            else
                difficultySpeed = 50;
            break;
        }
    }
    speed = difficultySpeed;
    start();
    newPiece();
});

function move() {
    var head = document.getElementById("head");
    if(direction === 0) {
        if(baseY <= 0)
            gameOver();
        else
        {
            lastX = baseX;
            lastY = baseY;
            baseY = baseY-20;
            if(baseX === pieceX && baseY === pieceY)
                addBody();
            else
                updateBody();

            head.style.top = baseY+'px';
            collisionCheck();
        }
        lastDirection = direction;
        head.style.borderRadius = "8px 8px 0px 0px";
    }
    else if(direction === 1) {
        if(baseX === 460)
            gameOver();
        else {
            lastX = baseX;
            lastY = baseY;
            baseX = baseX+20;
            if(baseX === pieceX && baseY === pieceY)
                addBody();
            else
                updateBody();

            head.style.left = baseX+'px';
            collisionCheck();
        }
        lastDirection = direction;
        head.style.borderRadius = "0px 8px 8px 0px";
    }
    else if(direction === 2) {
        if(baseY === 460)
            gameOver();
        else {
            lastX = baseX;
            lastY = baseY;
            baseY = baseY+20;
            if(baseX === pieceX && baseY === pieceY)
                addBody();
            else
                updateBody();

            head.style.top = baseY+'px';
            collisionCheck();
        }
        lastDirection = direction;
        head.style.borderRadius = "0px 0px 8px 8px";
    }
    else if(direction === 3) {
        if(baseX <= 0)
            gameOver();
        else {
            lastX = baseX;
            lastY = baseY;
            baseX = baseX-20;
            if(baseX === pieceX && baseY === pieceY)
                addBody();
            else
                updateBody();

            head.style.left = baseX+'px';
            collisionCheck();
        }
        lastDirection = direction;
        head.style.borderRadius = "8px 0px 0px 8px";
    }
}

function start() {
    interval = setInterval(function() {move();}, speed);
}

function gameOver() {
    clearInterval(interval);
    var score = bodySize*10;
    gameIsOver = true;
    window.alert("Game Over\nFinal Score: " + score);
}

function newPiece() {
    if(bodySize > 0)
        container.removeChild(document.getElementById("piece"));

    var noConflicts;
    while(true) {
        noConflicts = true;
        pieceX = Math.floor(Math.random() * 23) * 20;
        pieceY = Math.floor(Math.random() * 23) * 20;
        if(pieceX === baseX && pieceY === baseY)
            continue;

        for(var i=0; i<bodySize; i++) {
            if(body[i].x === pieceX && body[i].y === pieceY) {
                noConflicts = false;
                break;
            }
        }
        if(noConflicts)
            break;
    }
    var piece = document.createElement('div');
    piece.id = "piece";
    piece.style.top = pieceY + 'px';
    piece.style.left = pieceX + 'px';
    container.appendChild(piece);
}

function addBody() {
    var tail = document.createElement('div');
    tail.id = "tail";
    tail.style.top = lastY + 'px';
    tail.style.left = lastX + 'px';
    container.appendChild(tail);
    body[bodySize] = {div: tail, x: lastX, y: lastY};
    bodySize++;
    updateCorners();
    newPiece();
}

function updateBody(){
    var i;
    for(i=0; i<bodySize-1; i++) {
        body[i].y = body[i+1].y;
        body[i].x = body[i+1].x;
        body[i].div.style.top = body[i].y + 'px';
        body[i].div.style.left = body[i].x + 'px';
    }
    if(bodySize > 0) {
        body[bodySize-1].y = lastY;
        body[bodySize-1].x = lastX;
        body[bodySize-1].div.style.top = lastY + 'px';
        body[bodySize-1].div.style.left = lastX + 'px';
    }
    updateCorners();
}

function updateCorners() {
    if(bodySize > 1) {
        if(body[bodySize-2].x !== baseX && body[bodySize-2].y !== baseY) {
            if((body[bodySize-2].x > baseX && body[bodySize-2].y > baseY && body[bodySize-1].y === baseY) ||
               (body[bodySize-2].x < baseX && body[bodySize-2].y < baseY && body[bodySize-1].x === baseX)) {
                body[bodySize-1].div.style.borderRadius = "0px 8px 0px 0px";
            }
            else if((body[bodySize-2].x > baseX && body[bodySize-2].y < baseY && body[bodySize-1].y === baseY) ||
                    (body[bodySize-2].x < baseX && body[bodySize-2].y > baseY && body[bodySize-1].x === baseX)) {
                body[bodySize-1].div.style.borderRadius = "0px 0px 8px 0px";
            }
            else if((body[bodySize-2].x > baseX && body[bodySize-2].y > baseY && body[bodySize-1].x === baseX) ||
                    (body[bodySize-2].x < baseX && body[bodySize-2].y < baseY && body[bodySize-1].y === baseY)) {
                body[bodySize-1].div.style.borderRadius = "0px 0px 0px 8px";
            }
            else
                body[bodySize-1].div.style.borderRadius = "8px 0px 0px 0px";
        }
        else
            body[bodySize-1].div.style.borderRadius = "";
    }
    for(i=1; i<bodySize-1; i++) {
        if(body[i-1].x !== body[i+1].x && body[i-1].y !== body[i+1].y) {
            if((body[i-1].x > body[i+1].x && body[i-1].y > body[i+1].y && body[i].y === body[i+1].y) ||
               (body[i-1].x < body[i+1].x && body[i-1].y < body[i+1].y && body[i].x === body[i+1].x)) {
                body[i].div.style.borderRadius = "0px 8px 0px 0px";
            }
            else if((body[i-1].x > body[i+1].x && body[i-1].y < body[i+1].y && body[i].y === body[i+1].y) ||
                    (body[i-1].x < body[i+1].x && body[i-1].y > body[i+1].y && body[i].x === body[i+1].x)) {
                body[i].div.style.borderRadius = "0px 0px 8px 0px";
            }
            else if((body[i-1].x > body[i+1].x && body[i-1].y > body[i+1].y && body[i].x === body[i+1].x) ||
                    (body[i-1].x < body[i+1].x && body[i-1].y < body[i+1].y && body[i].y === body[i+1].y)) {
                body[i].div.style.borderRadius = "0px 0px 0px 8px";
            }
            else {
                body[i].div.style.borderRadius = "8px 0px 0px 0px";
            }
        }
        else
            body[i].div.style.borderRadius = "";
    }
}

function collisionCheck() {
    for(var i=0; i<bodySize-3; i++) {
        if(body[i].x === baseX && body[i].y === baseY)
            gameOver();
    }
}

function radioGlow(index) {
    var elements = document.getElementsByTagName("b");
    for(var i=2; i<6; i++) {
        if(i === index) {
            if(i === 2)
                elements[2].style.textShadow = "0 0 10px #58ACFA";
            else if(i === 3)
                elements[3].style.textShadow = "0 0 10px #F4FA58";
            else if(i === 4)
                elements[4].style.textShadow = "0 0 10px #DF7401";
            else
                elements[5].style.textShadow = "0 0 10px #DF0101";
        }
        else
            elements[i].style.textShadow = "";
    }
}

window.onkeydown = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    if((key === 37 || key === 65) && lastDirection !== 1 && speed > 0)
        direction = 3;
    else if((key === 38 || key === 87) && lastDirection !== 2 && speed > 0)
        direction = 0;
    else if((key === 39 || key === 68) && lastDirection !== 3 && speed > 0)
        direction = 1;
    else if((key === 40 || key === 83) && lastDirection !== 0 && speed > 0)
        direction = 2;
}

document.getElementById("PauseButton").addEventListener("click", function() {
    if(speed > 0 || gameIsOver) {
        clearInterval(interval);
        speed = 0;
    }
    else {
        speed = difficultySpeed;
        start();
    }
});