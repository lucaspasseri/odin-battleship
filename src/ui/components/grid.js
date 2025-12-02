import { state } from "../../core/index.js";
import computerHitCell from "../../core/orchestration/computerHitCell.js";
import { range } from "../../util/range.js";
import verifyGameOver from "../constants/playMatch.js";

export default function grid(type = "shipDeployment", gameboardIndex) {
	const currPlayerIndex = state.game.currPlayerIndex;
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

			cell.addEventListener("click", async () => {
				console.log(1);
				if (gameboardIndex === currPlayerIndex || verifyGameOver()) return;

				const x = Number(cell.dataset.x);
				const y = Number(cell.dataset.y);

				const hitAnInitialStateCell = state.game.hitCellByPlayerIndex(
					x,
					y,
					gameboardIndex
				);

				if (!hitAnInitialStateCell) return;

				const topLayer = document.querySelector(
					`#playMatchGrid-${gameboardIndex} > #gridCell_${x}-${y} > .topLayer`
				);

				const bottomLayer = document.querySelector(
					`#playMatchGrid-${gameboardIndex} > #gridCell_${x}-${y} > .bottomLayer`
				);

				topLayer.classList.add("fadeOutRevealed");

				setTimeout(() => {
					bottomLayer.classList.add("resizeRevealed");
				}, 400);

				const moveCounter = document.querySelector(
					`#moveCounter-${currPlayerIndex}`
				);

				moveCounter.textContent =
					state.game.playedCellsByPlayerIndex(gameboardIndex).size;

				const shipsLeft = document.querySelector(
					`#shipsLeft-${gameboardIndex}`
				);

				shipsLeft.textContent =
					state.game.opponentPlayer.gameboard.numberOfShips;

				const isGameOver = verifyGameOver();
				if (isGameOver) return;

				container.classList.remove("playableGrid");

				const otherGrid = document.querySelector(
					`#playMatchGrid-${currPlayerIndex}`
				);

				otherGrid.classList.add("playableGrid");

				const positionHit = await computerHitCell();

				if (positionHit === false) {
					throw new Error("Error on computerPlays");
				}
				const [otherX, otherY] = positionHit.split(",");

				const otherGridTopLayer = document.querySelector(
					`#playMatchGrid-${currPlayerIndex} > #gridCell_${otherX}-${otherY} > .topLayer`
				);

				otherGridTopLayer.classList.add("fadeOutRevealed");

				const otherGridBottomLayer = document.querySelector(
					`#playMatchGrid-${currPlayerIndex} > #gridCell_${otherX}-${otherY} > .bottomLayer`
				);

				setTimeout(() => {
					otherGridBottomLayer.classList.add("resizeRevealed");
				}, 400);

				otherGrid.classList.remove("playableGrid");
				container.classList.add("playableGrid");

				const moveCounterComputer = document.querySelector(
					`#moveCounter-${gameboardIndex}`
				);

				moveCounterComputer.textContent =
					state.game.playedCellsByPlayerIndex(currPlayerIndex).size;

				const shipsLeftComputer = document.querySelector(
					`#shipsLeft-${currPlayerIndex}`
				);

				shipsLeftComputer.textContent =
					state.game.currPlayer.gameboard.numberOfShips;

				const isAlsoGameOver = verifyGameOver();
				if (isAlsoGameOver) return;
			});

			const topLayer = document.createElement("div");
			topLayer.className = "bg-white flex-1 topLayer absolute inset-0";
			const bottomLayer = document.createElement("div");

			const cellState = state.game.checkShipCellByPlayerIndex(
				x,
				y,
				gameboardIndex
			);
			bottomLayer.className = `${cellState} flex-1 bottomLayer`;

			cell.append(topLayer, bottomLayer);

			container.appendChild(cell);
		});
	}

	return container;
}
