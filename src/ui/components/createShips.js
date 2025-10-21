import { state } from "../../core/index.js";
import { createDropTargetGrid, createDraggableShip } from "./index.js";

export default function createShips() {
	const container = document.createElement("div");
	container.className = "px-[4em] py-[1em]";

	const h3 = document.createElement("h3");
	h3.textContent = "Deploy ship";
	h3.className = "text-2xl mb-[0.4em]";

	const currPlayer = state.game.currPlayer;

	console.log({ currPlayer });
	const shipContainer = document.createElement("div");
	shipContainer.className =
		"flex flex-col gap-[3em] border border-red-700 flex-1";

	for (let i = 2; i < 6; i++) {
		const shipWrapper = document.createElement("div");
		shipWrapper.className = "relative w-fit";
		const ship = createDraggableShip(
			i,
			"horizontal",
			`ship-${currPlayer.name}-${i}`
		);
		shipWrapper.appendChild(ship);

		shipContainer.appendChild(shipWrapper);
	}

	const grid = createDropTargetGrid();

	const main = document.createElement("div");
	main.className = "flex";
	main.id = "deployShipMain";

	main.append(shipContainer, grid);

	container.append(h3, main);

	return container;
}
