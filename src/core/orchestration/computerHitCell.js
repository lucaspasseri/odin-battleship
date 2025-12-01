import { state } from "../index.js";

export default async function computerHitCell() {
	state.game.changePlayer();
	const positionHit = state.game.computerPlays();

	if (positionHit === false) {
		return false;
	}

	state.game.changePlayer();

	return await new Promise(resolve => {
		setTimeout(() => {
			resolve(positionHit);
		}, 600);
	});
}
