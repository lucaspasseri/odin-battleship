export default class Ship {
	#length = 0;
	#hitNumber = 0;
	constructor(length) {
		if (
			typeof length !== "number" ||
			Number.isNaN(length) ||
			length < 1 ||
			length > 10
		) {
			throw new Error();
		}
		this.#length = length;
	}

	get length() {
		return this.#length;
	}

	get hitNumber() {
		return this.#hitNumber;
	}

	isSunk() {
		return this.#hitNumber >= this.#length;
	}

	hit() {
		if (!this.isSunk()) {
			this.#hitNumber += 1;
		}
	}
}
