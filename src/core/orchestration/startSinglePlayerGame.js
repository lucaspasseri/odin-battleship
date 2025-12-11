import { state } from "../index.js";
import { range } from "../../util/range.js";

export default function startSinglePlayerGame() {
	state.game.addPlayer("P1", "real", "1");
	state.game.addPlayer("P2", "computer", "2");

	state.game.changePlayer();
	range(2, 6, 1).forEach(size => {
		state.game.computerDeploysShip(size);
	});
	state.game.changePlayer();
}
