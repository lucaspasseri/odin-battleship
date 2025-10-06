export default function createGameboardUI(player) {
	const ROWS = 10;
	const COLS = 10;

	const occupiedPlaces = player.gameboard.occupiedPlaces;

	const gridContainer = document.createElement("div");
	gridContainer.className = "gridContainer";
	const h1 = document.createElement("h1");
	h1.textContent = `${player.type}`;

	const h4 = document.createElement("h4");
	h4.textContent = "Game status: in progress...";

	const grid = document.createElement("div");
	grid.className = "grid";

	for (let i = 0; i < ROWS * COLS; i++) {
		const cell = document.createElement("div");

		const btn = document.createElement("button");
		btn.className = "initial";

		const x = i % COLS;
		const y = Math.abs(Math.floor(i / COLS) - 9);

		const currCoordinate = `${x},${y}`;

		btn.addEventListener("click", () => {
			const ship = occupiedPlaces[currCoordinate];
			console.log({ currCoordinate, ship });

			if (ship === undefined) {
				btn.classList.remove("initial");
				btn.classList.add("miss");
			} else if (ship === false) {
				return;
			} else {
				btn.classList.remove("initial");
				btn.classList.add("hit");
			}
		});
		cell.appendChild(btn);
		grid.appendChild(cell);
	}

	gridContainer.append(h1, h4, grid);

	return gridContainer;
}
