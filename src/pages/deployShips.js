import goToPage from "../ui/goToPage.js";

export default function deployShips() {
	const container = document.createElement("div");
	container.className = "px-[1em] md:px-[4em] py-[1em] flex gap-[2em] flex-col";

	const h2 = "Deploy ships";

	const shipsAndGridContainer = document.createElement("div");
	shipsAndGridContainer.className = "flex justify-center";

	container.append(h2, shipsAndGridContainer);
	return container;
}
