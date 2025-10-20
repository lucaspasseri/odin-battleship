import { state } from "../../core/index.js";
import { createPlayerProfile } from "./index.js";

export default function playerList() {
	const list = document.createElement("ul");
	list.id = "playerList";
	list.className =
		"border-[0.3em] border-black flex items-center gap-[0.8em] px-[0.4em] py-[0.4em] rounded-2xl overflow-x-auto flex-1 h-[400px] min-w-[272px]";

	const players = state.game.players;

	if (players.length === 0) {
		const p = document.createElement("p");
		p.textContent = "( No player found )";
		list.appendChild(p);

		list.classList.add("justify-center");
		return list;
	}

	players.forEach(player => {
		const li = document.createElement("li");
		const profile = createPlayerProfile(player);

		li.appendChild(profile);
		list.appendChild(li);
	});

	return list;
}
