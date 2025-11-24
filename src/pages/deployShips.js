import goToPage from "../ui/goToPage.js";
import { state } from "../core/index.js";
import { range } from "../util/range.js";
import { grid } from "../ui/components/index.js";
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
	shipsAndGridContainer.className = "flex border flex-col";

	const shipsContainer = document.createElement("div");
	shipsContainer.className =
		"border-[0.3em] border-purple-700 flex flex-col gap-[0.4em] relative";

	let offsetLeft = 0;
	let offsetTop = 0;
	let targetShip = null;

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

		const possiblePlaces =
			state.game.currPlayer.gameboard.getShipPossiblePlaces(
				x,
				y,
				shipSize,
				"horizontal"
			);

		const hasCollision = possiblePlaces.reduce((acc, curr) => {
			const [x, y] = curr.split(",");
			const cellState = state.game.checkShipCellByPlayerIndex(
				Number(x),
				Number(y),
				state.game.currPlayerIndex
			);

			if (cellState !== "water") {
				acc = true;
			}

			return acc;
		}, false);

		if (hasCollision) {
			targetShip.style.transform = `translate(0px, 0px)`;
			return;
		}

		state.game.placeShipByPlayerIndex(
			x,
			y,
			shipSize,
			"horizontal",
			state.game.currPlayerIndex
		);

		const parentNode = document.querySelector("#shipDeploymentGridContainer");

		const oldGrid = document.querySelector("#shipDeploymentGrid");
		const newGrid = grid();

		parentNode.replaceChild(newGrid, oldGrid);

		targetShip.remove();
	}

	function onDrag(e) {
		if (targetShip === null) return;

		const x = e.clientX - offsetLeft;
		const y = e.clientY - offsetTop;
		targetShip.style.transform = `translate(${x}px,${y}px)`;
	}

	const NUMBER_OF_SHIPS = 4;

	range(NUMBER_OF_SHIPS).forEach(index => {
		const shipData = { id: index, size: index + 2 };
		const ship = document.createElement("div");
		ship.id = `draggableShip-${index}`;
		ship.className =
			"flex gap-[0.2em] p-[0.2em] border-black border-[0.2em] w-fit touch-none absolute will-change-transform";
		ship.style.top = `calc(${index} * 50px)`;
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
			cell.className = "w-6 h-6 bg-black";

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
