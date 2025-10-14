import {
	navbar,
	createPlayerSection,
	createShipSection,
	createMatchSection,
} from "../ui/components/index.js";

export default function initialPage() {
	const nav = navbar();
	const playerSec = createPlayerSection();
	const shipSec = createShipSection();
	const matchSec = createMatchSection();

	const page = document.createElement("div");

	page.appendChild(nav);

	page.append(playerSec, shipSec, matchSec);
	return page;
}
