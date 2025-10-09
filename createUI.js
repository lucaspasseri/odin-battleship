export default function createUI(game) {
	const container = document.querySelector("#container");
	container.innerHTML = "";
	container.className = "container";

	const h1 = document.createElement("h1");
	h1.textContent = `Current player: ${game.currPlayer.name}`;

	const h2GameStatus = document.createElement("h2");
	h2GameStatus.textContent = `Game status:${
		game.isThereAnyShipLeft ? "in progress..." : "game over"
	}  `;

	container.append(h1, h2GameStatus);

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
		h2ShipsLeft.textContent = `# ships: ${player.gameboard.numberOfShips}`;

		const h2Moves = document.createElement("h2");
		h2Moves.textContent = `# moves: ${player.gameboard.playedPlaces.size}`;

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
				if (game.currPlayer.name !== game.players[index].name) {
					return;
				}
				game.hitCellByPlayerIndex(x, y, index);
				createUI(game);
			});

			cell.appendChild(btn);
			grid.appendChild(cell);
		}

		gridContainer.append(h1, h2ShipsLeft, h2Moves, grid);
		boardsContainer.appendChild(gridContainer);
	});
	container.appendChild(boardsContainer);
}
