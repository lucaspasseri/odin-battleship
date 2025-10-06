export default function createGameboardUI(gbi) {
	const ROWS = 10;
	const COLS = 10;

	const occupiedPlaces = gbi.gameboard.occupiedPlaces;

	const gridContainer = document.createElement("div");
	gridContainer.className = "gridContainer";
	const h1 = document.createElement("h1");
	h1.textContent = `${gbi.player.type}`;

	const h4 = document.createElement("h4");
	h4.textContent = `Game status:${
		gbi.player.gameboard.isThereAnyShipLeft() ? "in progress..." : "game over"
	}  `;

	const grid = document.createElement("div");
	grid.className = "grid";

	for (let i = 0; i < ROWS * COLS; i++) {
		const cell = document.createElement("div");

		const x = i % COLS;
		const y = Math.abs(Math.floor(i / COLS) - 9);

		const btn = document.createElement("button");
		const cellState = gbi.checkCell(x, y);

		btn.className = cellState;

		btn.addEventListener("click", () => {
			const hit = gbi.hit(x, y);
			if (hit) {
				const body = document.querySelector("body");
				body.innerHTML = "";
				const grid = createGameboardUI(gbi);

				body.appendChild(grid);
			}
		});
		cell.appendChild(btn);
		grid.appendChild(cell);
	}

	gridContainer.append(h1, h4, grid);

	return gridContainer;
}
