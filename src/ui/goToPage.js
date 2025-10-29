import {
	deployShipsPage,
	initialPage,
	mainPage,
	lastPage,
	errorPage,
} from "../pages/index.js";

const pageMap = {
	deployShipsPage,
	initialPage,
	mainPage,
	lastPage,
	errorPage,
};

export default function goToPage(pageName) {
	const container = document.querySelector("#container");
	container.innerHTML = "";

	const createPage = pageMap[pageName] || errorPage;
	const pageElement = createPage();

	if (pageElement) {
		container.appendChild(pageElement);
	}
}
