import {
	playersPage,
	initialPage,
	mainPage,
	lastPage,
} from "../pages/index.js";

export default function goToPage(page) {
	const pages = ["playersPage", "initialPage", "mainPage", "lastPage"];

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
}
