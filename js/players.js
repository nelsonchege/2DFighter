const player = new Fighter({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 5 },
  offset: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/kanji/Idle.png",
  Frames: 8,
  height: 900,
  width: 900,
  sprites: {
    idle: {
      imageSrc: "./img/kanji/Idle.png",
      Frames: 8,
    },
    run: {
      imageSrc: "./img/kanji/Run.png",
      Frames: 8,
    },
    jump: {
      imageSrc: "./img/kanji/Jump.png",
      Frames: 2,
    },
    fall: {
      imageSrc: "./img/kanji/Fall.png",
      Frames: 2,
    },
    attack1: {
      imageSrc: "./img/kanji/Attack1.png",
      Frames: 6,
    },
    takeHit: {
      imageSrc: "./img/kanji/Take hit.png",
      framesMax: 3,
    },
    death: {
      imageSrc: "./img/kanji/Death.png",
      framesMax: 7,
    },
  },
  attackBox: {
    offset: {
      x: 0,
      y: 0,
    },
    width: 160,
    height: 50,
  },
});

const enemy = new Fighter({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 5 },
  color: "blue",
  offset: {
    x: -500,
    y: 69,
  },
  imageSrc: "./img/samurai_kai/Idle.png",
  Frames: 4,
  height: 800,
  width: 900,
  sprites: {
    idle: {
      imageSrc: "./img/samurai_kai/Idle.png",
      Frames: 4,
    },
    run: {
      imageSrc: "./img/samurai_kai/Run.png",
      Frames: 8,
    },
    jump: {
      imageSrc: "./img/samurai_kai/Jump.png",
      Frames: 2,
    },
    fall: {
      imageSrc: "./img/samurai_kai/Fall.png",
      Frames: 2,
    },
    attack1: {
      imageSrc: "./img/samurai_kai/Attack1.png",
      Frames: 4,
    },
    attack2: {
      imageSrc: "./img/samurai_kai/Attack2.png",
      Frames: 4,
    },
    takeHit: {
      imageSrc: "./img/samurai_kai/Take Hit - white silhouette.png",
      framesMax: 4,
    },
    death: {
      imageSrc: "./img/samurai_kai/Death.png",
      framesMax: 6,
    },
  },
  attackBox: {
    offset: {
      x: 0,
      y: 0,
    },
    width: 160,
    height: 50,
  },
});
