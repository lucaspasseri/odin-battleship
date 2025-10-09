import createUI from "./createUI.js";
import Game from "./Game.js";
const game = new Game();

game.addPlayer("João", "real");
game.addPlayer("Maria", "real");

const ships = [
	{
		x: 0,
		y: 0,
		length: 5,
		direction: "horizontal",
	},
	{
		x: 9,
		y: 0,
		length: 5,
		direction: "vertical",
	},
	// { x: 9, y: 9, length: 1, direction: "horizontal" },
];

const ships1 = [
	{
		x: 0,
		y: 7,
		length: 3,
		direction: "vertical",
	},
	{
		x: 7,
		y: 9,
		length: 3,
		direction: "horizontal",
	},
];

ships.forEach(ship =>
	game.placeShip(ship.x, ship.y, ship.length, ship.direction)
);

game.changePlayer();

ships1.forEach(ship =>
	game.placeShip(ship.x, ship.y, ship.length, ship.direction)
);

game.changePlayer();

createUI(game);
