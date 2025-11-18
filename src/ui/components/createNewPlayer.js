import {
	playerImageSelector,
	playerTypeSelector,
	playerForm,
	imageSelector,
} from "./index.js";
import { normalize } from "../../util/normalize.js";
import leftTriangleSvg from "./leftTriangleSvg.js";

export default function createNewPlayer() {
	const container = document.createElement("div");
	container.id = "createNewPlayer";
	container.className =
		"px-[1em] py-[1em] relative border-[0.3em] border-black bg-blue-600 rounded-2xl h-[361px] flex-0";

	const imageSelect = imageSelector();

	container.appendChild(imageSelect);
	return container;
}
// const imageSelector = playerImageSelector();
// const typeSelector = playerTypeSelector();
// const form = playerForm();

// selectionContainer.append(imageSelector, form, typeSelector);
