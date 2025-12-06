import {
	deployShipsPage,
	initialPage,
	mainPage,
	lastPage,
	errorPage,
	gameMode,
	deployShips,
	playMatch,
	multiplayerPage,
} from "../pages/index.js";

const pageMap = {
	deployShipsPage,
	initialPage,
	mainPage,
	lastPage,
	errorPage,
	gameMode,
	deployShips,
	playMatch,
	multiplayerPage,
};

export default function goToPage(pageName) {
	const main = document.querySelector("#main");
	main.innerHTML = "";

	const createPage = pageMap[pageName] || errorPage;
	const pageElement = createPage();

	if (pageElement) {
		document.startViewTransition(() => {
			main.appendChild(pageElement);
		});
	}
}
