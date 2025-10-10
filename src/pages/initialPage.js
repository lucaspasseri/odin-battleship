import { goToPage } from "../ui/index.js";

export default function initialPage() {
	const page = document.createElement("div");
	const h1 = document.createElement("h1");
	h1.textContent = " INITIAL PAGE!";
	const mainPageButton = document.createElement("button");
	mainPageButton.textContent = "Main Page";
	mainPageButton.addEventListener("click", () => {
		goToPage("mainPage");
	});
	page.appendChild(h1);
	page.appendChild(mainPageButton);
	return page;
}
