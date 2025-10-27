import { state } from "../../core/index.js";

export default function newDraggableShip(size, id) {
	const container = document.createElement("div");
	container.id = id;
	container.className =
		"border-[0.1em] border-black p-[0.2em] flex gap-[0.4em] w-fit h-fit rounded";

	const ship = {
		id,
		size,
	};

	container.setAttribute("data-ship", JSON.stringify(ship));

	for (let i = 0; i < size; i++) {
		const shipCell = document.createElement("div");
		shipCell.className = "bg-black w-10 h-10 rounded";
		container.appendChild(shipCell);
	}

	let mouseX = 0;
	let mouseY = 0;

	function onMouseMove(e) {
		const draggableShip = document.querySelector(".draggableShip");
		if (draggableShip === undefined) return;

		mouseX = e.clientX + 2;
		mouseY = e.clientY + 2;

		draggableShip.style.top = `${mouseY}px`;
		draggableShip.style.left = `${mouseX}px`;
	}

	container.addEventListener("mousedown", e => {
		const x = e.clientX + 2;
		const y = e.clientY + 2;
		container.style.top = `${y}px`;
		container.style.left = `${x}px`;

		container.classList.add("draggableShip");
		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("keydown", pressShift);
		document.addEventListener("keyup", releaseShift);
	});

	document.addEventListener("mouseup", () => {
		container.classList.remove("draggableShip");
		document.removeEventListener("mousemove", onMouseMove);
		document.removeEventListener("keydown", pressShift);
		document.removeEventListener("keyup", releaseShift);
		container.classList.remove("rotate");
	});

	function pressShift(e) {
		if (e.shiftKey === true) {
			const draggableShip = document.querySelector(".draggableShip");

			if (draggableShip === null) return;

			const cell = document.elementFromPoint(mouseX, mouseY);

			if (cell.dataset.x === undefined || cell.dataset.y === undefined) {
				draggableShip.classList.add("rotate");
				return;
			}

			let isVertical = draggableShip.classList.contains("rotate");

			console.log("down", draggableShip.classList.contains("rotate"));

			const ship = JSON.parse(draggableShip.dataset.ship);

			const prevPlaces = state.game.currPlayer.gameboard.getShipPossiblePlaces(
				Number(cell.dataset.x),
				Number(cell.dataset.y),
				ship.size,
				isVertical ? "vertical" : "horizontal"
			);

			prevPlaces.forEach(place => {
				const [x, y] = place.split(",");

				const currCell = document.querySelector(
					`[data-x="${x}"][data-y="${y}"]`
				);

				if (currCell === null) return;
				currCell.classList.remove(
					"outline-dashed",
					"outline-4",
					"outline-black"
				);
			});

			draggableShip.classList.add("rotate");
			isVertical = !isVertical;

			const newPlaces = state.game.currPlayer.gameboard.getShipPossiblePlaces(
				Number(cell.dataset.x),
				Number(cell.dataset.y),
				ship.size,
				isVertical ? "vertical" : "horizontal"
			);

			console.log({ prevPlaces, newPlaces });

			newPlaces.forEach(place => {
				const [x, y] = place.split(",");

				const currCell = document.querySelector(
					`[data-x="${x}"][data-y="${y}"]`
				);

				if (currCell === null) return;
				currCell.classList.add("outline-dashed", "outline-4", "outline-black");
			});
		}
	}

	function releaseShift(e) {
		if (e.shiftKey === false) {
			const draggableShip = document.querySelector(".draggableShip");

			if (draggableShip === null) return;

			const cell = document.elementFromPoint(mouseX, mouseY);

			if (cell.dataset.x === undefined || cell.dataset.y === undefined) {
				draggableShip.classList.remove("rotate");
				return;
			}

			let isVertical = draggableShip.classList.contains("rotate");

			const ship = JSON.parse(draggableShip.dataset.ship);

			const prevPlaces = state.game.currPlayer.gameboard.getShipPossiblePlaces(
				Number(cell.dataset.x),
				Number(cell.dataset.y),
				ship.size,
				isVertical ? "vertical" : "horizontal"
			);

			prevPlaces.forEach(place => {
				const [x, y] = place.split(",");

				const currCell = document.querySelector(
					`[data-x="${x}"][data-y="${y}"]`
				);

				if (currCell === null) return;
				currCell.classList.remove(
					"outline-dashed",
					"outline-4",
					"outline-black"
				);
			});

			draggableShip.classList.remove("rotate");
			isVertical = !isVertical;

			const newPlaces = state.game.currPlayer.gameboard.getShipPossiblePlaces(
				Number(cell.dataset.x),
				Number(cell.dataset.y),
				ship.size,
				isVertical ? "vertical" : "horizontal"
			);

			console.log({ prevPlaces, newPlaces });

			newPlaces.forEach(place => {
				const [x, y] = place.split(",");

				const currCell = document.querySelector(
					`[data-x="${x}"][data-y="${y}"]`
				);

				if (currCell === null) return;
				currCell.classList.add("outline-dashed", "outline-4", "outline-black");
			});
		}
	}

	return container;
}
