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

	page.appendChild(nav);

	if (preGameSec !== undefined) {
		page.appendChild(preGameSec);
	}

	page.append(playerSec, shipSec, matchSec);
	return page;
}
