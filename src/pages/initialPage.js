import { goToPage } from "../ui/index.js";
import {
	navbar,
	createPlayerSection,
	createShipSection,
} from "../ui/components/index.js";

// function createPlayerSection() {
// 	const section = document.createElement("section");
// 	const h1 = "Create a player";

// 	const form = document.createElement("form");
// 	form.addEventListener("submit", ev => {
// 		ev.preventDefault();
// 		console.log({ ev });
// 	});

// 	const typeContainer = document.createElement("div");
// 	const typeLabel = document.createElement("label");
// 	typeLabel.htmlFor = "typeInput";
// 	typeLabel.textContent = "Player type:";

// 	const typeInput = document.createElement("select");
// 	typeInput.id = "typeInput";

// 	const realOpt = document.createElement("option");
// 	realOpt.value = "real";
// 	realOpt.textContent = "Real";

// 	const cpuOpt = document.createElement("option");
// 	cpuOpt.value = "cpu";
// 	cpuOpt.textContent = "CPU";

// 	typeInput.append(realOpt, cpuOpt);
// 	typeContainer.append(typeLabel, typeInput);

// 	const nameContainer = document.createElement("div");
// 	const nameLabel = document.createElement("label");
// 	nameLabel.htmlFor = "nameInput";
// 	nameLabel.textContent = "Player name:";

// 	const nameInput = document.createElement("input");
// 	nameInput.id = "nameInput";
// 	nameInput.type = "text";

// 	nameContainer.append(nameLabel, nameInput);

// 	const confirmBtn = document.createElement("button");
// 	confirmBtn.textContent = "Create";
// 	confirmBtn.className = "playerConfirmBtn";

// 	form.append(typeContainer, nameContainer, confirmBtn);

// 	section.append(h1, form);

// 	return section;
// }

export default function initialPage() {
	const nav = navbar();
	const playerSec = createPlayerSection();
	const shipSec = createShipSection();
	const page = document.createElement("div");

	const mainPageButton = document.createElement("button");
	mainPageButton.textContent = "Main Page";
	mainPageButton.addEventListener("click", () => {
		goToPage("mainPage");
	});

	page.appendChild(nav);

	page.append(playerSec, shipSec, mainPageButton);
	return page;
}
