import { state } from "../index.js";

export default function startMultiPlayerGame() {
	state.game.addPlayer("P1", "real", "");
	state.game.addPlayer("P2", "real", "");
}
