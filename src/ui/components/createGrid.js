import { state } from "../../core/index.js";
import { updateMatchGrid, updateRestartButton } from "./constants.js";

export default function createGrid(player, playerIndex) {
	const ROWS = 10;
	const COLS = 10;

	const gridContainer = document.createElement("div");
	gridContainer.className = "flex flex-col gap-[0.6em]";
	gridContainer.id = `gridContainer-${player.id}`;

	const h4 = document.createElement("h4");
	h4.textContent = `Ships left: ${player.gameboard.numberOfShips}`;
	h4.className = "font-mono text-lg text-blue-600 font-bold";

	const grid = document.createElement("div");
	grid.className =
		"grid grid-cols-[repeat(10,minmax(40px,40px))] gap-[0.4em] p-[0.8em] border-[0.4em] rounded border-white max-w-[494.2px]";

	for (let i = 0; i < ROWS * COLS; i++) {
		const cell = document.createElement("button");

		const x = i % COLS;
		const y = Math.abs(Math.floor(i / COLS) - 9);

		const cellState = state.game.checkCellByPlayerIndex(x, y, playerIndex);

		cell.className = `min-w-10 min-h-10 rounded hover:cursor-pointer shrink-0 ${cellState}`;

		cell.addEventListener("click", () => {
			if (player === state.game.currPlayer || state.game.isGameOver) {
				return;
			}

			const attack = state.game.hitCellByPlayerIndex(x, y, playerIndex);
			if (attack) {
				if (state.game.isGameOver) {
					alert("Game is over!");
				}
				state.game.changePlayer();
			}

			updateMatchGrid(player);
			updateRestartButton();
		});

		grid.appendChild(cell);
	}

	// const moves = [...player.gameboard.playedPlaces]
	// 	.map(item => `(${item})`)
	// 	.join(" -> ");

	// const h2Moves = document.createElement("div");
	// h2Moves.textContent = `Moves: ${moves}`;

	gridContainer.append(h4, grid);

	return gridContainer;
}
