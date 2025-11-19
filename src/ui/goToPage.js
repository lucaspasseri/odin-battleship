import {
	deployShipsPage,
	initialPage,
	mainPage,
	lastPage,
	errorPage,
	gameMode,
} from "../pages/index.js";

const pageMap = {
	deployShipsPage,
	initialPage,
	mainPage,
	lastPage,
	errorPage,
	gameMode,
};

export default function goToPage(pageName) {
	const main = document.querySelector("#main");
	main.innerHTML = "";

	const createPage = pageMap[pageName] || errorPage;
	const pageElement = createPage();

	if (pageElement) {
		main.appendChild(pageElement);
	}
}
