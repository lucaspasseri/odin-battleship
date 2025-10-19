import {
	playerImageSelector,
	playerTypeSelector,
	playerForm,
} from "./index.js";

export default function createNewPlayer() {
	const container = document.createElement("div");
	container.id = "createNewPlayer";
	container.className =
		"px-[1em] py-[1em] relative border-[0.3em] border-black bg-blue-600 rounded-2xl h-[361px]";

	const selectionContainer = document.createElement("div");
	selectionContainer.className = "flex flex-col items-center gap-[1em]";

	const imageSelector = playerImageSelector();
	const typeSelector = playerTypeSelector();
	const form = playerForm();

	selectionContainer.append(imageSelector, form, typeSelector);

	container.appendChild(selectionContainer);
	return container;
}
