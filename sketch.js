/*
Week 5 — Example 5: Side-Scroller Platformer with JSON Levels + Modular Camera

Course: GBDA302 | Instructors: Dr. Karen Cochrane & David Han
Date: Feb. 12, 2026

Move: WASD/Arrows | Jump: Space

Learning goals:
- Build a side-scrolling platformer using modular game systems
- Load complete level definitions from external JSON (LevelLoader + levels.json)
- Separate responsibilities across classes (Player, Platform, Camera, World)
- Implement gravity, jumping, and collision with platforms
- Use a dedicated Camera2D class for smooth horizontal tracking
- Support multiple levels and easy tuning through data files
- Explore scalable project architecture for larger games
*/

const VIEW_W = 800;
const VIEW_H = 480;

let allLevelsData;
let levelIndex = 0;

let level;
let player;
let cam;

function preload() {
  allLevelsData = loadJSON("levels.json");
}

function setup() {
  createCanvas(VIEW_W, VIEW_H);
  textFont("sans-serif");

  cam = new Camera2D(width, height);

  loadLevel(levelIndex);
}

function loadLevel(i) {
  level = new WorldLevel(allLevelsData.levels[i]);

  player = {
    x: level.start.x,
    y: level.start.y,
    r: level.start.r,
    vx: 0
  };

  cam.x = player.x - width / 2;
  cam.y = 0;
}

function draw() {

  // movement
  if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) player.vx = -3;
  else if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) player.vx = 3;
  else player.vx = 0;

  player.x += player.vx;

  // camera
  cam.followSideScrollerX(player.x, level.camLerp);
  cam.clampToWorld(level.w, level.h);

  // draw world
  cam.begin();

  level.drawWorld(player);

  drawPlayer();

  cam.end();

  // HUD
  fill(255);
  text(level.name, 10, 20);
}

function drawPlayer() {

  let floatY = sin(frameCount * 0.05) * 3;

  fill(level.theme.blob);
  noStroke();

  circle(player.x, player.y + floatY, player.r * 2);
}
