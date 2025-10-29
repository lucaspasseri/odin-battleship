import { state } from "../../core/index.js";
import { updateDeployShipGrid, updateNextPlayerButton } from "./constants.js";

export default function newDropTargetGrid() {
	const ROWS = 10;
	const COLS = 10;

	const container = document.createElement("div");
	container.className = "flex items-center";
	container.id = "dropTargetGrid";

	const grid = document.createElement("div");
	grid.className =
		"grid grid-cols-10 gap-[0.4em] p-[0.8em] border-[0.4em] rounded border-white h-[490px] shrink-0";

	for (let i = 0; i < ROWS * COLS; i++) {
		const cell = document.createElement("div");

		const x = i % COLS;
		const y = Math.abs(Math.floor(i / COLS) - 9);
		cell.dataset.x = x;
		cell.dataset.y = y;

		const cellState = state.game.checkShipCellByPlayerIndex(
			x,
			y,
			state.game.currPlayerIndex
		);

		cell.className = `w-10 h-10 ${cellState} rounded hover:cursor-no-drop`;

		cell.addEventListener("mouseenter", () => {
			const draggableShip = document.querySelector(".draggableShip");
			if (draggableShip === null) return;

			const ship = JSON.parse(draggableShip?.dataset.ship);
			const isVertical = draggableShip?.classList.contains("rotate");
			const arr = state.game.currPlayer.gameboard.getShipPossiblePlaces(
				x,
				y,
				ship.size,
				isVertical ? "vertical" : "horizontal"
			);

			arr.forEach(place => {
				const [x, y] = place.split(",");

				const currCell = document.querySelector(
					`[data-x="${x}"][data-y="${y}"]`
				);
				if (currCell === null) return;
				currCell.classList.add("outline-dashed", "outline-4", "outline-black");
			});
		});

		cell.addEventListener("mouseleave", () => {
			const draggableShip = document.querySelector(".draggableShip");
			if (draggableShip === null) return;
			const ship = draggableShip
				? JSON.parse(draggableShip.dataset.ship)
				: null;
			const isVertical = draggableShip?.classList.contains("rotate");
			const arr = state.game.currPlayer.gameboard.getShipPossiblePlaces(
				x,
				y,
				ship?.size,
				isVertical ? "vertical" : "horizontal"
			);

			arr.forEach(place => {
				const [x, y] = place.split(",");

				const currCell = document.querySelector(
					`[data-x="${x}"][data-y="${y}"]`
				);

				if (currCell === null) return;
				currCell.classList.remove(
					"outline-dashed",
					"outline-4",
					"outline-black"
				);
			});
		});

		cell.addEventListener("mouseup", () => {
			const draggableShip = document.querySelector(".draggableShip");

			if (draggableShip === null) return;
			const ship = JSON.parse(draggableShip?.dataset.ship);

			const isVertical = draggableShip?.classList.contains("rotate");

			let error = null;

			try {
				state.game.currPlayer.gameboard.placeShip(
					x,
					y,
					ship.size,
					isVertical ? "vertical" : "horizontal"
				);
			} catch (e) {
				const err = new Error();
				error = err;
				updateDeployShipGrid();
				throw err;
			} finally {
				if (error === null) {
					const shipId = `ship-${state.game.currPlayer.id}-${ship.size}`;
					const shipInterface = document.querySelector(`#${shipId}`);
					shipInterface.remove();
					updateDeployShipGrid();
					updateNextPlayerButton();
				}
			}
		});

		grid.appendChild(cell);
	}
	container.appendChild(grid);

	return container;
}
