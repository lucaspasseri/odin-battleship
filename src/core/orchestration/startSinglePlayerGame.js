import { state } from "../index.js";

export default function startSinglePlayerGame() {
	state.game.addPlayer("P1", "real", "");
	state.game.addPlayer("P2", "computer", "");
}
