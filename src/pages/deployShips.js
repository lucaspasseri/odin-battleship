import goToPage from "../ui/goToPage.js";
import { state } from "../core/index.js";
import { range } from "../util/range.js";
import { grid } from "../ui/components/index.js";
import { Preferences } from "../ui/state/Preferences.js";
import { sampleOne } from "../util/sampleOne.js";

export default function deployShips() {
	const hasCurrentPlayerAlreadyDeployed =
		state.game.getShips(state.game.currPlayerIndex).length > 0;

	if (hasCurrentPlayerAlreadyDeployed) {
		goToPage("playMatch");
		return;
	}

	const container = document.createElement("div");
	container.className = "px-[1em] md:px-[4em] py-[1em] flex gap-[2em] flex-col";

	const h2 = "Deploy ships";

	const shipsAndGridContainer = document.createElement("div");
	shipsAndGridContainer.className = "flex flex-wrap justify-between";

	const shipsContainer = document.createElement("div");
	shipsContainer.className =
		"flex flex-col gap-[0.4em] relative min-w-[160px] sm:min-w-[240px] min-h-[180px] sm:min-h-[260px] shrink-0";

	let offsetLeft = 0;
	let offsetTop = 0;
	let targetShip = null;
	let lastHoveredCell = null;

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

		const element = document.elementFromPoint(e.clientX, e.clientY);

		if (element === null || !element.classList.contains("gridCell")) {
			targetShip.style.transform = `translate(0px, 0px)`;
			return;
		}

		const { size: shipSize } = JSON.parse(targetShip?.dataset.ship);

		const x = Number(element.dataset.x);
		const y = Number(element.dataset.y);

		const hasCollision = state.game.placeShipHasCollision(
			x,
			y,
			shipSize,
			"horizontal",
			state.game.currPlayerIndex
		);

		if (hasCollision) {
			targetShip.style.transform = `translate(0px, 0px)`;
			lastHoveredCell.classList.remove(
				"gridCellRedPulse",
				"gridCellGreenPulse"
			);
			return;
		}

		state.game.placeShipByPlayerIndex(
			x,
			y,
			shipSize,
			"horizontal",
			state.game.currPlayerIndex
		);

		const gridCellsToUpdate =
			state.game.currPlayer.gameboard.getShipPossiblePlaces(
				x,
				y,
				shipSize,
				"horizontal"
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

		if (Preferences.soundPreference === "sound-on") {
			const spriteId = sampleOne(Object.keys(SPRITE_MAP_HONK));
			const id = shipHonk.play(spriteId);
			shipHonk.rate(1.2, id);
		}
	}

	function onDrag(e) {
		if (targetShip === null) return;

		const element = document.elementFromPoint(e.clientX, e.clientY);

		const isGridCell = element && element.classList.contains("gridCell");

		if (isGridCell && element !== lastHoveredCell) {
			if (lastHoveredCell) {
				lastHoveredCell.classList.remove(
					"gridCellRedPulse",
					"gridCellGreenPulse"
				);
			}

			const x = Number(element.dataset.x);
			const y = Number(element.dataset.y);

			const { size: shipSize } = JSON.parse(targetShip?.dataset.ship);

			const hasCollision = state.game.placeShipHasCollision(
				x,
				y,
				shipSize,
				"horizontal",
				state.game.currPlayerIndex
			);

			if (hasCollision) {
				element.classList.add("gridCellRedPulse");
			} else {
				element.classList.add("gridCellGreenPulse");
			}

			lastHoveredCell = element;
		} else if (!isGridCell && lastHoveredCell) {
			lastHoveredCell.classList.remove(
				"gridCellRedPulse",
				"gridCellGreenPulse"
			);
			lastHoveredCell = null;
		}
		const x = e.clientX - offsetLeft + 10;
		const y = e.clientY - offsetTop + 10;
		targetShip.style.transform = `translate(${x}px,${y}px)`;
	}

	const NUMBER_OF_SHIPS = 4;

	range(NUMBER_OF_SHIPS).forEach(index => {
		const shipData = { id: index, size: index + 2 };
		const ship = document.createElement("div");
		ship.id = `draggableShip-${index}`;
		ship.className =
			"flex gap-[0.2em] p-[0.2em] border-black border-[0.2em] w-fit touch-none absolute will-change-transform";
		const topValue = index * 60;
		ship.classList.add(`sm:top-[${topValue}px]`, `top-[${topValue / 1.5}px]`);
		ship.setAttribute("data-ship", JSON.stringify(shipData));

		function startDrag(e) {
			const parentRect = shipsContainer.getBoundingClientRect();

			targetShip = ship;
			offsetLeft = parentRect.left + ship.offsetLeft;
			offsetTop = parentRect.top + ship.offsetTop;

			ship.classList.add("dragTarget");
			ship.setPointerCapture(e.pointerId);
			ship.addEventListener("pointermove", onDrag);
			ship.addEventListener("pointerup", endDrag);
		}

		ship.addEventListener("pointerdown", startDrag);

		range(index + 2).forEach(i => {
			const cell = document.createElement("div");
			cell.className = "w-6 h-6 sm:w-10 sm:h-10 bg-black";

			ship.appendChild(cell);
		});

		shipsContainer.appendChild(ship);
	});

	const gridContainer = document.createElement("div");
	gridContainer.className = "border flex justify-end";
	gridContainer.id = "shipDeploymentGridContainer";

	const gridElement = grid();

	gridContainer.appendChild(gridElement);
	shipsAndGridContainer.append(shipsContainer, gridContainer);

	const nextButton = document.createElement("button");
	nextButton.textContent = "Next";
	nextButton.addEventListener("click", () => {
		state.game.changePlayer();
		goToPage("deployShips");
	});

	container.append(h2, shipsAndGridContainer, nextButton);
	return container;
}
