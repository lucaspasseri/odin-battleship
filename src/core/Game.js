import { Player } from "./index.js";
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

	checkShipCellByPlayerIndex(x, y, playerIndex) {
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
		this.#isGameOver = false;
	}

	computerPlays() {
		if (this.currPlayer === undefined || this.currPlayer.type === "real") {
			throw new Error("Tried to play with invalid player.");
		}

		if (this.#isGameOver) {
			throw new Error("The game is already over");
		}

		while (this.#isGameOver === false) {
			const randX = Math.floor(Math.random() * 10);
			const randY = Math.floor(Math.random() * 10);

			const hit = this.hitCellByPlayerIndex(
				randX,
				randY,
				this.getPlayerIndex(this.opponentPlayer)
			);

			if (hit === true) {
				return true;
			}
		}

		return false;
	}
}
