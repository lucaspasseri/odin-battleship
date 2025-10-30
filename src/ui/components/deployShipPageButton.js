import { state } from "../../core/index.js";
import { basicButton } from "./index.js";
import goToPage from "../../ui/goToPage.js";

export default function deployShipPageButton() {
	const isFirstPlayer = state.game.currPlayer === state.game.firstPlayer;
	const shipThreshold = 4;
	const isDisabled =
		state.game.getShips(state.game.currPlayerIndex).length !== shipThreshold;
	const nextPlayerIsComputerType =
		state.game.opponentPlayer.type === "computer";

	if (isFirstPlayer) {
		return basicButton(
			nextPlayerIsComputerType ? "Play!" : "Next player",
			() => {
				state.game.changePlayer();
				goToPage("deployShipsPage");
			},
			`rounded-2xl w-fit text-2xl px-[0.8em] py-[0.3em] font-mono border-[0.1em] border-black ${
				isDisabled ? "bg-gray-500" : "bg-green-400"
			} `,
			"px-[4em] flex justify-end",
			"deployShipPageButton",
			isDisabled
		);
	}

	return basicButton(
		"Play!",
		() => {
			state.game.changePlayer();
			goToPage("mainPage");
		},
		`rounded-2xl w-fit text-2xl px-[0.8em] py-[0.3em] font-mono border-[0.1em] border-black ${
			isDisabled ? "bg-gray-500" : "bg-green-400"
		} `,
		"px-[4em] flex justify-end",
		"deployShipPageButton",
		isDisabled
	);
}
