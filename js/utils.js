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

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  background.update();
  shop.update();
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // handles the players movement

  if (keys.a.pressed && player.lastKeyPressed === "a") {
    player.velocity.x = -10;
    player.switchSprite("run");
  } else if (keys.d.pressed && player.lastKeyPressed === "d") {
    player.velocity.x = 10;
    player.switchSprite("run");
  } else {
    player.switchSprite("idle");
  }

  // handling players jump

  if (player.velocity.y < 0) {
    player.switchSprite("jump");
  } else if (player.velocity.y > 0) {
    player.switchSprite("fall");
  }

  if (keys.ArrowLeft.pressed && enemy.lastKeyPressed === "ArrowLeft") {
    enemy.velocity.x = -10;
    enemy.switchSprite("run");
  } else if (keys.ArrowRight.pressed && enemy.lastKeyPressed === "ArrowRight") {
    enemy.velocity.x = 10;
    enemy.switchSprite("run");
  } else {
    enemy.switchSprite("idle");
  }

  if (enemy.velocity.y < 0) {
    enemy.switchSprite("jump");
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite("fall");
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
