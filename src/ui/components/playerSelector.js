import {
	createPlayerProfile,
	playerSelectorLeftButton,
	playerSelectorRightButton,
} from "./index.js";
import { state } from "../../core/index.js";

export default function playerSelector(playerString) {
	const container = document.createElement("div");
	container.id = `${playerString}PlayerSelector`;
	container.className = "relative w-full max-w-[300px] min-w-[280px]";

	const list = document.createElement("ul");
	list.className =
		"border-[0.3em] border-black flex items-center gap-[0.8em] py-[0.4em] px-[2em] rounded-2xl h-[383px] w-full overflow-hidden";

	if (state.game.players.length === 0) {
		const p = document.createElement("p");
		p.textContent = "(Not set)";
		list.appendChild(p);

		list.classList.add("justify-center");
		container.appendChild(list);
		return container;
	}

	state.game.players.forEach((player, index) => {
		const li = document.createElement("li");
		li.className = `${playerString}-playerProfile`;

		if (playerString === "firstPlayer") {
			if (state.game.firstPlayerIndex === index) {
				li.setAttribute("data-current", true);
			}
		} else {
			if (state.game.secondPlayerIndex === index) {
				li.setAttribute("data-current", true);
			}
		}

		const profile = createPlayerProfile(player);
		li.appendChild(profile);
		list.appendChild(li);
	});

	const leftButton = playerSelectorLeftButton(playerString);
	const rightButton = playerSelectorRightButton(playerString);

	container.append(leftButton, list, rightButton);

	return container;
}
