import { state } from "../../core/index.js";

export default function playerProfile(playerIndex) {
	const currPlayer = state.game.players[playerIndex];
	const container = document.createElement("div");
	container.className = "w-fit";
	const frame = document.createElement("div");
	frame.className =
		"border-[var(--color)] border-[0.5em] w-[280px] h-[400px] sm:w-[330px] sm:h-[500px] flex flex-col items-center justify-center rounded-xl sm:gap-[1em] gap-[0.6em]";

	if (currPlayer.type === "computer") {
		frame.classList.add("bg-gray-700");
	} else if (playerIndex === state.game.firstPlayerIndex) {
		frame.classList.add("bg-red-700");
	} else {
		frame.classList.add("bg-purple-700");
	}

	const playerImage = document.createElement("div");

	const backgroundPositionMap = {
		1: "-17px -19px",
		2: "-190px -19px",
		3: "-366px -19px",
		4: "-545px -19px",
		5: "-15px -251px",
		6: "-188px -251px",
		7: "-362px -251px",
		8: "-546px -251px",
	};
	const imageIndex = currPlayer.imageIndex;
	const bgPosition = backgroundPositionMap[imageIndex].replace(" ", "_");

	playerImage.className = `frame bg-[position:${bgPosition}]`;

	const playerTypePreview = document.createElement("div");
	playerTypePreview.className =
		"border-[var(--color)] border-[0.3em] text-center text-xl text-[var(--color)] px-[0.8em]";
	const playerTypePreviewH3 = document.createElement("h3");

	playerTypePreviewH3.textContent =
		currPlayer.type === "computer" ? "CPU" : "HUMAN";
	playerTypePreview.appendChild(playerTypePreviewH3);

	const nameSelector = document.createElement("div");
	nameSelector.className = "text-[1.4em] text-gray-700 w-full";
	const nameInput = document.createElement("input");
	nameInput.readOnly = true;
	nameInput.className = "text-center w-[50%] block m-auto";
	nameInput.type = "text";
	nameInput.name = `p${playerIndex}Name`;
	nameInput.id = `p${playerIndex}NameInput`;
	nameInput.value = currPlayer.name;

	nameSelector.appendChild(nameInput);

	frame.append(playerImage, playerTypePreview, nameSelector);

	container.append(frame);

	return container;
}
