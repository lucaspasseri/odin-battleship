import { state } from "../../core/index.js";
import goToPage from "../goToPage.js";
import { updateDeployShipGrid } from "./constants.js";

export default function createDropTargetGrid() {
	const ROWS = 10;
	const COLS = 10;

	const container = document.createElement("div");
	container.className = "border-4 border-black p-2 bg-red-500 w-fit ml-auto";
	container.id = "dropTargetGrid";

	const grid = document.createElement("div");
	grid.className = "grid grid-cols-10 gap-[0.3em]";

	for (let i = 0; i < ROWS * COLS; i++) {
		const cell = document.createElement("div");

		const x = i % COLS;
		const y = Math.abs(Math.floor(i / COLS) - 9);

		const cellState = state.game.checkShipCellByPlayerIndex(
			x,
			y,
			state.game.currPlayerIndex
		);

		cell.className = `w-10 h-10 ${cellState}`;
		cell.addEventListener("dragover", e => {
			e.preventDefault();
			// console.log({ dragover: e });
		});
		cell.addEventListener("dragenter", () => {
			cell.classList.add("border-8", "border-blue-800");
		});
		cell.addEventListener("dragleave", () => {
			cell.classList.remove("border-8", "border-blue-800");
		});

		cell.addEventListener("drop", e => {
			e.preventDefault();

			console.log({ drop: e });
			const ship = JSON.parse(e.dataTransfer.getData("ship"));
			console.log({ ship, x, y });

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
					const shipInterface = document.querySelector(`#${ship.id}`);
					shipInterface.remove();

					if (state.game.getShips(state.game.currPlayerIndex).length === 4) {
						if (state.game.currPlayer === state.game.secondPlayer) {
							state.game.changePlayer();
							goToPage("mainPage");
						} else {
							state.game.changePlayer();
							goToPage("deployShipsPage");
						}
					}
				}
			}
		});
		grid.appendChild(cell);
	}
	container.appendChild(grid);

	return container;
}
