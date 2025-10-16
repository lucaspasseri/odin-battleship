import { state } from "../../core/index.js";
import { playerProfileWrapper } from "./index.js";

export default function playerList() {
	const list = document.createElement("ul");
	list.className =
		"border-[0.5em] border-black flex h-[160px] items-center gap-[0.8em] px-[0.4em] rounded-lg overflow-auto";

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
		const profile = playerProfileWrapper(player);

		li.appendChild(profile);
		list.appendChild(li);
	});

	return list;
}
