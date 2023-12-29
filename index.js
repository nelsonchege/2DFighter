const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
  constructor({
    position,
    imageSrc,
    width,
    height,
    Frames = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = imageSrc;
    this.Frames = Frames;
    this.currentFrame = 0;
    this.frameElapsed = 0;
    this.frameHold = 4;
    this.offset = offset;
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.currentFrame * (this.image.width / this.Frames),
      0,
      this.image.width / this.Frames,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      this.width,
      this.height
    );
  }
  animateFrames() {
    this.frameElapsed++;

    if (this.frameElapsed % this.frameHold === 0) {
      if (this.currentFrame < this.Frames - 1) {
        this.currentFrame++;
      } else {
        this.currentFrame = 0;
      }
    }
  }

  update() {
    this.draw();
    this.animateFrames();
  }
}

const gravity = 0.5;
class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    color = "red",
    offset,
    imageSrc,
    Frames = 1,
    width = 50,
    height = 150,
  }) {
    super({ position, imageSrc, Frames, offset });
    this.velocity = velocity;
    this.height = height;
    this.width = width;
    this.lastKeyPressed;
    this.color = color;
    this.isAttacking;
    this.health = 100;
    this.currentFrame = 0;
    this.frameElapsed = 0;
    this.frameHold = 4;
    this.attackBox = {
      offset,
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 150,
      height: 50,
    };
  }

  update() {
    this.draw();

    this.frameElapsed++;

    if (this.frameElapsed % this.frameHold === 0) {
      if (this.currentFrame < this.Frames - 1) {
        this.currentFrame++;
      } else {
        this.currentFrame = 0;
      }
    }

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (
      this.position.y + this.height + this.velocity.y >=
      canvas.height + 200
    ) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}

const background = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: "./img/background.png",
  width: canvas.width,
  height: canvas.height,
});
const shop = new Sprite({
  position: { x: 1130, y: 69 },
  imageSrc: "./img/shop.png",
  width: 630,
  height: 700,
  Frames: 6,
});

const player = new Fighter({
  position: { x: 100, y: 0 },
  velocity: { x: 0, y: 5 },
  offset: {
    x: 215,
    y: 0,
  },
  imageSrc: "./img/kanji/Idle.png",
  Frames: 8,
  height: 900,
  width: 900,
});

const enemy = new Fighter({
  position: { x: 400, y: 0 },
  velocity: { x: 0, y: 5 },
  color: "blue",
  offset: {
    x: -100,
    y: 0,
  },
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
};

function PlayerAttacking({ player1, player2 }) {
  return (
    player1.attackBox.position.x + player1.attackBox.width >=
      player2.position.x &&
    player1.attackBox.position.x <= player2.position.x + player2.width &&
    player1.attackBox.position.y + player1.attackBox.height >=
      player2.position.y &&
    player1.attackBox.position.y <= player2.position.y + player2.height
  );
}

function determineWinners({ player, enemy, timerId }) {
  clearTimeout(timerId);
  document.querySelector("#gameMessage").style.display = "flex";
  if (player.health === enemy.health) {
    document.querySelector("#gameMessage").innerHTML = "Tie";
  } else if (player.health > enemy.health) {
    document.querySelector("#gameMessage").innerHTML = "Player 1 wins";
  } else if (player.health < enemy.health) {
    document.querySelector("#gameMessage").innerHTML = "PLayer 2 wins";
  }
}

let Timer = 20;
let timerId;
function decreaseTimer() {
  if (Timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    Timer--;
    document.querySelector("#timer").innerHTML = Timer;
  }

  if (Timer === 0) {
    determineWinners({ player, enemy, timerId });
  }
}
decreaseTimer();

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  background.update();
  shop.update();
  player.update();
  //   enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // handles the players movement

  if (keys.a.pressed && player.lastKeyPressed === "a") {
    player.velocity.x = -10;
  } else if (keys.d.pressed && player.lastKeyPressed === "d") {
    player.velocity.x = 10;
  }

  if (keys.ArrowLeft.pressed && enemy.lastKeyPressed === "ArrowLeft") {
    enemy.velocity.x = -10;
  } else if (keys.ArrowRight.pressed && enemy.lastKeyPressed === "ArrowRight") {
    enemy.velocity.x = 10;
  }

  // handling player attack
  if (
    PlayerAttacking({ player1: player, player2: enemy }) &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    enemy.health -= 20;
    document.querySelector("#enemyBar").style.width = enemy.health + "%";
  }
  if (
    PlayerAttacking({ player1: enemy, player2: player }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    player.health -= 20;
    document.querySelector("#playerBar").style.width = player.health + "%";
  }

  // handle end of fight
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinners({ player, enemy, timerId });
  }
}
animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    //players keys
    case "d":
      keys.d.pressed = true;
      player.lastKeyPressed = "d";
      break;
    case "a":
      keys.a.pressed = true;
      player.lastKeyPressed = "a";
      break;
    case "w":
      player.velocity.y = -20;
      break;
    case " ":
      player.attack();
      break;

    //enemies keys
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKeyPressed = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKeyPressed = "ArrowLeft";
      break;
    case "ArrowUp":
      enemy.velocity.y = -20;
      break;
    case "ArrowDown":
      enemy.attack();
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
});
