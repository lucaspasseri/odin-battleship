import {
	navbar,
	createPlayer,
	// createPlayerSection,
	createShipSection,
	createMatchSection,
	preGame,
} from "../ui/components/index.js";

export default function initialPage() {
	const nav = navbar();

	const preGameSec = preGame();
	const createPlayerSec = createPlayer();
	// const playerSec = createPlayerSection();
	const shipSec = createShipSection();
	const matchSec = createMatchSection();

	const page = document.createElement("div");

	page.append(nav, preGameSec, createPlayerSec, shipSec, matchSec);

	return page;
}
