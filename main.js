import Player from "./Player.js";
import createGameboardUI from "./gameboardUI.js";

const body = document.querySelector("body");

const p1 = new Player("real");

p1.gameboard.placeShip(1, 1, 5, "horizontal");
p1.gameboard.placeShip(4, 4, 5, "vertical");
p1.gameboard.placeShip(9, 1, 5, "vertical");

const p2 = new Player("computer");

p2.gameboard.placeShip(0, 0, 5, "vertical");
p2.gameboard.placeShip(4, 4, 5, "horizontal");
p2.gameboard.placeShip(5, 1, 3, "vertical");

const grid1 = createGameboardUI(p1);

const grid2 = createGameboardUI(p2);

body.append(grid1, grid2);
