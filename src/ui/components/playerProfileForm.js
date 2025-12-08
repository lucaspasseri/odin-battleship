import { carouselImageSelector } from "./index.js";

export default function playerProfileForm(playerIndex) {
	const container = document.createElement("div");
	container.id = `playerProfileForm-${playerIndex}`;
	const frame = document.createElement("div");
	frame.className =
		"border w-[500px] h-[800px] flex flex-col items-center justify-center border-red-600";

	const imageSelector = carouselImageSelector(playerIndex);

	const typeSelector = document.createElement("div");

	const typeContainer = document.createElement("div");
	const label = document.createElement("label");

	label.htmlFor = `typeCheckbox-${playerIndex}`;
	label.className = "typeCheckboxLabel mt-[1em] cursor-pointer";

	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.id = `typeCheckbox-${playerIndex}`;

	typeContainer.append(checkbox, label);

	const playerTypePreview = document.createElement("div");
	playerTypePreview.className =
		"border-white border-[0.4em] text-center text-xl text-white";
	const playerTypePreviewH3 = document.createElement("h3");

	playerTypePreviewH3.textContent = checkbox.checked ? "CPU" : "HUMAN";
	playerTypePreview.appendChild(playerTypePreviewH3);

	checkbox.addEventListener("change", () => {
		playerTypePreviewH3.textContent = checkbox.checked ? "CPU" : "HUMAN";
	});

	typeSelector.append(playerTypePreview, typeContainer);

	const nameSelector = document.createElement("div");
	nameSelector.className = "mt-[1em] text-[1.4em] text-gray-700";
	const nameInput = document.createElement("input");
	nameInput.className = "text-center";
	nameInput.type = "text";
	nameInput.name = `p${playerIndex}Name`;
	nameInput.id = `p${playerIndex}NameInput`;
	nameInput.value = `Player ${playerIndex}`;

	nameSelector.appendChild(nameInput);

	frame.append(imageSelector, typeSelector, nameSelector);

	container.append(frame);

	return container;
}
