import { state } from "../../core/index.js";
import {
	createPlayerProfile,
	playerListLeftButton,
	playerListRightButton,
} from "./index.js";

export default function playerList() {
	const container = document.createElement("div");
	container.className =
		"relative w-full max-w-[calc(100%-346px)] min-w-[280px]";
	container.id = "playerList";

	const list = document.createElement("ul");
	list.className =
		"border-[0.3em] border-black flex items-center gap-[0.8em] px-[6em] py-[0.4em] rounded-2xl h-[383px] w-full overflow-hidden";

	const players = state.game.players;

	if (players.length === 0) {
		const p = document.createElement("p");
		p.textContent = "(No player found)";
		list.appendChild(p);

		list.classList.add("justify-center");
		container.appendChild(list);
		return container;
	}

	players.forEach((player, index) => {
		const li = document.createElement("li");
		li.className = "playerProfile";

		if (index === 0) {
			li.setAttribute("data-current", true);
		}
		const profile = createPlayerProfile(player);

		li.appendChild(profile);
		list.appendChild(li);
	});

	const leftButton = playerListLeftButton;
	const rightButton = playerListRightButton;

	container.append(leftButton, list, rightButton);

	return container;
}
