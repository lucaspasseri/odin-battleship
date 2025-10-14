import { state } from "../../core/index.js";
import { goToPage } from "../index.js";

export default function createShipSection() {
	const section = document.createElement("section");
	section.className = "createShipSection";
	const h1 = "Create a ship";

	const playersArr = state.game.players;

	const form = document.createElement("form");
	form.addEventListener("submit", ev => {
		ev.preventDefault();
		const formData = new FormData(ev.target);

		const playerIndex = Number(formData.get("playerInput"));
		const x = Number(formData.get("xInput"));
		const y = Number(formData.get("yInput"));
		const length = Number(formData.get("lengthInput"));
		const direction = formData.get("directionInput");

		console.log({ x, y, length, direction, playerIndex });

		playersArr[playerIndex].gameboard.placeShip(x, y, length, direction);
		goToPage("initialPage");
	});

	// Player

	const playerContainer = document.createElement("div");
	const playerLabel = document.createElement("label");
	playerLabel.htmlFor = "playerInput";
	playerLabel.textContent = "Choose player:";

	const playerInput = document.createElement("select");
	playerInput.id = "playerInput";
	playerInput.name = "playerInput";

	playersArr.forEach((player, index) => {
		const opt = document.createElement("option");
		opt.value = index;
		opt.textContent = player.name;
		playerInput.appendChild(opt);
	});

	playerContainer.append(playerLabel, playerInput);

	// X

	const xContainer = document.createElement("div");
	const xLabel = document.createElement("label");
	xLabel.htmlFor = "xInput";
	xLabel.textContent = "X position:";

	const xInput = document.createElement("select");
	xInput.id = "xInput";
	xInput.name = "xInput";

	const possibleValues = Array.from(new Array(10), (_, index) =>
		index.toString()
	);

	possibleValues.forEach(value => {
		const opt = document.createElement("option");
		opt.value = value;
		opt.textContent = value;
		xInput.appendChild(opt);
	});

	xContainer.append(xLabel, xInput);

	// Y

	const yContainer = document.createElement("div");
	const yLabel = document.createElement("label");
	yLabel.htmlFor = "yInput";
	yLabel.textContent = "Y position:";

	const yInput = document.createElement("select");
	yInput.id = "yInput";
	yInput.name = "yInput";

	possibleValues.forEach(value => {
		const opt = document.createElement("option");
		opt.value = value;
		opt.textContent = value;
		yInput.appendChild(opt);
	});

	yContainer.append(yLabel, yInput);

	// Length

	const lengthContainer = document.createElement("div");
	const lengthLabel = document.createElement("label");
	lengthLabel.htmlFor = "lengthInput";
	lengthLabel.textContent = "Length:";

	const lengthInput = document.createElement("select");
	lengthInput.id = "lengthInput";
	lengthInput.name = "lengthInput";

	Array.from(new Array(4), (_, index) => (index + 2).toString()).forEach(
		value => {
			const opt = document.createElement("option");
			opt.value = value;
			opt.textContent = value;
			lengthInput.appendChild(opt);
		}
	);

	lengthContainer.append(lengthLabel, lengthInput);

	// Direction

	const directionContainer = document.createElement("div");
	const directionLabel = document.createElement("label");
	directionLabel.htmlFor = "directionInput";
	directionLabel.textContent = "Direction:";

	const directionInput = document.createElement("select");
	directionInput.id = "directionInput";
	directionInput.name = "directionInput";

	const horizontalOpt = document.createElement("option");
	horizontalOpt.value = "horizontal";
	horizontalOpt.textContent = "horizontal";

	const verticalOpt = document.createElement("option");
	verticalOpt.value = "vertical";
	verticalOpt.textContent = "vertical";

	directionInput.append(horizontalOpt, verticalOpt);

	directionContainer.append(directionLabel, directionInput);

	// Btn

	const confirmBtn = document.createElement("button");
	confirmBtn.textContent = "Create";
	confirmBtn.className = "shipConfirmBtn";

	form.append(
		playerContainer,
		xContainer,
		yContainer,
		lengthContainer,
		directionContainer,
		confirmBtn
	);

	section.append(h1, form);

	return section;
}
