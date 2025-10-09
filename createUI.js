export default function createUI(game) {
	const container = document.querySelector("#container");
	container.innerHTML = "";
	container.className = "container";

	game.players.forEach((player, index) => {
		const ROWS = 10;
		const COLS = 10;

		const gridContainer = document.createElement("div");
		gridContainer.className = "gridContainer";
		const h1 = document.createElement("h1");
		h1.textContent = `${player.name}-${player.type}`;

		const h4 = document.createElement("h4");
		h4.textContent = `Game status:${
			player.gameboard.isThereAnyShipLeft() ? "in progress..." : "game over"
		}  `;

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
					console.log(1);
					return;
				}
				game.hitCellByPlayerIndex(x, y, index);
				createUI(game);
			});

			cell.appendChild(btn);
			grid.appendChild(cell);
		}

		gridContainer.append(h1, h4, grid);
		container.appendChild(gridContainer);
	});
}
