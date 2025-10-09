import Player from "./Player.js";

export default class Game {
	#players = [];
	#currPlayerIndex;

	constructor() {}

	get players() {
		return [...this.#players];
	}

	get currPlayer() {
		return this.#players[this.#currPlayerIndex];
	}

	get numberOfShips() {
		return this.#players[this.#currPlayerIndex].gameboard.numberOfShips;
	}

	get isThereAnyShipLeft() {
		return this.numberOfShips > 0;
	}

	get playedCells() {
		return this.#players[this.#currPlayerIndex].gameboard.playedPlaces;
	}

	changePlayer() {
		this.#currPlayerIndex = (this.#currPlayerIndex + 1) % this.#players.length;
	}

	addPlayer(name, type) {
		const newPlayer = new Player(type, name);
		this.#players.push(newPlayer);
		if (this.#players.length === 1) {
			this.#currPlayerIndex = 0;
		}
	}
	placeShip(x, y, length, direction) {
		this.#players[this.#currPlayerIndex].gameboard.placeShip(
			x,
			y,
			length,
			direction
		);
	}

	checkCell(x, y) {
		const occupiedCells =
			this.#players[this.#currPlayerIndex].gameboard.occupiedPlaces;
		const playedCells =
			this.#players[this.#currPlayerIndex].gameboard.playedPlaces;
		const key = `${x},${y}`;

		if (!playedCells.has(key)) {
			return "initial";
		}

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

	hitCell(x, y) {
		const cellState = this.checkCell(x, y);
		if (cellState === "ship" || cellState === "water") {
			return;
		}

		this.#players[this.#currPlayerIndex].gameboard.receiveAttack(x, y);
	}

	hitCellByPlayerIndex(x, y, playerIndex) {
		const cellState = this.checkCellByPlayerIndex(x, y, playerIndex);
		if (cellState === "ship" || cellState === "water") {
			return;
		}
		this.#players[playerIndex].gameboard.receiveAttack(x, y);
		this.changePlayer();
	}
}
