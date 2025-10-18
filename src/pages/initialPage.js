import {
	navbar,
	createPlayer,
	// createPlayerSection,
	createShips,
	createShipSection,
	createMatchSection,
	preGame,
} from "../ui/components/index.js";

export default function initialPage() {
	const nav = navbar();

	const preGameSec = preGame();
	const createPlayerSec = createPlayer();
	// const playerSec = createPlayerSection();
	const createShipsSec = createShips();
	const shipSec = createShipSection();
	const matchSec = createMatchSection();

	const page = document.createElement("div");

	page.append(
		nav,
		preGameSec,
		createPlayerSec,
		createShipsSec,
		shipSec,
		matchSec
	);

	return page;
}
