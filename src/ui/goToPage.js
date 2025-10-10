import initialPage from "../pages/initialPage.js";
import mainPage from "../pages/mainPage.js";
import lastPage from "../pages/lastPage.js";

export default function goToPage(page) {
	const pages = ["initialPage", "mainPage", "lastPage"];

	if (!pages.includes(page)) {
		throw new Error();
	}

	const container = document.querySelector("#container");
	container.innerHTML = "";

	console.log(pages.includes(page));

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
