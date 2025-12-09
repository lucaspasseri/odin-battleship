import { carouselImageSelector } from "./index.js";

export default function playerProfileForm(playerIndex) {
	const container = document.createElement("div");
	container.id = `playerProfileForm-${playerIndex}`;
	const frame = document.createElement("div");
	frame.className =
		"border-[var(--color)] border-[0.5em] w-[330px] h-[500px] md:w-[500px] md:h-[800px] flex flex-col items-center justify-center rounded-xl gap-[1.5em]";

	if (playerIndex === "1") {
		frame.classList.add("bg-red-700");
	} else {
		frame.classList.add("bg-purple-700");
	}

	const imageSelector = carouselImageSelector(playerIndex);

	const typeSelector = document.createElement("div");

	const typeContainer = document.createElement("div");
	const label = document.createElement("label");

	label.htmlFor = `typeCheckbox-${playerIndex}`;
	label.className = "typeCheckboxLabel cursor-pointer";

	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.id = `typeCheckbox-${playerIndex}`;

	typeContainer.append(checkbox, label);

	const playerTypePreview = document.createElement("div");
	playerTypePreview.className =
		"border-[var(--color)] border-[0.3em] text-center text-xl text-[var(--color)] mb-[0.6em]";
	const playerTypePreviewH3 = document.createElement("h3");

	playerTypePreviewH3.textContent = checkbox.checked ? "CPU" : "HUMAN";
	playerTypePreview.appendChild(playerTypePreviewH3);

	checkbox.addEventListener("change", () => {
		playerTypePreviewH3.textContent = checkbox.checked ? "CPU" : "HUMAN";
		if (!checkbox.checked) {
			if (playerIndex === "1") {
				frame.classList.replace("bg-gray-700", "bg-red-700");
			} else {
				frame.classList.replace("bg-gray-700", "bg-purple-700");
			}
		} else {
			if (playerIndex === "1") {
				frame.classList.replace("bg-red-700", "bg-gray-700");
			} else {
				frame.classList.replace("bg-purple-700", "bg-gray-700");
			}
		}

		const checkbox1 = document.querySelector("#typeCheckbox-1");
		const checkbox2 = document.querySelector("#typeCheckbox-2");
		const isDisabled = checkbox1?.checked && checkbox2?.checked;

		const button = document.querySelector("#playersFormSubmitter");

		button.disabled = isDisabled;

		if (isDisabled) {
			button.classList.replace("bg-green-700", "bg-gray-700");
		} else {
			button.classList.replace("bg-gray-700", "bg-green-700");
		}
	});

	typeSelector.append(playerTypePreview, typeContainer);

	const nameSelector = document.createElement("div");
	nameSelector.className = "text-[1.4em] text-gray-700";
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
