import { state } from "../../core/index.js";
import { range } from "../../util/range.js";

export default function grid(type = "shipDeployment", gameboardIndex) {
	let container;

	if (type === "shipDeployment") {
		container = document.createElement("div");
		container.id = "shipDeploymentGrid";
		container.className =
			"grid grid-cols-10 p-[0.2em] gap-[0.2em] min-w-[282px] border-white border-[0.2em]";

		range(100).forEach(index => {
			const cell = document.createElement("div");
			cell.className = "w-6 h-6 gridCell sm:w-10 sm:h-10 outline-0";

			const x = index % 10;
			const y = 9 - Math.floor(index / 10);

			const cellState = state.game.checkShipCellByPlayerIndex(
				x,
				y,
				state.game.currPlayerIndex
			);
			cell.classList.add(cellState);
			cell.id = `gridCell_${x}-${y}`;
			cell.dataset.x = x;
			cell.dataset.y = y;

			container.appendChild(cell);
		});
	} else {
		container = document.createElement("div");
		container.id = `playMatchGrid-${gameboardIndex}`;
		container.className =
			"grid grid-cols-10 p-[0.2em] gap-[0.2em] w-fit border-white border-[0.2em]";

		if (gameboardIndex !== state.game.currPlayerIndex) {
			container.classList.add("playableGrid");
		}

		range(100).forEach(index => {
			const cell = document.createElement("div");
			cell.className = "w-6 h-6 gridCell";

			const x = index % 10;
			const y = 9 - Math.floor(index / 10);

			const cellState = state.game.checkCellByPlayerIndex(x, y, gameboardIndex);
			cell.classList.add(cellState);
			cell.id = `gridCell_${x}-${y}`;
			cell.dataset.x = x;
			cell.dataset.y = y;

			cell.addEventListener("click", () => {
				if (gameboardIndex === state.game.currPlayerIndex) return;

				const hitAnInitialStateCell = state.game.hitCellByPlayerIndex(
					x,
					y,
					gameboardIndex
				);

				if (!hitAnInitialStateCell) return;

				const parentNode = document.querySelector(
					`#gridContainer-${gameboardIndex}`
				);

				const oldGrid = document.querySelector(
					`#playMatchGrid-${gameboardIndex}`
				);
				const newGrid = grid("playMatch", gameboardIndex);

				newGrid.classList.remove("playableGrid");
				const currentPlayerGrid = document.querySelector(
					`#playMatchGrid-${state.game.currPlayerIndex}`
				);

				currentPlayerGrid.classList.add("playableGrid");

				parentNode.replaceChild(newGrid, oldGrid);

				state.game.changePlayer();
			});

			container.appendChild(cell);
		});
	}

	return container;
}
