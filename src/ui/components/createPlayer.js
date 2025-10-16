import {
	playerImageSelector,
	playerTypeSelector,
	playerForm,
} from "./index.js";

export default function createPlayer() {
	const container = document.createElement("div");
	container.className = " px-[4em] py-[1em] relative";
	const h3 = document.createElement("h3");
	h3.textContent = "Create player";
	h3.className = "text-2xl mb-[0.4em]";

	const selectionContainer = document.createElement("div");
	selectionContainer.className = "flex flex-col items-center gap-[0.6em]";

	const imageSelector = playerImageSelector();
	const typeSelector = playerTypeSelector();
	const form = playerForm();

	selectionContainer.append(imageSelector, typeSelector, form);

	container.append(h3, selectionContainer);
	return container;
}
