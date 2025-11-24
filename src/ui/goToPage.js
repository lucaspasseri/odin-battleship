import {
	deployShipsPage,
	initialPage,
	mainPage,
	lastPage,
	errorPage,
	gameMode,
	deployShips,
	playMatch,
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
