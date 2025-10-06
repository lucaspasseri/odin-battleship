export default class GameboardInterface {
	#player;
	#gameboard;
	#playedCells = {};

	constructor(player) {
		this.#player = player;
		this.#gameboard = player.gameboard;
	}

	checkCell(x, y) {
		const currCell = `${x},${y}`;

		if (this.#playedCells[currCell] === undefined) {
			return "initial";
		}

		if (this.#gameboard.occupiedPlaces[currCell] === undefined) {
			return "water";
		}

		if (this.#gameboard.occupiedPlaces[currCell] === false) {
			// ENFASE
			return "ship";
		}

		return "ship";
	}

	get gameboard() {
		return this.#gameboard;
	}

	get player() {
		return this.#player;
	}

	hit(x, y) {
		const cellState = this.checkCell(x, y);

		let attack;

		if (cellState === "initial") {
			try {
				attack = this.#gameboard.receiveAttack(x, y);
			} catch (e) {
				throw e;
			} finally {
				if (attack === undefined || attack === false) {
					this.#playedCells[`${x},${y}`] = "water";
				} else {
					this.#playedCells[`${x},${y}`] = "ship";
				}
				return true;
			}
		}

		return false;
	}
}
