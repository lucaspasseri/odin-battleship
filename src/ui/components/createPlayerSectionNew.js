import { createNewPlayer, playerList } from "./index.js";

export default function createPlayerSectionNew() {
	const container = document.createElement("section");
	container.className = "px-[4em] pt-[2em] pb-[4em]";

	const h3 = document.createElement("h3");
	h3.textContent = "Create player";
	h3.className = "font-mono text-2xl text-blue-600 font-bold mb-[1em]";

	const wrapper = document.createElement("div");
	wrapper.className = "flex wrap gap-[3em] items-center";
	wrapper.id = "createPlayerWrapper";

	const create = createNewPlayer();

	const list = playerList();

	wrapper.append(create, list);

	container.append(h3, wrapper);
	return container;
}
