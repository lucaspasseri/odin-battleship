import { state } from "../../core/index.js";
import { updateDeployShipGrid, updateNextPlayerButton } from "./constants.js";

export default function createDropTargetGrid() {
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

		const cellState = state.game.checkShipCellByPlayerIndex(
			x,
			y,
			state.game.currPlayerIndex
		);

		cell.className = `w-10 h-10 ${cellState} rounded hover:cursor-no-drop`;
		cell.addEventListener("dragover", e => {
			e.preventDefault();
		});
		cell.addEventListener("dragenter", () => {
			cell.classList.add("border-[0.4em]", "border-blue-800", "border-double");
		});
		cell.addEventListener("dragleave", () => {
			cell.classList.remove(
				"border-[0.4em]",
				"border-blue-800",
				"border-dotted"
			);
		});

		cell.addEventListener("drop", e => {
			e.preventDefault();
			cell.classList.remove(
				"border-[0.4em]",
				"border-blue-800",
				"border-dotted"
			);
			const ship = JSON.parse(e.dataTransfer.getData("ship"));

			let error = null;

			try {
				state.game.currPlayer.gameboard.placeShip(
					x,
					y,
					ship.size,
					ship.direction
				);
			} catch (e) {
				const err = new Error();
				error = err;
				throw err;
			} finally {
				if (error === null) {
					updateDeployShipGrid();
					const shipH = `ship-${state.game.currPlayer.id}-h${ship.size}`;
					const shipV = `ship-${state.game.currPlayer.id}-v${ship.size}`;
					const shipHInterface = document.querySelector(`#${shipH}`);
					const shipVInterface = document.querySelector(`#${shipV}`);
					shipHInterface.remove();
					shipVInterface.remove();
					updateNextPlayerButton();
				}
			}
		});
		grid.appendChild(cell);
	}
	container.appendChild(grid);

	return container;
}
