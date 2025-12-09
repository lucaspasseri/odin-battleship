import { state } from "../../core/index.js";

export default function playerProfile(playerIndex) {
	const currPlayer = state.game.players[playerIndex];
	const playerProfileContainer = document.createElement("div");
	const playerProfile = document.createElement("div");

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

	const playerType = document.createElement("div");
	playerType.textContent = currPlayer.type;
	const playerName = document.createElement("div");
	playerName.textContent = currPlayer.name;

	playerProfile.append(playerImage, playerType, playerName);
	playerProfileContainer.appendChild(playerProfile);
	return playerProfileContainer;
}
