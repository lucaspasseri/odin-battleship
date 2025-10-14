import { state } from "../../core/index.js";
import { playerProfile } from "./index.js";

export default function preGame() {
	const players = state.game.players;

	if (players.length === 0) {
		return;
	}

	const container = document.createElement("div");
	container.className = "preGameContainer";

	const h3 = document.createElement("h3");
	h3.textContent = "Players";

	const playerList = document.createElement("ul");

	players.forEach(player => {
		const li = document.createElement("li");
		const profile = playerProfile(player);

		li.appendChild(profile);
		playerList.appendChild(li);
	});

	const li = document.createElement("li");
	const openModalBtn = document.createElement("button");
	openModalBtn.textContent = "Add";
	openModalBtn.addEventListener("click", () => console.log(1));

	li.appendChild(openModalBtn);
	playerList.appendChild(li);

	container.append(h3, playerList);

	return container;
}
