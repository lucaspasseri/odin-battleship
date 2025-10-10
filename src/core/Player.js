import Gameboard from "./Gameboard.js";

export default class Player {
	#playerName;
	#playerType;
	#gameboard;

	constructor(type, name = "(default)") {
		if (type !== "real" && type !== "computer") {
			throw new Error("Invalid Player type");
		}
		this.#playerName = name;
		this.#playerType = type;
		this.#gameboard = new Gameboard();
	}

	get gameboard() {
		return this.#gameboard;
	}

	get name() {
		return this.#playerName;
	}

	get type() {
		return this.#playerType;
	}
}
