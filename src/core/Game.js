import Player from "./Player.js";
export default class Game {
	#players = [];
	#firstPlayerIndex;
	#secondPlayerIndex;
	#currPlayerIndex;

	#isGameOver = false;

	constructor() {}

	get players() {
		return [...this.#players];
	}

	get firstPlayer() {
		return this.#players[this.#firstPlayerIndex];
	}

	get firstPlayerIndex() {
		return this.#firstPlayerIndex;
	}

	get secondPlayer() {
		return this.#players[this.#secondPlayerIndex];
	}

	get secondPlayerIndex() {
		return this.#secondPlayerIndex;
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

	get isGameOver() {
		return this.#isGameOver;
	}

	changePlayer() {
		this.#currPlayerIndex = (this.#currPlayerIndex + 1) % this.#players.length;
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

	addPlayer(name, type) {
		const newPlayer = new Player(type, name);
		this.#players.push(newPlayer);
		if (this.#players.length === 1) {
			this.#currPlayerIndex = 0;
			this.#firstPlayerIndex = 0;
		} else if (this.#players.length === 2) {
			this.#secondPlayerIndex = 1;
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
		const opponent =
			this.#players[(this.#currPlayerIndex + 1) % this.#players.length];

		if (this.currPlayer === opponent) {
			throw new Error();
		}

		const occupiedCells = opponent.gameboard.occupiedPlaces;

		const playedCells = opponent.gameboard.playedPlaces;

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

		const opponent =
			this.#players[(this.#currPlayerIndex + 1) % this.#players.length];

		if (this.currPlayer === opponent) {
			throw new Error();
		}

		opponent.gameboard.receiveAttack(x, y);
		if (!opponent.gameboard.isThereAnyShipLeft) {
			this.#isGameOver = true;
		}
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
}
