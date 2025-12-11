import goToPage from "../ui/goToPage.js";
import { state } from "../core/index.js";
import { range } from "../util/range.js";
import { grid } from "../ui/components/index.js";
import { Preferences } from "../ui/state/Preferences.js";
import { sampleOne } from "../util/sampleOne.js";
import { normalize } from "../util/normalize.js";

export default function deployShips() {
	if (state.game.currPlayer.type === "computer") {
		state.game.changePlayer();
		goToPage("deployShips");
		return;
	}

	if (
		state.game.currPlayer.type === "real" &&
		state.game.getShips(state.game.currPlayerIndex).length > 0
	) {
		state.game.changePlayer();
		goToPage("playMatch");
		return;
	}

	const container = document.createElement("div");
	container.className =
		"px-[1em] md:px-[4em] py-[1em] flex gap-[2em] flex-col mt-[1em]";

	const h2 = document.createElement("h2");
	h2.className = "text-3xl";
	h2.textContent = "Deploy ships";

	const nextButton = document.createElement("button");

	const shipsAndGridContainer = document.createElement("div");
	shipsAndGridContainer.className = "flex flex-wrap mt-[1em]";

	const shipsContainer = document.createElement("div");
	shipsContainer.className =
		"flex flex-col gap-[0.4em] relative min-w-[326px] min-h-[360px] shrink-0 m-auto";

	let offsetLeft = 0;
	let offsetTop = 0;
	let targetShip = null;
	let lastHoveredCell = null;
	let lastPreviewedCells = [];

	const SPRITE_MAP_HONK = {
		a: [48070, 3000],
		b: [52175, 3000],
	};
	const shipHonk = new Howl({
		src: ["./src/assets/honk.wav"],
		sprite: SPRITE_MAP_HONK,
		volume: 0.15,
	});

	function endDrag(e) {
		targetShip.removeEventListener("pointermove", onDrag);
		targetShip.removeEventListener("pointerup", endDrag);

		lastPreviewedCells.forEach(cell => {
			cell.classList.remove("gridCellGreenPulse", "gridCellRedPulse");
		});
		lastPreviewedCells = [];

		const element = document.elementFromPoint(e.clientX, e.clientY);

		if (element === null || !element.classList.contains("gridCell")) {
			targetShip.style.transform = `translate(0px, 0px)`;
			return;
		}

		const shipSize = Number(targetShip.dataset.size);
		const direction = targetShip.dataset.direction;

		const x = Number(element.dataset.x);
		const y = Number(element.dataset.y);

		const hasCollision = state.game.placeShipHasCollision(
			x,
			y,
			shipSize,
			direction,
			state.game.currPlayerIndex
		);

		if (hasCollision) {
			targetShip.style.transform = `translate(0px, 0px)`;
			if (lastHoveredCell) {
				lastHoveredCell.classList.remove(
					"gridCellRedPulse",
					"gridCellGreenPulse"
				);
			}
			return;
		}

		state.game.placeShipByPlayerIndex(
			x,
			y,
			shipSize,
			direction,
			state.game.currPlayerIndex
		);

		const gridCellsToUpdate =
			state.game.currPlayer.gameboard.getShipPossiblePlaces(
				x,
				y,
				shipSize,
				direction
			);

		gridCellsToUpdate.forEach((cell, index) => {
			const [x, y] = cell.split(",");
			const gridCell = document.querySelector(`#gridCell_${x}-${y}`);
			gridCell.classList.remove("ship", "gridCellGreenPulse");
			lastHoveredCell = null;

			if (Preferences.motionPreference === "no-preference") {
				setTimeout(() => {
					gridCell.classList.add("newShip");
				}, index * 300);
			} else {
				gridCell.classList.add("ship");
			}
		});

		targetShip.remove();

		nextButton.disabled = false;
		nextButton.classList.replace("bg-gray-700", "bg-green-700");

		if (Preferences.soundPreference === "sound-on") {
			const spriteId = sampleOne(Object.keys(SPRITE_MAP_HONK));
			const id = shipHonk.play(spriteId);
			shipHonk.rate(1.2, id);
		}
	}

	function onDrag(e) {
		if (targetShip === null) return;

		const shipSize = Number(targetShip.dataset.size);
		const direction = targetShip.dataset.direction;

		const element = document.elementFromPoint(e.clientX, e.clientY);
		const isGridCell = element && element.classList.contains("gridCell");

		lastPreviewedCells.forEach(cell => {
			cell.classList.remove("gridCellGreenPulse", "gridCellRedPulse");
		});
		lastPreviewedCells = [];

		if (isGridCell) {
			const x = Number(element.dataset.x);
			const y = Number(element.dataset.y);

			const rawCells = state.game.currPlayer.gameboard.getShipPossiblePlaces(
				x,
				y,
				shipSize,
				direction
			);

			const shipCells = rawCells.map(c => c.split(",").map(Number));

			const hasCollision = state.game.placeShipHasCollision(
				x,
				y,
				shipSize,
				direction,
				state.game.currPlayerIndex
			);

			shipCells.forEach(([cx, cy]) => {
				const cellEl = document.querySelector(`#gridCell_${cx}-${cy}`);
				if (!cellEl) return;

				cellEl.classList.add(
					hasCollision ? "gridCellRedPulse" : "gridCellGreenPulse"
				);

				lastPreviewedCells.push(cellEl);
			});
		}

		let newX;
		let newY;
		if (direction === "vertical") {
			newX = e.clientX - offsetLeft + 57;
			newY = e.clientY - offsetTop - 50;
		} else {
			newX = e.clientX - offsetLeft + 2;
			newY = e.clientY - offsetTop + 2;
		}

		targetShip.style.transform = `translate(${newX}px,${newY}px)`;
	}

	const NUMBER_OF_SHIPS = 4;

	range(NUMBER_OF_SHIPS).forEach(index => {
		const shipWrapper = document.createElement("div");
		shipWrapper.className =
			"touch-none absolute will-change-transform draggableShip cursor-pointer";
		shipWrapper.id = `draggableShip-${index}`;

		shipWrapper.dataset.id = `draggableShip`;
		shipWrapper.dataset.size = index + 2;
		shipWrapper.dataset.direction = "horizontal";

		const complIndex = NUMBER_OF_SHIPS - index - 1;

		const topValue = normalize(complIndex, 0, 3, 0, 200);
		const leftValue = normalize(complIndex, 0, 3, 54, 230);

		shipWrapper.classList.add(`top-[${topValue}px]`, `left-[${leftValue}px]`);

		const ship = document.createElement("div");
		ship.className =
			"flex gap-[0.2em] p-[0.2em] border-black border-[0.2em] w-fit rotateShip";

		ship.style.setProperty("--top", "100%");
		ship.style.setProperty("--left", "0%");

		function startDrag(e) {
			e.stopPropagation();
			if (e.target.closest(".rotate-btn")) {
				return;
			}

			const parentRect = shipsContainer.getBoundingClientRect();

			targetShip = shipWrapper;
			offsetLeft = parentRect.left + shipWrapper.offsetLeft;
			offsetTop = parentRect.top + shipWrapper.offsetTop;

			shipWrapper.setPointerCapture(e.pointerId);
			shipWrapper.addEventListener("pointermove", onDrag);
			shipWrapper.addEventListener("pointerup", endDrag);
		}

		shipWrapper.addEventListener("pointerdown", startDrag);

		range(index + 2).forEach(() => {
			const cell = document.createElement("div");
			cell.className = "w-6 h-6 sm:w-10 sm:h-10 bg-black relative";

			ship.appendChild(cell);
		});

		shipWrapper.appendChild(ship);

		const rotationButton = document.createElement("button");
		rotationButton.textContent = "⥀";
		rotationButton.className =
			"rotate-btn absolute top-[15px] left-[-36px] text-5xl/[0.3em]";

		rotationButton.addEventListener("click", () => {
			const newDirection =
				shipWrapper.dataset.direction === "horizontal"
					? "vertical"
					: "horizontal";

			shipWrapper.dataset.direction = newDirection;

			shipWrapper.classList.remove("rotating-horizontal", "rotating-vertical");

			if (newDirection === "vertical") {
				shipWrapper.classList.add("rotating-vertical");
			} else {
				shipWrapper.classList.add("rotating-horizontal");
			}
		});

		shipWrapper.appendChild(rotationButton);

		shipsContainer.appendChild(shipWrapper);
	});

	const gridContainer = document.createElement("div");
	gridContainer.className = "flex m-auto";
	gridContainer.id = "shipDeploymentGridContainer";

	const gridElement = grid();

	gridContainer.appendChild(gridElement);
	shipsAndGridContainer.append(shipsContainer, gridContainer);

	nextButton.className =
		"w-fit rounded border-[var(--color)] border-2 text-2xl px-[0.6em] py-[0.3em] bg-gray-700 m-auto mt-[1em]";
	nextButton.textContent = "Next";

	const isDisabled =
		state.game.getShips(state.game.currPlayerIndex).length === 0;
	nextButton.disabled = isDisabled;

	nextButton.addEventListener("click", () => {
		state.game.changePlayer();
		goToPage("deployShips");
	});

	container.append(h2, shipsAndGridContainer, nextButton);
	return container;
}
