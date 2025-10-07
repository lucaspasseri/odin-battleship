export default class BattleShip {
	#players = [];
	#currRound = 0;
	#currPlayer;
	#phase = "initial";

	constructor() {}

	get players() {
		return [...this.#players];
	}

	get currentPlayer() {
		return this.#currPlayer;
	}

	get phase() {
		return this.#phase;
	}

	addPlayer(player) {
		if (this.#players.length === 0) {
			this.#currPlayer = player;
		}

		this.#players.push(player);
	}

	playRound() {
		this.#currRound += 1;
		this.#currPlayer = this.players[this.#currRound % this.#players.length];
	}

	nextPhase() {
		switch (this.#phase) {
			case "initial":
				this.#phase = "shipPlacement";
				break;
			case "shipPlacement":
				this.#phase = "fight";
				break;
			case "fight":
				this.#phase = "end";
				break;
		}
		return this.#phase;
	}
}
