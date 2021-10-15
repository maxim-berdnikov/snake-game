"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const world =
    /** @type {HTMLCanvasElement} */ document.querySelector(".world");
  const pen = world.getContext("2d");

  let tileSize = 20;
  let tileCount = world.width / tileSize;

  let velocity = {
    x: 0,
    y: 0,
  };

  let food = {
    x: 15,
    y: 15,
  };

  let snake = [];
  let snakeHead = { x: 10, y: 10 };

  let snakeTailCount = 1;

  const drawWorld = () => {
    pen.fillStyle = "black";
    pen.fillRect(0, 0, world.width, world.height);
  };

  const drawSnake = () => {
    for (let i = 0; i < snake.length; i++) {
      if (i === snake.length - 1) {
        pen.fillStyle = "brown";
      } else {
        pen.fillStyle = "green";
      }
      pen.fillRect(
        snake[i].x * tileSize,
        snake[i].y * tileSize,
        tileSize - 2,
        tileSize - 2
      );

      if (snake[i].x === snakeHead.x && snake[i].y === snakeHead.y) {
        snakeTailCount = 1;
      }
    }
  };

  const drawFood = () => {
    pen.fillStyle = "red";
    pen.fillRect(
      food.x * tileSize,
      food.y * tileSize,
      tileSize - 2,
      tileSize - 2
    );
  };

  const updateSnakeHead = () => {
    snakeHead.x += velocity.x;
    snakeHead.y += velocity.y;

    if (snakeHead.x < 0) {
      snakeHead.x = tileCount - 1;
    }

    if (snakeHead.x > tileCount - 1) {
      snakeHead.x = 0;
    }

    if (snakeHead.y < 0) {
      snakeHead.y = tileCount - 1;
    }

    if (snakeHead.y > tileCount - 1) {
      snakeHead.y = 0;
    }
  };

  const updateSnakeBody = () => {
    snake.push({ x: snakeHead.x, y: snakeHead.y });

    while (snake.length > snakeTailCount) {
      snake.shift();
    }
  };

  const eatFood = () => {
    if (food.x === snakeHead.x && food.y === snakeHead.y) {
      snakeTailCount++;

      food.x = Math.floor(Math.random() * tileCount);
      food.y = Math.floor(Math.random() * tileCount);
    }
  };

  const keyDownHandlers = {
    ArrowLeft: () => {
      velocity.x = -1;
      velocity.y = 0;
    },
    ArrowRight: () => {
      velocity.x = 1;
      velocity.y = 0;
    },
    ArrowUp: () => {
      velocity.x = 0;
      velocity.y = -1;
    },
    ArrowDown: () => {
      velocity.x = 0;
      velocity.y = 1;
    },
  };

  const onKeyDown = (e) => {
    if (keyDownHandlers.hasOwnProperty(e.key)) {
      keyDownHandlers[e.key]();
    }
  };

  const updateGame = () => {
    updateSnakeHead();
    drawWorld();
    drawSnake();
    eatFood();
    drawFood();
    updateSnakeBody();
  };

  document.addEventListener("keydown", onKeyDown);

  setInterval(updateGame, 1000 / 5);
});
