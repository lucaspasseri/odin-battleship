import { carouselImageSelector } from "../ui/components/index.js";
import goToPage from "../ui/goToPage.js";

export default function multiplayerPage() {
	const container = document.createElement("div");
	container.className = "px-[1em] md:px-[4em] py-[1em] flex gap-[2em] flex-col";

	const h2 = "Add players";

	const main = document.createElement("div");
	main.className = "flex border";

	const p1Container = document.createElement("div");
	p1Container.className = "flex-1 flex justify-center";
	const p1H3 = document.createElement("h3");
	p1H3.textContent = "P1";

	const p1Frame = document.createElement("div");
	p1Frame.className = "border w-[500px] h-[800px] flex flex-col items-center";

	const p1NameSelector = document.createElement("div");
	p1NameSelector.textContent = "Name selector";

	const imageSelector = carouselImageSelector();

	const p1TypeSelector = document.createElement("div");

	const typeContainer = document.createElement("div");
	const label = document.createElement("label");

	label.htmlFor = "typeCheckbox";
	label.className = "typeCheckboxLabel";

	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.id = "typeCheckbox";

	typeContainer.append(checkbox, label);
	p1TypeSelector.appendChild(typeContainer);

	p1Frame.append(imageSelector, p1TypeSelector, p1NameSelector);

	p1Container.append(p1H3, p1Frame);

	const p2Container = document.createElement("div");
	p2Container.className = "flex-1";
	const p2H3 = document.createElement("h3");
	p2H3.textContent = "P2";

	p2Container.append(p2H3);

	main.append(p1Container, p2Container);

	const buttonContainer = document.createElement("div");
	buttonContainer.className = "flex justify-center";

	const button = document.createElement("button");
	button.className =
		"flex-1 rounded border-[var(--color)] border-2 bg-gray-700";
	button.textContent = "next";

	button.addEventListener("click", () => {
		// goToPage("deployShips");
	});

	buttonContainer.appendChild(button);

	container.append(h2, main, buttonContainer);
	return container;
}
