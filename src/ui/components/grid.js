import { state } from "../../core/index.js";
import computerHitCell from "../../core/orchestration/computerHitCell.js";
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

			console.log({ x, y });

			cell.addEventListener("click", () => {
				if (
					gameboardIndex === state.game.currPlayerIndex ||
					state.game.isGameOver
				)
					return;

				const x = Number(cell.dataset.x);
				const y = Number(cell.dataset.y);
				console.log({ x, y });

				const hitAnInitialStateCell = state.game.hitCellByPlayerIndex(
					x,
					y,
					gameboardIndex
				);

				if (!hitAnInitialStateCell) return;

				console.log(1);

				const newCellState = state.game.checkCellByPlayerIndex(
					x,
					y,
					gameboardIndex
				);

				console.log({ newCellState });
				cell.classList.remove("initial");
				cell.classList.add(newCellState);

				container.classList.remove("playableGrid");
				const otherGrid = document.querySelector(
					`#playMatchGrid-${state.game.currPlayerIndex}`
				);

				otherGrid.classList.add("playableGrid");

				const positionHit = computerHitCell();

				if (positionHit === false) {
					throw new Error("Error on computerPlays");
				}
				const [otherX, otherY] = positionHit.split(",");

				const currPlayerCell = document.querySelector(
					`#playMatchGrid-${state.game.currPlayerIndex} > #gridCell_${otherX}-${otherY}`
				);

				console.log({ currPlayerCell });

				const currPlayerNewCellState = state.game.checkCellByPlayerIndex(
					Number(otherX),
					Number(otherY),
					state.game.currPlayerIndex
				);

				console.log({ currPlayerNewCellState });
				currPlayerCell.classList.remove("initial");
				currPlayerCell.classList.add(currPlayerNewCellState);
				console.log(positionHit);

				otherGrid.classList.remove("playableGrid");
				container.classList.add("playableGrid");
			});

			container.appendChild(cell);
		});
	}

	return container;
}
