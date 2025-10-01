import Gameboard from "./Gameboard";

export default class Player {
	#playerType;
	#gameboard;

	constructor(playerType) {
		if (playerType !== "real" && playerType !== "computer") {
			throw new Error("Invalid Player type");
		}
		this.#playerType = playerType;
		this.#gameboard = new Gameboard();
	}

	get gameboard() {
		return this.#gameboard;
	}
}
