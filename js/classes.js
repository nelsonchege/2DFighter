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
    sprites,
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
    this.sprites = sprites;
    this.attackBox = {
      offset,
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 150,
      height: 50,
    };

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }

  switchSprite(sprite) {
    if (
      this.image === this.sprites.attack1.image &&
      this.currentFrame < this.sprites.attack1.Frames - 1
    )
      return;
    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.Frames = this.sprites.idle.Frames;
          this.currentFrame = 0;
        }
        break;
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.Frames = this.sprites.jump.Frames;
          this.currentFrame = 0;
        }
        break;
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.Frames = this.sprites.run.Frames;
          this.currentFrame = 0;
        }
        break;
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.Frames = this.sprites.fall.Frames;
          this.currentFrame = 0;
        }
        break;
      case "attack1":
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image;
          this.Frames = this.sprites.attack1.Frames;
          this.currentFrame = 0;
        }
        break;
      case "attack2":
        if (this.image !== this.sprites.attack2.image) {
          this.image = this.sprites.attack2.image;
          this.Frames = this.sprites.attack2.Frames;
          this.currentFrame = 0;
        }
        break;
    }
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
    this.switchSprite("attack1");
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}
