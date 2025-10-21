import { navbar } from "../ui/components/index.js";
import goToPage from "../ui/goToPage.js";

export default function errorPage() {
	const page = document.createElement("div");
	page.id = "errorPage";
	page.className = "border-4 border-red-700";

	const nav = navbar();

	const h1 = document.createElement("h1");
	h1.textContent = "Error page";

	const p = document.createElement("p");
	p.textContent = "Something went wrong!";

	const button = document.createElement("button");
	button.textContent = "Go to initial page";
	button.addEventListener("click", () => {
		goToPage("playersPage");
	});

	page.append(nav, h1, p, button);

	return page;
}
