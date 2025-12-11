import { state } from "../index.js";
import { range } from "../../util/range.js";

export default function startMultiPlayerGame(playerFormObj) {
	if (playerFormObj === undefined) return;
	const { p1Name, p1Type, p1FrameIndex, p2Name, p2Type, p2FrameIndex } =
		playerFormObj;
	console.log({ p1Name, p1Type, p1FrameIndex, p2Name, p2Type, p2FrameIndex });
	state.game.addPlayer(p1Name, p1Type, p1FrameIndex);
	state.game.addPlayer(p2Name, p2Type, p2FrameIndex);

	if (p1Type === "computer") {
		range(2, 6, 1).forEach(size => {
			state.game.computerDeploysShip(size);
		});
	}

	if (p2Type === "computer") {
		state.game.changePlayer();
		range(2, 6, 1).forEach(size => {
			state.game.computerDeploysShip(size);
		});
		state.game.changePlayer();
	}

	return true;
}
