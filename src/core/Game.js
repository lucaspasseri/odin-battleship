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
		console.log({ name, type });
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
}
