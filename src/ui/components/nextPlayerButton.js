import { state } from "../../core/index.js";
import goToPage from "../goToPage.js";

export default function nextPlayerButton() {
	const container = document.createElement("div");
	container.className = "px-[4em] flex justify-end";
	container.id = "nextPlayerButton";

	const isSecondPlayerDeployingShips =
		state.game.currPlayer === state.game.secondPlayer;

	const nextPlayerButton = document.createElement("button");
	nextPlayerButton.textContent = `${
		isSecondPlayerDeployingShips ? "Play!!!" : "Next player"
	}`;

	const wereAllShipsDeployer =
		state.game.getShips(state.game.currPlayerIndex).length === 4;

	nextPlayerButton.disabled = !wereAllShipsDeployer;
	nextPlayerButton.className = `rounded-2xl w-fit text-2xl px-[0.8em] py-[0.3em] font-mono border-[0.1em] border-black ${
		wereAllShipsDeployer ? "bg-green-400" : "bg-gray-500"
	}`;

	nextPlayerButton.addEventListener("click", () => {
		state.game.changePlayer();
		if (isSecondPlayerDeployingShips) {
			goToPage("mainPage");
		} else {
			goToPage("deployShipsPage");
		}
	});

	container.appendChild(nextPlayerButton);
	return container;
}
