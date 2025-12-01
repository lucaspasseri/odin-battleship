import { state } from "../index.js";

export default function computerHitCell() {
	state.game.changePlayer();
	const positionHit = state.game.computerPlays();

	state.game.changePlayer();
	return positionHit;
}
