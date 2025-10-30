import { state } from "../core/index.js";

import {
	navbar,
	createShips,
	deployShipPageButton,
} from "../ui/components/index.js";
import goToPage from "../ui/goToPage.js";

export default function deployShipsPage() {
	const currPlayer = state.game.currPlayer;

	if (
		currPlayer === undefined ||
		state.game.firstPlayer === undefined ||
		state.game.secondPlayer === undefined
	) {
		goToPage("errorPage");
	}

	if (currPlayer === state.game.firstPlayer) {
		if (currPlayer.type === "computer") {
			for (let i = 2; i < 6; i++) {
				state.game.computerDeploysShip(i);
			}
			state.game.changePlayer();
			goToPage("deployShipsPage");
			return;
		}
		const page = document.createElement("div");
		page.id = "deployShipsPage";
		page.className = "flex flex-col gap-[1em]";

		const nav = navbar();

		const createShipsSec = createShips();

		const buttonContainer = document.createElement("div");
		buttonContainer.id = "deployShipPageButtonContainer";

		const button = deployShipPageButton();
		buttonContainer.appendChild(button);

		page.append(nav, createShipsSec, buttonContainer);
		return page;
	}

	if (currPlayer.type === "computer") {
		for (let i = 2; i < 6; i++) {
			state.game.computerDeploysShip(i);
		}
		state.game.changePlayer();
		goToPage("mainPage");
		return;
	}

	const page = document.createElement("div");
	page.id = "deployShipsPage";
	page.className = "flex flex-col gap-[1em]";

	const nav = navbar();

	const createShipsSec = createShips();

	const buttonContainer = document.createElement("div");
	buttonContainer.id = "deployShipPageButtonContainer";

	const button = deployShipPageButton();
	buttonContainer.appendChild(button);

	page.append(nav, createShipsSec, buttonContainer);
	return page;
}
