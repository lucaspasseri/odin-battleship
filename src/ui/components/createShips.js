import { createDropTargetGrid, createDraggableShip } from "./index.js";

export default function createShips() {
	const container = document.createElement("div");
	container.className = "h-[300px] px-[4em] py-[1em] relative";

	const h3 = document.createElement("h3");
	h3.textContent = "Create ship";
	h3.className = "text-2xl mb-[0.4em]";

	const ship = createDraggableShip(3, "horizontal", 99);
	const ship2 = createDraggableShip(5, "vertical", 100);

	const grid = createDropTargetGrid();

	container.append(h3, ship, ship2, grid);

	return container;
}
