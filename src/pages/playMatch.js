import goToPage from "../ui/goToPage.js";
import { state } from "../core/index.js";
import { range } from "../util/range.js";
import { grid } from "../ui/components/index.js";
export default function playMatch() {
	const container = document.createElement("div");
	container.className = "px-[1em] md:px-[4em] py-[1em] flex gap-[2em] flex-col";

	const h2 = "Play match";

	const gridsContainer = document.createElement("div");
	gridsContainer.className = "border flex justify-center gap-[2em] p-[2em]";

	const grid1Container = document.createElement("div");
	grid1Container.id = `gridContainer-${state.game.firstPlayerIndex}`;

	const grid1 = grid("playMatch", state.game.firstPlayerIndex);

	grid1Container.appendChild(grid1);

	const grid2Container = document.createElement("div");
	grid2Container.id = `gridContainer-${state.game.secondPlayerIndex}`;

	const grid2 = grid("playMatch", state.game.secondPlayerIndex);

	grid2Container.appendChild(grid2);

	gridsContainer.append(grid1Container, grid2Container);

	const restartButton = document.createElement("button");
	restartButton.textContent = "Restart";
	restartButton.addEventListener("click", () => {
		state.game.restart();
		goToPage("gameMode");
	});

	container.append(h2, gridsContainer, restartButton);
	return container;
}
