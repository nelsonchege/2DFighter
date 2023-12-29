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
    attack2: {
      imageSrc: "./img/kanji/Attack2.png",
      Frames: 6,
    },
  },
});

const enemy = new Fighter({
  position: { x: 400, y: 0 },
  velocity: { x: 0, y: 5 },
  color: "blue",
  offset: {
    x: -100,
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
  },
});
