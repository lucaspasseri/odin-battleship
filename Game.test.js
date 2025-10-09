import Game from "./Game";
import Player from "./Player";

it("should be able to check the players", () => {
	const game = new Game();

	expect(() => game.players).not.toThrow();
	expect(game.players.length).toBe(0);
});

it("should be able to add players", () => {
	const game = new Game();
	const p1 = {
		name: "Lucas",
		type: "real",
	};
	const p2 = {
		name: "Maria",
		type: "computer",
	};

	game.addPlayer(p1.name, p1.type);
	game.addPlayer(p2.name, p2.type);
});

it("should be able to check the current player", () => {
	const game = new Game();
	expect(game.currPlayer).toBe(undefined);
	game.addPlayer("Mateus", "real");
	expect(game.currPlayer).toBeInstanceOf(Player);
});

it("should be able to check the number of ships of the current player", () => {
	const game = new Game();

	game.addPlayer("João", "real");
	expect(game.numberOfShips).toBe(0);
});

test("current player should be able to place a ship", () => {
	const game = new Game();
	game.addPlayer("Fabio", "real");

	game.placeShip(1, 1, 3, "horizontal");
	game.placeShip(9, 1, 5, "vertical");
	expect(game.numberOfShips).toBe(2);
});

it("should be able to check the state of a grid cell of the current player", () => {
	const game = new Game();
	game.addPlayer("Mario", "real");

	expect(game.checkCell(0, 0)).toBe("initial");
});

it("should be able to check the state of a grid cell of the chosen player", () => {
	const game = new Game();
	game.addPlayer("Mario", "real");
	game.addPlayer("Vitor", "real");

	game.changePlayer();
	game.placeShip(1, 1, 3, "horizontal");
	game.hitCell(1, 1);

	expect(game.checkCellByPlayerIndex(1, 1, 0)).toBe("initial");
	expect(game.checkCellByPlayerIndex(1, 1, 1)).toBe("ship");
});

it("should be able to change between players", () => {
	const game = new Game();
	game.addPlayer("Rosa", "real");
	game.addPlayer("Caio", "real");

	expect(game.currPlayer.name).toBe("Rosa");
	game.changePlayer();
	expect(game.currPlayer.name).toBe("Caio");
	game.changePlayer();
	expect(game.currPlayer.name).toBe("Rosa");
});

test("current player should be able to hit a grid cell", () => {
	const game = new Game();
	game.addPlayer("Bruna", "real");

	expect(game.checkCell(0, 0)).toBe("initial");
	game.hitCell(0, 0);

	expect(game.checkCell(0, 0)).toBe("water");

	game.placeShip(1, 1, 3, "vertical");
	expect(game.checkCell(1, 1)).toBe("initial");
	game.hitCell(1, 1);
	expect(game.checkCell(1, 1)).toBe("ship");
});

test("player chosen by index should be able to hit a grid cell", () => {
	const game = new Game();
	game.addPlayer("Bruna", "real");
	game.addPlayer("Ruan", "real");

	expect(game.checkCellByPlayerIndex(0, 0, 1)).toBe("initial");
	game.hitCellByPlayerIndex(0, 0, 1);
	expect(game.checkCellByPlayerIndex(0, 0, 1)).toBe("water");
});

test("current player should be able to sunk all ships on the grid", () => {
	const game = new Game();
	game.addPlayer("Bruna", "real");

	game.placeShip(1, 1, 3, "horizontal");
	game.placeShip(9, 1, 5, "vertical");

	expect(game.numberOfShips).toBe(2);

	game.hitCell(1, 1);
	game.hitCell(2, 1);
	game.hitCell(3, 1);

	expect(game.isThereAnyShipLeft).toBe(true);

	game.hitCell(9, 1);
	game.hitCell(9, 2);
	game.hitCell(9, 3);
	game.hitCell(9, 4);
	game.hitCell(9, 5);

	expect(game.isThereAnyShipLeft).toBe(false);
});

test("Battleship match between two players", () => {
	const game = new Game();

	const playersObjArr = [
		{ name: "Jones", type: "computer" },
		{
			name: "Joana",
			type: "computer",
		},
	];

	playersObjArr.forEach(obj => game.addPlayer(obj.name, obj.type));

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

	while (true) {
		const randX = Math.floor(Math.random() * 10);
		const randY = Math.floor(Math.random() * 10);

		const cell = `${randX},${randY}`;

		if (game.playedCells.has(cell)) {
			continue;
		}

		game.hitCell(randX, randY);

		if (!game.isThereAnyShipLeft) {
			break;
		}

		game.changePlayer();
	}

	expect(game.isThereAnyShipLeft).toBe(false);

	game.changePlayer();
	expect(game.isThereAnyShipLeft).toBe(true);
});

// EACH PLAYER SHOULD ONLY HIT THE OPPONENT's BOARD

// GAME OVER FOR ONE OF THE BOARDS SHOULD STOP THE GAME
