import { state } from "../../core/index.js";
import { goToPage } from "../index.js";

export default function restartButton() {
	const buttonContainer = document.createElement("div");
	buttonContainer.id = "restartButtonContainer";
	buttonContainer.className = "px-[4em] py-[2em] mb-[2em] flex justify-end";
	const restartButton = document.createElement("button");
	restartButton.className = `rounded-2xl w-fit text-2xl px-[0.8em] py-[0.3em] font-mono border-[0.1em] border-black ${
		state.game.isGameOver ? "bg-green-400" : "bg-gray-500"
	}`;

	restartButton.textContent = "Restart";

	restartButton.addEventListener("click", () => {
		if (state.game.isGameOver) {
			state.game.restart();
			goToPage("initialPage");
		}
	});

	buttonContainer.appendChild(restartButton);

	return buttonContainer;
}
