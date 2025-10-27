import { state } from "../../core/index.js";
import {
	createPlayerProfile,
	newDraggableShip,
	newDropTargetGrid,
} from "./index.js";

export default function createShips() {
	const container = document.createElement("div");
	container.className = "px-[4em] py-[1em] flex flex-col relative";

	const h3 = document.createElement("h3");
	h3.textContent = "Deploy ship";
	h3.className = "font-mono text-2xl text-blue-600 font-bold mb-[1em]";

	const currPlayer = state.game.currPlayer;

	const playerProfileWrapper = document.createElement("div");
	playerProfileWrapper.className = "flex flex-col gap-[2em] flex-0";

	const h4 = document.createElement("h4");
	h4.textContent = "Current player:";
	h4.className = "font-mono text-xl text-blue-600 font-bold";

	const playerProfile = createPlayerProfile(currPlayer);

	playerProfileWrapper.append(h4, playerProfile);

	const shipsContainer = document.createElement("div");
	shipsContainer.className =
		"flex flex-col gap-[3em] min-w-[310px] min-h-[300px] flex-1";

	const h5 = document.createElement("h5");
	h5.textContent =
		"Drag the ships and drop them on the board. You can press Shift on your keyboard to rotate the ship.";
	h5.className = "font-mono text-lg text-blue-600 font-bold";

	shipsContainer.appendChild(h5);

	for (let i = 2; i < 6; i++) {
		const shipWrapper = document.createElement("div");
		shipWrapper.className = "relative flex";
		const ship = newDraggableShip(i, `ship-${currPlayer.id}-${i}`);

		shipWrapper.append(ship);

		shipsContainer.appendChild(shipWrapper);
	}

	const grid = newDropTargetGrid();

	const deployShipContainer = document.createElement("div");
	deployShipContainer.id = "deployShipContainer";
	deployShipContainer.className =
		"flex flex-1 flex-wrap min-w-[510px] gap-[3em]";
	deployShipContainer.append(shipsContainer, grid);

	const main = document.createElement("div");
	main.className = "flex flex-wrap-reverse gap-[3em]";
	main.id = "deployShipMain";

	main.append(playerProfileWrapper, deployShipContainer);

	container.append(h3, main);

	return container;
}
