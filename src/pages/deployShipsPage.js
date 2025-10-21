import { state } from "../core/index.js";

import { navbar, createShips } from "../ui/components/index.js";
import goToPage from "../ui/goToPage.js";

export default function deployShipsPage() {
	const firstPlayer = state.game.firstPlayer;
	const secondPlayer = state.game.secondPlayer;

	if (firstPlayer === undefined || secondPlayer === undefined) {
		goToPage("errorPage");
	}

	const page = document.createElement("div");
	page.id = "deployShipsPage";
	page.className = "border-4 border-red-700";

	const nav = navbar();

	const pDiv = document.createElement("div");
	const p1 = document.createElement("p");
	p1.textContent = `${firstPlayer.name}-${firstPlayer.type}-${firstPlayer.imagePath}-${firstPlayer.gameboard.numberOfShips}`;
	const p2 = document.createElement("p");
	p2.textContent = `${secondPlayer.name}-${secondPlayer.type}-${secondPlayer.imagePath}-${secondPlayer.gameboard.numberOfShips}`;

	const pc = document.createElement("p");
	pc.textContent = `${state.game.currPlayer.name}-${state.game.currPlayer.type}-${state.game.currPlayer.imagePath}-${state.game.currPlayer.gameboard.numberOfShips}`;

	pDiv.append(p1, p2, pc);

	const createShipsSec = createShips();

	page.append(nav, pDiv, createShipsSec);
	return page;
}
