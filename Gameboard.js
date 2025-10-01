import Ship from "./Ship";

export default class Gameboard {
	#missedAttacks = [];
	#occupiedPlaces = {};
	#numberOfShips = 0;
	constructor() {}

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
		if (x < 0 || x > 9 || y < 0 || y > 9) {
			throw new Error();
		}
		if (direction !== "horizontal" && direction !== "vertical") {
			throw new Error("Invalid direction");
		}

		if (typeof shipLength !== "number" || shipLength < 1 || shipLength > 10) {
			throw new Error("Invalid shipLength");
		}
		if (direction === "horizontal" && x + shipLength > 10) {
			throw new Error();
		}
		if (direction === "vertical" && y + shipLength > 10) {
			throw new Error();
		}

		const places = this.getShipPossiblePlaces(x, y, shipLength, direction);

		places.forEach(place => {
			if (this.#occupiedPlaces[place] !== undefined) {
				throw new Error("Place already occupied by another ship");
			}
		});

		const newShip = new Ship(shipLength);
		this.#numberOfShips += 1;

		places.forEach(place => (this.#occupiedPlaces[place] = newShip));
	}

	isThereAnyShipLeft() {
		return this.#numberOfShips > 0;
	}

	getShipPossiblePlaces(x, y, length, direction) {
		const output = [];
		if (direction === "horizontal") {
			let i = 0;

			while (i < length) {
				const currPlace = `${x + i},${y}`;
				output.push(currPlace);

				i += 1;
			}
		} else if (direction === "vertical") {
			let i = 0;

			while (i < length) {
				const currPlace = `${x},${y + i}`;
				output.push(currPlace);

				i += 1;
			}
		}
		return output;
	}
}
