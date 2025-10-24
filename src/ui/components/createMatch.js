import { deployShipButton, playerSelector } from "./index.js";

export default function createMatch() {
	const container = document.createElement("section");
	container.className = "px-[4em] py-[2em]";
	container.id = "matchContainer";

	const h3 = document.createElement("h3");
	h3.textContent = "Match";
	h3.className = "font-mono text-2xl text-blue-600 font-bold mb-[1em]";

	const mainWrapper = document.createElement("div");
	mainWrapper.className =
		"flex justify-between items-center flex-wrap relative";

	const firstPlayerContainer = document.createElement("div");
	firstPlayerContainer.id = "firstPlayerContainer";
	const firstPlayerH4 = document.createElement("h4");
	firstPlayerH4.textContent = "First player";
	firstPlayerH4.className = "text-blue-600 text-lg font-bold mb-[0.4em]";

	const firstPlayerSelector = playerSelector("firstPlayer");

	firstPlayerContainer.append(firstPlayerH4, firstPlayerSelector);

	const versusContainer = document.createElement("div");
	versusContainer.className =
		"absolute inset-0 flex justify-center items-center z-[-99]";
	const p = document.createElement("p");
	p.textContent = "VS";
	p.className = "font-mono text-[6em] font-bold";
	versusContainer.appendChild(p);

	const secondPlayerContainer = document.createElement("div");
	secondPlayerContainer.id = "secondPlayerContainer";
	const secondPlayerH4 = document.createElement("h4");
	secondPlayerH4.textContent = "Second player";
	secondPlayerH4.className = "text-blue-600 text-lg font-bold mb-[0.4em]";

	const secondPlayerSelector = playerSelector("secondPlayer");
	secondPlayerContainer.append(secondPlayerH4, secondPlayerSelector);

	mainWrapper.append(
		firstPlayerContainer,
		versusContainer,
		secondPlayerContainer
	);

	const button = deployShipButton();

	container.append(h3, mainWrapper, button);
	return container;
}
