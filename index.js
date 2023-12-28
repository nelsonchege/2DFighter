const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.5;
class Sprite {
  constructor({ position, velocity, color = "red", offset }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.lastKeyPressed;
    this.color = color;
    this.isAttacking;
    this.health = 100;
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
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    if (this.isAttacking) {
      ctx.fillStyle = "green";
      ctx.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  update() {
    this.draw();

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
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

const player = new Sprite({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 5 },
  offset: {
    x: 0,
    y: 0,
  },
});

const enemy = new Sprite({
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
  player.update();
  enemy.update();

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
