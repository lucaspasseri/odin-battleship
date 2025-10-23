import {
	deployShipsPage,
	initialPage,
	mainPage,
	lastPage,
	errorPage,
} from "../pages/index.js";

export default function goToPage(page) {
	const pages = [
		"deployShipsPage",
		"initialPage",
		"mainPage",
		"lastPage",
		"errorPage",
		"errorPage",
	];

	if (!pages.includes(page)) {
		throw new Error();
	}

	const container = document.querySelector("#container");
	container.innerHTML = "";

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
}
