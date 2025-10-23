import {
	playersPage,
	deployShipsPage,
	initialPage,
	mainPage,
	lastPage,
	errorPage,
	newMainPage,
} from "../pages/index.js";

export default function goToPage(page) {
	const pages = [
		"playersPage",
		"deployShipsPage",
		"initialPage",
		"mainPage",
		"lastPage",
		"errorPage",
		"errorPage",
		"newMainPage",
	];

	if (!pages.includes(page)) {
		throw new Error();
	}

	const container = document.querySelector("#container");
	container.innerHTML = "";

	if (page === "playersPage") {
		const page = playersPage();
		container.appendChild(page);
		return;
	}

	if (page === "deployShipsPage") {
		const page = deployShipsPage();
		container.appendChild(page);
		return;
	}

	if (page === "initialPage") {
		const page = initialPage();
		container.appendChild(page);
		return;
	}

	if (page === "mainPage") {
		const page = mainPage();
		container.appendChild(page);
		return;
	}

	if (page === "lastPage") {
		const page = lastPage();
		container.appendChild(page);
		return;
	}

	if (page === "errorPage") {
		const page = errorPage();
		container.appendChild(page);
		return;
	}

	if (page === "newMainPage") {
		const page = newMainPage();
		container.appendChild(page);
		return;
	}
}
