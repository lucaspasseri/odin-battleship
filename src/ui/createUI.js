import { goToPage } from "./index.js";

export default function createUI(game) {
	const page = document.createElement("div");

	const h1 = document.createElement("h1");
	h1.textContent = `Current player: ${game.currPlayer.name}`;

	const h2GameStatus = document.createElement("h2");
	h2GameStatus.textContent = `Game status:${
		game.isGameOver ? "Game over!" : "Game in progress..."
	}  `;

	page.append(h1, h2GameStatus);

	const boardsContainer = document.createElement("div");
	boardsContainer.className = "boardsContainer";

	game.players.forEach((player, index) => {
		const ROWS = 10;
		const COLS = 10;

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
			const cellState = game.checkCellByPlayerIndex(x, y, index);

			btn.className = cellState;

			btn.addEventListener("click", () => {
				if (game.currPlayer === game.players[index] || game.isGameOver) {
					return;
				}
				const attack = game.hitCellByPlayerIndex(x, y, index);
				if (attack) {
					game.changePlayer();
				}
				goToPage("mainPage");
			});

			cell.appendChild(btn);
			grid.appendChild(cell);
		}

		gridContainer.append(h1, h2ShipsLeft, h2Moves, grid);
		boardsContainer.appendChild(gridContainer);
	});
	page.appendChild(boardsContainer);

	return page;
}
