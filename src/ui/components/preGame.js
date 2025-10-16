import { playerList } from "./index.js";

export default function preGame() {
	const container = document.createElement("div");
	container.className = "px-[4em] py-[1em]";

	const h3 = document.createElement("h3");
	h3.textContent = "Players";
	h3.className = "text-2xl mb-[0.4em]";

	const list = playerList();

	container.append(h3, list);

	return container;
}
