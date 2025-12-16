import { carouselImageSelector, shimmerButton } from "./index.js";

export default function playerProfileForm(playerIndex) {
	const container = document.createElement("div");
	container.id = `playerProfileForm-${playerIndex}`;
	const frame = document.createElement("div");
	frame.className =
		"border-[var(--color)] border-[0.5em] w-[280px] h-[440px] sm:w-[330px] sm:h-[500px] flex flex-col items-center justify-center rounded-xl sm:gap-[1em] gap-[0.6em]";

	if (playerIndex === "1") {
		frame.classList.add("bg-red-700");
	} else {
		frame.classList.add("bg-purple-700");
	}

	const imageSelector = carouselImageSelector(playerIndex);

	const typeSelector = document.createElement("div");

	const typeContainer = document.createElement("div");
	const label = document.createElement("label");
	label.role = "button";
	label.tabIndex = 0;
	label.htmlFor = `typeCheckbox-${playerIndex}`;
	label.className = "typeCheckboxLabel cursor-pointer";

	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.id = `typeCheckbox-${playerIndex}`;

	typeContainer.append(checkbox, label);

	const playerTypePreview = document.createElement("div");
	playerTypePreview.className =
		"border-[var(--color)] border-[0.2em] text-center text-xl text-[var(--color)] mb-[0.6em] rounded";
	const playerTypePreviewH3 = document.createElement("h3");

	playerTypePreviewH3.textContent = checkbox.checked ? "CPU" : "HUMAN";
	playerTypePreview.appendChild(playerTypePreviewH3);

	checkbox.addEventListener("change", () => {
		playerTypePreviewH3.textContent = checkbox.checked ? "CPU" : "HUMAN";

		const playerColor = playerIndex === "1" ? "bg-red-700" : "bg-purple-700";
		frame.classList.replace(
			checkbox.checked ? playerColor : "bg-gray-700",
			checkbox.checked ? "bg-gray-700" : playerColor
		);

		const checkbox1 = document.querySelector("#typeCheckbox-1");
		const checkbox2 = document.querySelector("#typeCheckbox-2");

		const isDisabled = checkbox1?.checked && checkbox2?.checked;

		const buttonContainer = document.querySelector(
			"#playersFormSubmitterContainer"
		);

		const button = document.querySelector("#playersFormSubmitter");

		const newButton = shimmerButton(
			"Deploy ships",
			isDisabled,
			"playersFormSubmitter"
		);

		buttonContainer.replaceChild(newButton, button);
	});

	typeSelector.append(playerTypePreview, typeContainer);

	const nameSelector = document.createElement("div");
	nameSelector.className = "text-[1.4em] text-gray-700 w-full";
	const nameInput = document.createElement("input");
	nameInput.className = "text-center block w-[50%] m-auto rounded";
	nameInput.type = "text";
	nameInput.name = `p${playerIndex}Name`;
	nameInput.id = `p${playerIndex}NameInput`;
	nameInput.value = `Player ${playerIndex}`;

	nameSelector.appendChild(nameInput);

	frame.append(imageSelector, typeSelector, nameSelector);

	container.append(frame);

	return container;
}
