import { state } from "../../core/index.js";
import goToPage from "../goToPage.js";

export default function shimmerButton(textContent, disabled, specificType) {
	const container = document.createElement("div");
	container.className = "flex justify-center";

	const button = document.createElement("button");
	button.className =
		"relative overflow-hidden rounded-[200px] border-[var(--color)] border-[0.1em] px-[1em] py-[0.3em] text-2xl";
	button.disabled = disabled;
	button.classList.add(disabled ? "bg-gray-700" : "slidingOverBtn");

	const movingDiv = document.createElement("div");
	movingDiv.className = "absolute inset-0 z-[1]";

	if (!disabled) {
		movingDiv.classList.add("slidingOver");
	}

	const staticDiv = document.createElement("div");
	staticDiv.className = "relative z-[10]";
	staticDiv.textContent = textContent;

	if (specificType === "playersFormSubmitter") {
		container.id = specificType;
		button.type = "submit";
		button.setAttribute("form", "playersForm");
	}

	if (specificType === "nextButton") {
		container.id = specificType;
		button.addEventListener("click", () => {
			state.game.changePlayer();
			goToPage("deployShips");
		});
	}

	if (specificType === "restartButton") {
		button.addEventListener("click", () => {
			state.game.restart();
			goToPage("gameMode");
		});
	}
	button.append(movingDiv, staticDiv);
	container.appendChild(button);

	return container;
}
