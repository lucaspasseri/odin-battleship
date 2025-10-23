import { Gameboard } from "./index.js";
import { paths } from "../ui/constants/paths.js";

export default class Player {
	#playerName;
	#playerType;
	#gameboard;
	#imageIndex;
	#id;

	constructor(type, name = "(default)", imageIndex = 0) {
		if (type !== "real" && type !== "computer") {
			throw new Error("Invalid Player type");
		}
		this.#playerName = name;
		this.#playerType = type;
		this.#gameboard = new Gameboard();
		this.#imageIndex = imageIndex;
		this.#id = crypto.randomUUID();
	}

	get gameboard() {
		return this.#gameboard;
	}

	get id() {
		return this.#id;
	}

	get name() {
		return this.#playerName;
	}

	get type() {
		return this.#playerType;
	}

	get imageIndex() {
		return this.#imageIndex;
	}

	get imagePath() {
		return paths[this.#imageIndex];
	}
}
