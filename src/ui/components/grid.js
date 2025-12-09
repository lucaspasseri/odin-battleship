import { state } from "../../core/index.js";
import { range } from "../../util/range.js";
import { attackGridCell } from "../constants/playMatch.js";

export default function grid(type = "shipDeployment", gameboardIndex) {
	const currPlayerIndex = state.game.currPlayerIndex;
	let container;

	if (type === "shipDeployment") {
		container = document.createElement("div");
		container.id = "shipDeploymentGrid";
		container.className =
			"grid grid-cols-10 p-[0.2em] gap-[0.2em] min-w-[282px] border-[var(--color)] border-[0.4em]";

		range(100).forEach(index => {
			const cell = document.createElement("div");
			cell.className = "w-6 h-6 gridCell sm:w-10 sm:h-10 outline-0 bottomLayer";

			const x = index % 10;
			const y = 9 - Math.floor(index / 10);

			const cellState = state.game.checkShipCellByPlayerIndex(
				x,
				y,
				currPlayerIndex
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
			"grid grid-cols-10 p-[0.2em] gap-[0.2em] border-white border-[0.2em] min-w-[282px] sm:min-w-[441px]";

		if (gameboardIndex !== currPlayerIndex) {
			container.classList.add("playableGrid");
		}

		range(100).forEach(index => {
			const cell = document.createElement("div");
			cell.className = "w-6 h-6 gridCell flex relative sm:w-10 sm:h-10";

			const x = index % 10;
			const y = 9 - Math.floor(index / 10);

			cell.id = `gridCell_${x}-${y}`;
			cell.dataset.x = x;
			cell.dataset.y = y;

			cell.addEventListener("click", () => {
				attackGridCell(x, y, gameboardIndex);
			});

			const topLayer = document.createElement("div");
			topLayer.className =
				"bg-white flex-1 topLayer absolute inset-0 rounded z-[2]";
			const bottomLayer = document.createElement("div");

			const cellState = state.game.checkShipCellByPlayerIndex(
				x,
				y,
				gameboardIndex
			);
			bottomLayer.className = `${cellState} inset-0 bottomLayer rounded absolute z-[1]`;

			cell.append(topLayer, bottomLayer);

			container.appendChild(cell);
		});
	}

	return container;
}
