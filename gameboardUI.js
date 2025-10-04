export default function createGameboardUI(player) {
	const ROWS = 10;
	const COLS = 10;

	const occupiedPlaces = player.gameboard.occupiedPlaces;
	console.log({ occupiedPlaces });

	const grid = document.createElement("div");
	grid.className = "grid";

	for (let i = 0; i < ROWS * COLS; i++) {
		const cell = document.createElement("div");

		const btn = document.createElement("button");
		btn.className = "water";

		const x = i % COLS;
		const y = Math.abs(Math.floor(i / COLS) - 9);

		console.log({ x, y });

		const currCoordinate = `${x},${y}`;

		btn.addEventListener("click", () => {
			const ship = occupiedPlaces[currCoordinate];
			console.log({ currCoordinate, ship });

			if (ship === undefined) {
				btn.classList.remove("water");
				btn.classList.add("miss");
			} else if (ship === false) {
				return;
			} else {
				btn.classList.remove("water");
				btn.classList.add("hit");
			}
		});
		cell.appendChild(btn);
		grid.appendChild(cell);
	}

	console.log({ grid });

	return grid;
}
