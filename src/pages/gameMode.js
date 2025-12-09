import goToPage from "../ui/goToPage.js";
import state from "../core/state.js";

export default function gameMode() {
	console.log({ g: state.game, p: state.game.players });

	const container = document.createElement("div");
	container.className = "px-[1em] md:px-[4em] py-[1em] flex gap-[2em] flex-col";

	const h2 = "Welcome, can we start?";

	const buttonContainer = document.createElement("div");
	buttonContainer.className = "flex justify-center";

	const button = document.createElement("button");
	button.className =
		"flex-1 rounded border-[var(--color)] border-2 bg-gray-700";
	button.textContent = "Start game";
	button.addEventListener("click", () => {
		goToPage("multiplayerPage");
	});

	buttonContainer.appendChild(button);

	container.append(h2, buttonContainer);
	return container;
}
