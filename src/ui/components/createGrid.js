import { state } from "../../core/index.js";
import { goToPage } from "../index.js";

export default function createGrid(player, playerIndex) {
	const ROWS = 10;
	const COLS = 10;

	const boardsContainer = document.createElement("div");
	boardsContainer.className = "boardsContainer";

	const gridContainer = document.createElement("div");
	gridContainer.className = "gridContainer";
	const h1 = document.createElement("h1");
	h1.textContent = `${player.name}-${player.type}`;

	const h2ShipsLeft = document.createElement("h2");
	h2ShipsLeft.textContent = `Ships left (#): ${player.gameboard.numberOfShips}`;

	const moves = [...player.gameboard.playedPlaces]
		.map(item => `(${item})`)
		.join(" -> ");

	const h2Moves = document.createElement("div");
	h2Moves.textContent = `Moves: ${moves}`;

	const grid = document.createElement("div");
	grid.className = "grid";

	for (let i = 0; i < ROWS * COLS; i++) {
		const cell = document.createElement("div");

		const x = i % COLS;
		const y = Math.abs(Math.floor(i / COLS) - 9);

		const btn = document.createElement("button");
		const cellState = state.game.checkCellByPlayerIndex(x, y, playerIndex);

		btn.className = cellState;

		btn.addEventListener("click", () => {
			if (player === state.game.currPlayer || state.game.isGameOver) {
				return;
			}
			const attack = state.game.hitCellByPlayerIndex(x, y, playerIndex);
			if (attack) {
				state.game.changePlayer();
			}
			goToPage("mainPage");
		});

		cell.appendChild(btn);
		grid.appendChild(cell);
	}

	gridContainer.append(h1, h2ShipsLeft, h2Moves, grid);
	boardsContainer.appendChild(gridContainer);

	return boardsContainer;
}
