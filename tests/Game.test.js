import { Game, Player } from "../src/core/index";

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
	game.addPlayer("Fábio", "real");

	game.placeShip(1, 1, 3, "horizontal");
	game.placeShip(9, 1, 5, "vertical");
	expect(game.numberOfShips).toBe(2);
});

it("should be able to check the first player", () => {
	const game = new Game();

	expect(game.firstPlayer).toBe(undefined);
	game.addPlayer("André", "real");

	expect(game.firstPlayer).toBeInstanceOf(Player);
});

it("should be able to check the second player", () => {
	const game = new Game();

	expect(game.secondPlayer).toBe(undefined);
	game.addPlayer("Felipe", "real");

	expect(game.secondPlayer).toBe(undefined);
	game.addPlayer("Berenice", "real");

	expect(game.secondPlayer).toBeInstanceOf(Player);
});

it("should be able to check the state of a grid cell of the opponent player", () => {
	const game = new Game();
	game.addPlayer("Mario", "real");
	game.addPlayer("Luana", "real");

	expect(game.checkCell(0, 0)).toBe("initial");
});

it("should be able to check the state of a grid cell of the chosen player", () => {
	const game = new Game();
	game.addPlayer("Mario", "real");
	game.addPlayer("Vitor", "real");

	game.hitCell(1, 1);

	expect(game.checkCellByPlayerIndex(1, 1, 0)).toBe("initial");
	expect(game.checkCellByPlayerIndex(1, 1, 1)).toBe("water");
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

test("each player can only hit the opponent's board, game with only one player", () => {
	const game = new Game();

	game.addPlayer("Flávia", "real");

	expect(() => game.hitCell(0, 0)).toThrow();
});

test("each player can only hit the opponent's board, game with two players", () => {
	const game = new Game();

	game.addPlayer("Eduardo", "real");
	game.addPlayer("Cynthia", "real");

	game.hitCell(0, 0);

	expect(game.checkCellByPlayerIndex(0, 0, 0)).toBe("initial");
	expect(game.checkCellByPlayerIndex(0, 0, 1)).toBe("water");

	game.changePlayer();

	game.hitCell(1, 1);

	expect(game.checkCellByPlayerIndex(1, 1, 0)).toBe("water");
	expect(game.checkCellByPlayerIndex(1, 1, 1)).toBe("initial");
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
	game.addPlayer("Diana", "real");
	game.addPlayer("Romeu", "real");

	game.placeShip(1, 1, 3, "horizontal");
	game.placeShip(9, 1, 5, "vertical");

	expect(game.numberOfShips).toBe(2);

	game.changePlayer();

	game.hitCell(1, 1);
	game.hitCell(2, 1);
	game.hitCell(3, 1);

	game.hitCell(9, 1);
	game.hitCell(9, 2);
	game.hitCell(9, 3);
	game.hitCell(9, 4);
	game.hitCell(9, 5);

	game.changePlayer();

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

		// if (game.playedCells.has(cell)) {
		// 	continue;
		// }

		game.hitCell(randX, randY);

		if (game.isGameOver) {
			break;
		}

		game.changePlayer();
	}

	expect(game.isGameOver).toBe(true);
});

it("should be able to check the played cells from a player's board by playerIndex", () => {
	const game = new Game();

	game.addPlayer("Paulo", "real");
	game.addPlayer("Renato", "real");

	game.hitCell(0, 0);
	game.hitCell(0, 9);
	game.hitCell(9, 9);
	game.hitCell(9, 0);

	expect(game.playedCellsByPlayerIndex(1).size).toBe(4);
	expect([...game.playedCellsByPlayerIndex(1)]).toEqual([
		"0,0",
		"0,9",
		"9,9",
		"9,0",
	]);
});
