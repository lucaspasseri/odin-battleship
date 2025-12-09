import { Player } from "./index.js";
import Stack from "../util/Stack.js";
export default class Game {
	#players = [];
	#firstPlayerIndex;
	#secondPlayerIndex;
	#currPlayerIndex;
	#computerPlayStack = new Stack();
	#matchlessShipCell = new Set();

	#isGameOver = false;

	constructor() {}

	get players() {
		return [...this.#players];
	}

	get firstPlayer() {
		if (this.#firstPlayerIndex === undefined) {
			return undefined;
		}
		return this.#players[this.#firstPlayerIndex];
	}

	get firstPlayerIndex() {
		return this.#firstPlayerIndex;
	}

	get secondPlayer() {
		if (this.#secondPlayerIndex === undefined) {
			return undefined;
		}
		return this.#players[this.#secondPlayerIndex];
	}

	get secondPlayerIndex() {
		return this.#secondPlayerIndex;
	}

	get currPlayer() {
		return this.#players[this.#currPlayerIndex];
	}

	get currPlayerIndex() {
		return this.#currPlayerIndex;
	}

	get isThereAnyShipLeft() {
		const ships = this.getShips(this.#currPlayerIndex);

		const ship = ships.find(ship => ship.isSunk() === false);

		if (ship === undefined) {
			return false;
		}
		return true;
	}

	get playedCells() {
		return this.#players[this.#currPlayerIndex].gameboard.playedPlaces;
	}

	get isGameOver() {
		return this.#isGameOver;
	}

	get opponentPlayer() {
		if (
			this.currPlayer === undefined ||
			this.firstPlayer === undefined ||
			this.secondPlayer === undefined
		)
			return;

		if (this.currPlayer === this.firstPlayer) {
			return this.secondPlayer;
		} else if (this.currPlayer === this.secondPlayer) {
			return this.firstPlayer;
		}

		return;
	}

	getPlayerIndex(targetPlayer) {
		if (targetPlayer instanceof Player) {
			return this.#players.findIndex(player => player === targetPlayer);
		}
	}

	getShips(playerIndex) {
		if (playerIndex < 0 || playerIndex > this.#players.length - 1) {
			throw newError();
		}
		const player = this.#players[playerIndex];

		return player?.gameboard.ships;
	}

	changePlayer() {
		if (this.#currPlayerIndex === this.#firstPlayerIndex) {
			this.#currPlayerIndex = this.#secondPlayerIndex;
		} else {
			this.#currPlayerIndex = this.#firstPlayerIndex;
		}
	}

	setCurrPlayerIndex(playerIndex) {
		if (playerIndex < 0 || playerIndex > this.#players.length - 1) {
			throw newError();
		}

		this.#currPlayerIndex = playerIndex;
	}

	setFirstPlayerIndex(playerIndex) {
		if (playerIndex < 0 || playerIndex > this.#players.length - 1) {
			throw newError();
		}

		this.#firstPlayerIndex = playerIndex;
	}

	setSecondPlayerIndex(playerIndex) {
		if (playerIndex < 0 || playerIndex > this.#players.length - 1) {
			throw newError();
		}

		this.#secondPlayerIndex = playerIndex;
	}

	addPlayer(name, type, imageIndex) {
		if (name === "") {
			name = `Player ${this.#players.length + 1}`;
		}

		const newPlayer = new Player(type, name, imageIndex);
		this.#players.push(newPlayer);
		if (this.#players.length === 1) {
			this.#currPlayerIndex = 0;
			this.#firstPlayerIndex = 0;
		} else if (this.#players.length === 2) {
			this.#secondPlayerIndex = 1;
		}
	}

	placeShipByPlayerIndex(x, y, length, direction, playerIndex) {
		if (playerIndex < 0 || playerIndex > this.#players.length - 1) {
			throw newError();
		}
		this.#players[playerIndex]?.gameboard.placeShip(x, y, length, direction);
	}

	placeShipHasCollision(x, y, length, direction, playerIndex) {
		if (playerIndex < 0 || playerIndex > this.#players.length - 1) {
			throw newError();
		}

		const possiblePlaces = this.currPlayer.gameboard.getShipPossiblePlaces(
			x,
			y,
			length,
			direction
		);

		const hasCollision = possiblePlaces.reduce((acc, curr) => {
			const [x, y] = curr.split(",");
			const cellState = this.checkShipCellByPlayerIndex(
				Number(x),
				Number(y),
				this.currPlayerIndex
			);

			if (cellState !== "water") {
				acc = true;
			}

			return acc;
		}, false);

		return hasCollision;
	}

	checkShipCellByPlayerIndex(x, y, playerIndex) {
		if (x < 0 || x > 9 || y < 0 || y > 9) return null;

		const occupiedCells = this.#players[playerIndex].gameboard.occupiedPlaces;
		const key = `${x},${y}`;

		if (occupiedCells[key] === undefined) {
			return "water";
		}

		return "ship";
	}

	checkCellByPlayerIndex(x, y, playerIndex) {
		const occupiedCells = this.#players[playerIndex].gameboard.occupiedPlaces;
		const playedCells = this.#players[playerIndex].gameboard.playedPlaces;
		const key = `${x},${y}`;

		if (!playedCells.has(key)) {
			return "initial";
		}

		if (occupiedCells[key] === undefined) {
			return "water";
		}

		return "ship";
	}

	hitCellByPlayerIndex(x, y, playerIndex) {
		const cellState = this.checkCellByPlayerIndex(x, y, playerIndex);
		if (cellState === "ship" || cellState === "water") {
			return;
		}
		const chosenPlayer = this.#players[playerIndex];

		chosenPlayer.gameboard.receiveAttack(x, y);

		if (!chosenPlayer.gameboard.isThereAnyShipLeft) {
			this.#isGameOver = true;
		}

		return true;
	}

	playedCellsByPlayerIndex(playerIndex) {
		const chosenPlayer = this.#players[playerIndex];

		return chosenPlayer.gameboard.playedPlaces;
	}

	restart() {
		this.firstPlayer.gameboard.reset();
		this.secondPlayer.gameboard.reset();
		this.setCurrPlayerIndex(this.#firstPlayerIndex);
		this.#isGameOver = false;
		this.#computerPlayStack.reset();
		this.#matchlessShipCell.clear();
		this.#players = [];
	}

	computerPlays() {
		const currPlayer = this.currPlayer;
		const opponentIndex = this.getPlayerIndex(this.opponentPlayer);

		if (!currPlayer || currPlayer.type === "real") {
			throw new Error("Tried to play with invalid player.");
		}
		if (this.#isGameOver) {
			throw new Error("The game is already over");
		}

		const opponentBoardPlayedCells =
			this.playedCellsByPlayerIndex(opponentIndex);

		if (!this.#computerPlayStack.isEmpty()) {
			return this.#playStackedMove(opponentIndex, opponentBoardPlayedCells);
		}

		while (!this.#isGameOver && opponentBoardPlayedCells.size < 100) {
			const position = this.#randomPosition();
			if (opponentBoardPlayedCells.has(position)) continue;

			if (
				this.#playPosition(position, opponentIndex, opponentBoardPlayedCells)
			) {
				return position;
			}
		}

		return false;
	}

	computerDeploysShip(size) {
		const currPlayer = this.currPlayer;

		if (
			currPlayer === undefined ||
			currPlayer.type === "real" ||
			typeof size !== "number" ||
			size < 2 ||
			size > 5
		) {
			throw new Error();
		}

		const directions = ["horizontal", "vertical"];
		const tries = {};
		let i = 0;

		while (i < 100) {
			const randX = Math.floor(Math.random() * 10);
			const randY = Math.floor(Math.random() * 10);
			const randDirection = directions[Math.floor(Math.random() * 2)];

			const attempt = `${randX},${randY},${size},${randDirection}`;

			if (tries[attempt] === true) {
				continue;
			}

			try {
				this.placeShipByPlayerIndex(
					randX,
					randY,
					size,
					randDirection,
					this.#currPlayerIndex
				);

				return true;
			} catch (_e) {
				tries[attempt] = true;
				i++;
				continue;
			}
		}
	}

	getAdjCells(position) {
		if (typeof position !== "string") {
			throw new Error();
		}
		const [x, y] = position.split(",");
		const terms = [-1, 1];
		const output = [];

		for (const term of terms) {
			const xWithTerm = Number(x) + term;
			const yWithTerm = Number(y) + term;

			if (xWithTerm >= 0 && xWithTerm < 10) {
				const adjCell = `${xWithTerm},${y}`;
				output.push(adjCell);
			}

			if (yWithTerm >= 0 && yWithTerm < 10) {
				const adjCell = `${x},${yWithTerm}`;
				output.push(adjCell);
			}
		}

		return output;
	}

	#playStackedMove(opponentIndex, opponentBoardPlayedCells) {
		const position = this.#computerPlayStack.pop();
		const [x, y] = position.split(",").map(Number);

		const shipsBefore = this.opponentPlayer.gameboard.numberOfShips;
		this.hitCellByPlayerIndex(x, y, opponentIndex);
		const shipsAfter = this.opponentPlayer.gameboard.numberOfShips;

		const cellState = this.checkCellByPlayerIndex(x, y, opponentIndex);

		if (cellState === "water") return position;

		if (shipsBefore !== shipsAfter) {
			this.#matchlessShipCell.clear();
			return position;
		}

		this.#matchlessShipCell.add(position);

		this.#queueAdjacentCells(position, opponentBoardPlayedCells);
		return position;
	}

	#playPosition(position, opponentIndex, opponentBoardPlayedCells) {
		const [x, y] = position.split(",").map(Number);
		const hit = this.hitCellByPlayerIndex(x, y, opponentIndex);
		opponentBoardPlayedCells.add(position);

		if (!hit) return false;

		const cellState = this.checkCellByPlayerIndex(x, y, opponentIndex);
		if (cellState === "ship") {
			this.#queueAdjacentCells(position, opponentBoardPlayedCells);
			this.#matchlessShipCell.add(position);
		}
		return true;
	}

	#queueAdjacentCells(position, opponentBoardPlayedCells) {
		let adjCells = this.getAdjCells(position);

		let alignmentAxis;

		if (this.#matchlessShipCell.size > 1) {
			const reg = {};
			const cells = [...this.#matchlessShipCell];
			cells.forEach(position => {
				const [x, y] = position.split(",").map(Number);

				if (reg["x"] === undefined) {
					reg["x"] = x;
				} else if (reg["x"] === x) {
					alignmentAxis = {
						axis: "x",
						value: x,
					};
				}

				if (reg["y"] === undefined) {
					reg["y"] = y;
				} else if (reg["y"] === y) {
					alignmentAxis = {
						axis: "y",
						value: y,
					};
				}
			});

			adjCells = adjCells.filter(position => {
				const [x, y] = position.split(",").map(Number);

				if (alignmentAxis.axis === "x") {
					if (alignmentAxis.value === x) {
						return true;
					}
				} else if (alignmentAxis.axis === "y") {
					if (alignmentAxis.value === y) {
						return true;
					}
				}
			});
		}
		for (const cell of adjCells) {
			if (!opponentBoardPlayedCells.has(cell)) {
				this.#computerPlayStack.push(cell);
			}
		}
	}

	#randomPosition() {
		const x = Math.floor(Math.random() * 10);
		const y = Math.floor(Math.random() * 10);
		return `${x},${y}`;
	}
}
