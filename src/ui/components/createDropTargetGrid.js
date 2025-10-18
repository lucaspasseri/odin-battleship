import { state } from "../../core/index.js";

export default function createDropTargetGrid() {
	const ROWS = 10;
	const COLS = 10;

	const container = document.createElement("div");
	container.className = "border-4 border-black p-2 bg-red-500 w-fit ml-auto";

	const grid = document.createElement("div");
	grid.className = "grid grid-cols-10 gap-[0.3em]";

	for (let i = 0; i < ROWS * COLS; i++) {
		const cell = document.createElement("div");

		const x = i % COLS;
		const y = Math.abs(Math.floor(i / COLS) - 9);

		cell.className = "w-10 h-10 bg-white";
		cell.addEventListener("dragover", e => {
			e.preventDefault();
			// console.log({ dragover: e });
		});
		cell.addEventListener("dragenter", () => {
			cell.classList.add("border-8", "border-blue-800");
		});
		cell.addEventListener("dragleave", () => {
			cell.classList.remove("border-8", "border-blue-800");
		});

		cell.addEventListener("drop", e => {
			e.preventDefault();

			console.log({ drop: e });
			const shipId = e.dataTransfer.getData("shipId");
			console.log({ obj: JSON.parse(shipId) });
		});
		grid.appendChild(cell);
	}
	container.appendChild(grid);

	return container;
}
