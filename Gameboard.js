import Ship from "./Ship";

export default class Gameboard {
	#missedAttacks = [];
	#occupiedPlaces = {};
	#numberOfShips = 0;
	constructor(value) {
		if (value !== undefined) throw new Error();
	}

	get missedAttacks() {
		return [...this.#missedAttacks];
	}

	receiveAttack(x, y) {
		if (
			typeof x !== "number" ||
			Number.isNaN(x) ||
			typeof y !== "number" ||
			Number.isNaN(y)
		) {
			throw new Error();
		}

		if (x < 0 || x > 9 || y < 0 || y > 9) {
			throw new Error();
		}

		const place = `${x},${y}`;
		const currShip = this.#occupiedPlaces[place];
		if (currShip === undefined) {
			if (!this.#missedAttacks.includes(place)) {
				this.#missedAttacks.push(place);
			}
			return;
		}

		if (currShip === false) {
			return;
		}

		currShip.hit();
		this.#occupiedPlaces[place] = false;

		if (currShip.isSunk()) {
			this.#numberOfShips -= 1;
		}
	}

	placeShip(x, y, shipLength = 1, direction = "horizontal") {
		const startPlace = `${x},${y}`;
		if (this.#occupiedPlaces[startPlace] === undefined) {
			const newShip = new Ship(shipLength);
			this.#numberOfShips += 1;

			let i = 0;
			while (i < shipLength) {
				if (direction === "horizontal") {
					const currPlace = `${x + i},${y}`;
					this.#occupiedPlaces[currPlace] = newShip;
				} else {
					const currPlace = `${x},${y + i}`;
					this.#occupiedPlaces[currPlace] = newShip;
				}
				i += 1;
			}
		}
	}

	isThereAnyShipLeft() {
		return this.#numberOfShips > 0;
	}
}
