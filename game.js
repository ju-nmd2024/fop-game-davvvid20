let characterX = 330;
let characterY = 100;

let redrectX = 0;
let redrectY = 550;
let redrectSpeed = 3;

let velocity = 0;
const gravity = 0.2;
const lift = -0.5;

let gameStarted = false;
let gameEnded = false;
let gameWon = false;

let timeOnGround = 0;
const maxGroundTime = 1000;

function setup() {
  createCanvas(700, 700);
  background(255);
}

function gameBackground() {
  // ground
  noStroke();
  fill(42, 0, 0);
  rect(0, 640, 700, 60);

  // cloud
  fill(255, 250, 205);
  ellipse(300, 150, 120, 60);
  ellipse(260, 160, 100, 50);
  ellipse(340, 160, 100, 50);

  // hill
  fill(255, 175, 120, 180);
  beginShape();
  vertex(0, 550);
  bezierVertex(250, 450, 450, 450, 700, 550);
  vertex(700, 700);
  vertex(0, 700);
  endShape(CLOSE);

  // orange tree
  fill(180, 0, 0);
  rect(180, 360, 20, 280);
  fill(255, 128, 0);
  ellipse(190, 300, 90, 230);

  fill(180, 0, 0);
  rect(470, 360, 20, 280);
  fill(255, 128, 0);
  ellipse(480, 300, 90, 230);

  // far tree1
  fill(139, 69, 19);
  rect(60, 400, 30, 240);
  fill(220, 90, 50);
  ellipse(75, 380, 100, 150);
  fill(255, 130, 80);
  ellipse(75, 300, 140, 150);

  // red tree
  fill(100, 0, 0);
  rect(100, 200, 30, 440);
  fill(255, 51, 51);
  ellipse(115, 170, 120, 150);
  ellipse(85, 250, 130, 150);
  ellipse(145, 250, 130, 150);

  fill(100, 0, 0);
  rect(550, 200, 30, 440);
  fill(255, 51, 51);
  ellipse(565, 170, 120, 150);
  ellipse(535, 250, 130, 150);
  ellipse(595, 250, 130, 150);

  // far tree2
  fill(139, 69, 19);
  rect(600, 450, 30, 190);
  fill(220, 90, 50);
  ellipse(615, 420, 100, 150);
  fill(255, 130, 80);
  ellipse(615, 380, 120, 150);
}

function Character(x, y, eyesAreClosed) {
  push();
  translate(x, y);
  scale(0.4);
  translate(-x, -y);
  // branch
  push();
  strokeWeight(5);
  stroke(102, 0, 0);
  line(x, y, x, y + 90);
  pop();

  // leave
  fill(255, 0, 0);
  stroke(195, 0, 0);
  strokeWeight(5);

  beginShape();
  vertex(x, y - 160);
  bezierVertex(x, y - 150, x + 40, y - 120, x + 20, y - 50);
  bezierVertex(x + 20, y - 50, x + 50, y - 100, x + 100, y - 100);
  bezierVertex(x + 100, y - 100, x + 120, y - 100, x + 50, y - 20);
  bezierVertex(x + 50, y - 20, x + 70, y - 10, x + 100, y + 50);
  bezierVertex(x + 100, y + 50, x + 50, y + 50, x, y);
  bezierVertex(x, y, x + 10, y + 10, x - 100, y + 50);
  bezierVertex(x - 100, y + 50, x - 80, y, x - 50, y - 20);
  bezierVertex(x - 50, y - 20, x - 90, y - 50, x - 100, y - 100);
  bezierVertex(x - 100, y - 100, x - 50, y - 90, x - 20, y - 50);
  bezierVertex(x - 20, y - 50, x - 30, y - 90, x, y - 160);
  endShape();

  // leaf veins
  stroke(204, 0, 0);
  strokeWeight(3);
  line(x, y - 150, x, y);
  line(x, y, x - 100, y - 100);
  line(x, y, x + 100, y - 100);

  // face
  if (eyesAreClosed) {
    fill(155, 0, 0);
    ellipse(x - 20, y - 20, 25, 10);
    ellipse(x + 20, y - 20, 25, 10);
  } else {
    fill(255);
    ellipse(x - 20, y - 20, 20, 20);
    ellipse(x + 20, y - 20, 20, 20);
    fill(255, 0, 0);
    ellipse(x - 20, y - 20, 10, 10);
    ellipse(x + 20, y - 20, 10, 10);
  }

  // blush
  strokeWeight(0);
  fill(255, 204, 204);
  ellipse(x - 40, y - 10, 15, 5);
  ellipse(x + 40, y - 10, 15, 5);
  pop();
}

function redrect() {
  fill(255, 0, 0);
  rect(redrectX, redrectY, 100, 30);
}

function draw() {
  frameRate(30);
  if (!gameStarted) {
    background(250, 200, 150);
    textAlign(CENTER, CENTER);
    textSize(40);
    fill(102, 51, 0);
    text("start game", width / 2, height / 2);
  } else if (gameEnded) {
    background(0, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(40);
    fill(255);
    text("Game Over", width / 2, height / 2 - 40);
    textSize(20);
    text("Click to Restart", width / 2, height / 2 + 40);
  } else if (gameWon) {
    background(250, 200, 150);
    textAlign(CENTER, CENTER);
    textSize(40);
    fill(102, 51, 0);
    text("You Win!", width / 2, height / 2 - 40);
    textSize(30);
    text("Click to Restart", width / 2, height / 2 + 40);
  } else {
    background(255, 204, 153);
    gameBackground();

    //leave
    Character(characterX, characterY, keyIsDown(32));

    //red rect
    redrect();
    redrectX += redrectSpeed;

    //how to win
    if (
      characterY + 40 > redrectY &&
      characterX + 20 > redrectX &&
      characterX - 20 < redrectX + 100
    ) {
      gameWon = true;
    }

    //restrict move
    if (redrectX + 100 > width || redrectX < 0) {
      redrectSpeed *= -1;
    }

    //up and down
    if (keyIsDown(32)) {
      velocity = velocity + lift;
      timeOnGround = 0;
    } else {
      velocity += gravity;
    }
    velocity = constrain(velocity, -15, 10);
    characterY = characterY + velocity;

    // restriction
    if (characterY > 600) {
      characterY = 600;
      velocity = 0;
      if (timeOnGround === 0) {
        timeOnGround = millis();
      }
    }
    if (characterY < 80) {
      characterY = 100;
      velocity = 0;
    }
    //2 seconds
    if (timeOnGround > 0 && millis() - timeOnGround > maxGroundTime) {
      gameEnded = true;
    }
  }
}

function mousePressed() {
  if (!gameStarted) {
    gameStarted = true;
  } else if (gameEnded) {
    gameEnded = false;
    characterY = 100;
    velocity = 0;
    timeOnGround = 0;
  } else if (gameWon) {
    gameWon = false;
    characterY = 100;
    velocity = 0;
    timeOnGround = 0;
  }
}
