import { state } from "../../core/index.js";
import { goToPage } from "../../ui/index.js";

export default function deployShipButton() {
	const container = document.createElement("div");
	container.className = "text-end py-[3em]";
	container.id = "deployShipButton";

	const deployShipsButton = document.createElement("button");
	deployShipsButton.textContent = "Deploy ships";
	deployShipsButton.className =
		"rounded-2xl w-fit text-2xl px-[0.6em] py-[0.2em] font-mono bg-green-400 bottom-[-70px] border-[0.1em] border-black";

	const isDisabled =
		state.game.firstPlayer === undefined ||
		state.game.secondPlayer === undefined ||
		state.game.firstPlayer === state.game.secondPlayer;

	deployShipsButton.disabled = isDisabled;

	if (isDisabled) {
		deployShipsButton.classList.replace("bg-green-400", "bg-gray-400");
	}

	deployShipsButton.addEventListener("click", () => {
		goToPage("deployShipsPage");
	});

	container.appendChild(deployShipsButton);

	return container;
}
