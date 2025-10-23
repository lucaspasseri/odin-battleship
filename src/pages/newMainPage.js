import { state } from "../core/index.js";

import {
	createPlayerProfile,
	navbar,
	createGrid,
} from "../ui/components/index.js";

export default function newMainPage() {
	const page = document.createElement("div");
	const nav = navbar();

	const main = document.createElement("main");
	main.className = "px-[4em] py-[2em] flex flex-col gap-[1em] mb-[2em]";

	const h3 = document.createElement("h3");
	h3.textContent = "Enjoy the match!";
	h3.className = "font-mono text-2xl text-blue-600 font-bold";

	const content = document.createElement("div");
	content.className = "flex justify-between flex-wrap gap-[6em] relative";

	const p1Container = document.createElement("div");
	p1Container.className = "flex flex-col gap-[2em] flex-wrap";
	p1Container.id = "p1Container";

	const p1 = state.game.firstPlayer;

	const p1Profile = createPlayerProfile(p1);
	const p1Grid = createGrid(p1, state.game.firstPlayerIndex);

	p1Container.append(p1Profile, p1Grid);

	const versusContainer = document.createElement("div");
	versusContainer.className =
		"absolute inset-0 flex justify-center items-center z-[-99]";

	const h4 = document.createElement("h4");
	h4.className = "font-mono text-[6em] font-bold";
	h4.textContent = "VS";
	versusContainer.appendChild(h4);

	const p2Container = document.createElement("div");
	p2Container.className = "flex gap-[2em] flex-col-reverse flex-wrap items-end";
	p2Container.id = "p2Container";

	const p2 = state.game.secondPlayer;

	const p2Profile = createPlayerProfile(p2);
	const p2Grid = createGrid(p2, state.game.secondPlayerIndex);

	p2Container.append(p2Profile, p2Grid);

	content.append(p1Container, versusContainer, p2Container);

	main.append(h3, content);

	page.append(nav, main);
	return page;
}
