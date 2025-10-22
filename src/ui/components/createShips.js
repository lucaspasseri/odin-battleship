import { state } from "../../core/index.js";
import {
	createDropTargetGrid,
	createDraggableShip,
	createPlayerProfile,
} from "./index.js";

export default function createShips() {
	const container = document.createElement("div");
	container.className = "px-[4em] py-[1em] flex flex-col";

	const h3 = document.createElement("h3");
	h3.textContent = "Deploy ship";
	h3.className = "font-mono text-2xl text-blue-600 font-bold mb-[1em]";

	const currPlayer = state.game.currPlayer;

	console.log({ currPlayer });

	const currPlayerContainer = document.createElement("div");
	currPlayerContainer.className = "flex flex-1 flex-wrap gap-[2em]";

	const playerProfileWrapper = document.createElement("div");
	playerProfileWrapper.className = "flex flex-col gap-[2em]";

	const h4 = document.createElement("h4");
	h4.textContent = "Current player:";
	h4.className = "font-mono text-xl text-blue-600 font-bold";

	const playerProfile = createPlayerProfile(currPlayer);

	playerProfileWrapper.append(h4, playerProfile);

	const shipsContainer = document.createElement("div");
	shipsContainer.className =
		"flex flex-col gap-[3em] min-w-[200px] min-h-[300px] flex-1 border-4 border-red-800";

	const h5 = document.createElement("h5");
	h5.textContent = "Drag the ships and drop them on the board:";
	h5.className = "font-mono text-lg text-blue-600 font-bold";

	shipsContainer.appendChild(h5);

	for (let i = 2; i < 6; i++) {
		const shipWrapper = document.createElement("div");
		shipWrapper.className = "relative flex ";
		const shipH = createDraggableShip(
			i,
			"horizontal",
			`ship-${currPlayer.id}-h${i}`
		);

		const shipV = createDraggableShip(
			i,
			"vertical",
			`ship-${currPlayer.id}-v${i}`,
			`top-[-${2.18 * i - 2.1}em] left-[${3 * i}em]`
		);
		shipWrapper.append(shipH, shipV);

		shipsContainer.appendChild(shipWrapper);
	}

	currPlayerContainer.append(playerProfileWrapper, shipsContainer);

	const grid = createDropTargetGrid();

	const main = document.createElement("div");
	main.className = "flex flex-wrap gap-[2em] border-4 border-orange-800";
	main.id = "deployShipMain";

	main.append(currPlayerContainer, grid);

	container.append(h3, main);

	return container;
}
