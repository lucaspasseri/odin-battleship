import { navbar, createPlayerSectionNew } from "../ui/components/index.js";

export default function playersPage() {
	const nav = navbar();

	// const preGameSec = preGame();
	// const createPlayerSec = createPlayer();
	// const playerSec = createPlayerSection();
	// const createShipsSec = createShips();
	// const shipSec = createShipSection();
	// const matchSec = createMatchSection();

	const page = document.createElement("div");

	const createSection = createPlayerSectionNew();

	page.append(nav, createSection);

	return page;
}
