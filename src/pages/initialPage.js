import {
	navbar,
	createPlayerSection,
	createShipSection,
	createMatchSection,
	preGame,
} from "../ui/components/index.js";

export default function initialPage() {
	const nav = navbar();

	const preGameSec = preGame();
	const playerSec = createPlayerSection();
	const shipSec = createShipSection();
	const matchSec = createMatchSection();

	const page = document.createElement("div");

	page.append(nav, preGameSec, playerSec, shipSec, matchSec);

	return page;
}
