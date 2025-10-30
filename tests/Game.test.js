import { Game, Player } from "../src/core/index";

it("should be able to add players and check the array of players", () => {
	const game = new Game();

	expect(game.players.length).toBe(0);
	game.addPlayer("Lucas", "real");
	game.addPlayer("Maria", "computer");
	expect(game.players.length).toBe(2);
});

it("should be able to check the current player", () => {
	const game = new Game();
	expect(game.currPlayer).toBe(undefined);
	game.addPlayer("Mateus", "real");
	expect(game.currPlayer).toBeInstanceOf(Player);
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

it("should be able to check the current player index", () => {
	const game = new Game();
	expect(game.currPlayerIndex).toBe(undefined);
	game.addPlayer("Mateus", "real");
	expect(game.currPlayerIndex).toBe(0);
});

it("should be able to get the opponent player", () => {
	const game = new Game();

	expect(game.currPlayer).toBe(undefined);
	game.addPlayer("Otávio", "real");

	expect(game.currPlayer.name).toBe("Otávio");
	expect(game.opponentPlayer).toBe(undefined);

	game.addPlayer("Márcia", "real");
	expect(game.opponentPlayer.name).toBe("Márcia");

	game.changePlayer();

	expect(game.currPlayer.name).toBe("Márcia");
	expect(game.opponentPlayer.name).toBe("Otávio");
});
it("should be able to get the player index from the corresponding player ", () => {
	const game = new Game();

	game.addPlayer("Luizinho", "real");
	game.addPlayer("Huguinho", "real");
	game.addPlayer("Zézinho", "real");

	expect(game.getPlayerIndex(game.currPlayer)).toBe(0);
	expect(game.getPlayerIndex(game.firstPlayer)).toBe(0);
	expect(game.getPlayerIndex(game.secondPlayer)).toBe(1);
	expect(game.getPlayerIndex(game.players[2])).toBe(2);

	game.changePlayer();

	expect(game.getPlayerIndex(game.currPlayer)).toBe(1);
});

it("should be able to check the array of ships by player index", () => {
	const game = new Game();

	game.addPlayer("Elisa", "real");
	expect(() => game.getShips(game.currPlayerIndex)).not.toThrow();
	expect(game.getShips(game.currPlayerIndex).length).toBe(0);
});

it("should be able to place a ship by player index", () => {
	const game = new Game();
	game.addPlayer("Fábio", "real");

	game.placeShipByPlayerIndex(1, 1, 3, "horizontal", game.currPlayerIndex);
	game.placeShipByPlayerIndex(9, 1, 5, "vertical", game.currPlayerIndex);
	expect(game.getShips(game.currPlayerIndex).length).toBe(2);
});

it("should be able to check the state of a grid cell by player index", () => {
	const game = new Game();
	game.addPlayer("Mario", "real");
	game.addPlayer("Vitor", "real");

	game.hitCellByPlayerIndex(1, 1, 1);

	expect(game.checkCellByPlayerIndex(1, 1, 0)).toBe("initial");
	expect(game.checkCellByPlayerIndex(1, 1, 1)).toBe("water");
});

it("should be able to check the shipState of a grid cell by player index", () => {
	const game = new Game();
	game.addPlayer("Samuel", "real");
	game.addPlayer("Olívia", "real");

	expect(game.checkShipCellByPlayerIndex(1, 1, 0)).toBe("water");
	game.placeShipByPlayerIndex(1, 1, 5, "vertical", 0);

	expect(game.checkShipCellByPlayerIndex(1, 1, 0)).toBe("ship");
});

it("should be able to hit a grid cell by player index", () => {
	const game = new Game();
	game.addPlayer("Bruna", "real");
	game.addPlayer("Ruan", "real");

	expect(game.checkCellByPlayerIndex(0, 0, game.secondPlayerIndex)).toBe(
		"initial"
	);
	game.hitCellByPlayerIndex(0, 0, game.secondPlayerIndex);
	expect(game.checkCellByPlayerIndex(0, 0, game.secondPlayerIndex)).toBe(
		"water"
	);
});

it("should be able to change between players", () => {
	const game = new Game();
	game.addPlayer("Rosa", "real");
	game.addPlayer("Caio", "real");
	game.addPlayer("Bruno", "computer");

	game.setFirstPlayerIndex(2);
	game.setSecondPlayerIndex(0);
	game.setCurrPlayerIndex(game.firstPlayerIndex);

	expect(game.currPlayer.name).toBe("Bruno");
	game.changePlayer();
	expect(game.currPlayer.name).toBe("Rosa");
	game.changePlayer();
	expect(game.firstPlayer.name).toBe("Bruno");
});

it("should be able to sunk all ships on the grid", () => {
	const game = new Game();
	game.addPlayer("Diana", "real");
	game.addPlayer("Romeu", "real");

	game.placeShipByPlayerIndex(1, 1, 3, "horizontal", game.firstPlayerIndex);
	game.placeShipByPlayerIndex(9, 1, 5, "vertical", game.firstPlayerIndex);

	expect(game.getShips(game.firstPlayerIndex).length).toBe(2);

	game.hitCellByPlayerIndex(1, 1, game.firstPlayerIndex);
	game.hitCellByPlayerIndex(2, 1, game.firstPlayerIndex);
	game.hitCellByPlayerIndex(3, 1, game.firstPlayerIndex);

	game.hitCellByPlayerIndex(9, 1, game.firstPlayerIndex);
	game.hitCellByPlayerIndex(9, 2, game.firstPlayerIndex);
	game.hitCellByPlayerIndex(9, 3, game.firstPlayerIndex);
	game.hitCellByPlayerIndex(9, 4, game.firstPlayerIndex);
	game.hitCellByPlayerIndex(9, 5, game.firstPlayerIndex);

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
		game.placeShipByPlayerIndex(
			ship.x,
			ship.y,
			ship.length,
			ship.direction,
			game.firstPlayerIndex
		)
	);

	ships1.forEach(ship =>
		game.placeShipByPlayerIndex(
			ship.x,
			ship.y,
			ship.length,
			ship.direction,
			game.secondPlayerIndex
		)
	);

	while (true) {
		const randX = Math.floor(Math.random() * 10);
		const randY = Math.floor(Math.random() * 10);

		const cell = `${randX},${randY}`;

		if (game.playedCellsByPlayerIndex(game.secondPlayerIndex).has(cell)) {
			continue;
		}

		game.hitCellByPlayerIndex(randX, randY, game.secondPlayerIndex);

		if (game.isGameOver) {
			break;
		}

		game.changePlayer();
	}

	expect(game.isGameOver).toBe(true);
});

it("should be able to check the played cells from a player by player index", () => {
	const game = new Game();

	game.addPlayer("Paulo", "real");
	game.addPlayer("Renato", "real");

	game.hitCellByPlayerIndex(0, 0, game.firstPlayerIndex);
	game.hitCellByPlayerIndex(0, 9, game.firstPlayerIndex);
	game.hitCellByPlayerIndex(9, 9, game.firstPlayerIndex);
	game.hitCellByPlayerIndex(9, 0, game.firstPlayerIndex);

	expect(game.playedCellsByPlayerIndex(game.firstPlayerIndex).size).toBe(4);
	expect([...game.playedCellsByPlayerIndex(game.firstPlayerIndex)]).toEqual([
		"0,0",
		"0,9",
		"9,9",
		"9,0",
	]);
});

it("should be able to handle random ship deployment for player of type computer", () => {
	const game = new Game();

	game.addPlayer("Maurílio", "real");
	game.addPlayer("Viviana", "computer");

	expect(game.currPlayer.type).toBe("real");
	expect(() => game.computerDeploysShip(5)).toThrow();

	game.changePlayer();

	expect(game.currPlayer.type).toBe("computer");
	expect(() => game.computerDeploysShip(5)).not.toThrow();
	game.computerDeploysShip(4);
	game.computerDeploysShip(3);
	game.computerDeploysShip(2);

	expect(game.getShips(game.currPlayerIndex).length).toBe(4);
});

it("should be able to handle random plays for player of type computer", () => {
	const game = new Game();

	game.addPlayer("Maurílio", "real");
	game.addPlayer("Viviana", "computer");

	game.placeShipByPlayerIndex(1, 1, 3, "horizontal", 0);

	expect(game.currPlayer.type).toBe("real");
	expect(() => game.computerPlays()).toThrow();

	game.changePlayer();
	expect(game.currPlayer.type).toBe("computer");

	let i = 0;
	while (game.isGameOver === false) {
		game.computerPlays();
		if (i === 99) {
			break;
		}
	}

	expect(game.isGameOver).toBe(true);
});

it("should be able to able to check the adjacent cells from a chosen position ('x,y')", () => {
	const game = new Game();

	const possiblePositions = [
		"0,0",
		"0,9",
		"9,0",
		"9,9",
		"0,4",
		"4,0",
		"4,9",
		"9,4",
		"4,4",
	];

	const expectArr = {
		"0,0": ["0,1", "1,0"],
		"0,9": ["0,8", "1,9"],
		"9,0": ["9,1", "8,0"],
		"9,9": ["9,8", "8,9"],
		"0,4": ["0,3", "0,5", "1,4"],
		"4,0": ["4,1", "3,0", "5,0"],
		"4,9": ["4,8", "3,9", "5,9"],
		"9,4": ["9,3", "9,5", "8,4"],
		"4,4": ["4,3", "4,5", "3,4", "5,4"],
	};

	possiblePositions.forEach(position => {
		const arr = game.getAdjCells(position);
		expect(arr).toEqual(expect.arrayContaining(expectArr[position]));
	});
});

it("should be able to handle random plays for player of type computer: After hit a ship cell, it should keep aiming for adjacent cells until it hit another ship cell", () => {
	const game = new Game();

	game.addPlayer("Maurílio", "real");
	game.addPlayer("Viviana", "computer");

	game.placeShipByPlayerIndex(0, 0, 5, "horizontal", 0);

	game.changePlayer();
	expect(game.currPlayer.type).toBe("computer");

	let attackedPosition;

	let i = 0;
	while (i < 100) {
		const hit = game.computerPlays();
		console.log({ hit });

		if (hit) {
			attackedPosition = hit;
			const [x, y] = attackedPosition.split(",");

			const cellState = game.checkCellByPlayerIndex(
				Number(x),
				Number(y),
				game.getPlayerIndex(game.opponentPlayer)
			);

			if (cellState === "ship") {
				break;
			}
		}
		i++;
	}

	const adjCells = game.getAdjCells(attackedPosition);

	let newCellState;

	while (newCellState !== "ship") {
		const hit = game.computerPlays();
		expect(adjCells.includes(hit)).toBe(true);

		const [newX, newY] = hit.split(",");
		newCellState = game.checkCellByPlayerIndex(
			Number(newX),
			Number(newY),
			game.getPlayerIndex(game.opponentPlayer)
		);
	}
});

// it("should be able to handle random plays for player of type computer: After hit a ship cell, it should keep aiming for that ship until it sinks", () => {
// 	const game = new Game();

// 	const test0 = game.getAdjCells("0,0");
// 	const test1 = game.getAdjCells("1,0");

// 	console.log({ test0, test1 });
// });
