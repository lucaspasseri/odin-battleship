import { state } from "../core/index.js";

import {
	navbar,
	createShips,
	nextPlayerButton,
} from "../ui/components/index.js";
import goToPage from "../ui/goToPage.js";

export default function deployShipsPage() {
	const currPlayer = state.game.currPlayer;

	if (currPlayer === undefined) {
		goToPage("errorPage");
	}

	const page = document.createElement("div");
	page.id = "deployShipsPage";
	page.className = "flex flex-col gap-[1em]";

	const nav = navbar();

	const createShipsSec = createShips();

	const buttonContainer = document.createElement("div");
	buttonContainer.id = "nextPlayerButtonContainer";

	const button = nextPlayerButton();

	buttonContainer.appendChild(button);

	page.append(nav, createShipsSec, buttonContainer);
	return page;
}
