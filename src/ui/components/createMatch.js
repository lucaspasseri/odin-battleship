import { playerSelector } from "./index.js";
import { state } from "../../core/index.js";
import goToPage from "../goToPage.js";

export default function createMatch() {
	const container = document.createElement("section");
	container.className = "px-[4em] py-[2em]";
	container.id = "matchContainer";

	const h3 = document.createElement("h3");
	h3.textContent = "Match";
	h3.className = "font-mono text-2xl text-blue-600 font-bold mb-[1em]";

	const mainWrapper = document.createElement("div");
	mainWrapper.className = "flex justify-between items-center flex-wrap";

	const firstPlayerContainer = document.createElement("div");
	const firstPlayerH4 = document.createElement("h4");
	firstPlayerH4.textContent = "First player";
	firstPlayerH4.className = "text-blue-600 text-lg font-bold mb-[0.4em]";

	const firstPlayerSelector = playerSelector("firstPlayer");

	firstPlayerContainer.append(firstPlayerH4, firstPlayerSelector);

	const versusContainer = document.createElement("div");
	const p = document.createElement("p");
	p.textContent = "VS";
	p.className = "text-9xl font-mono";
	versusContainer.appendChild(p);

	const secondPlayerContainer = document.createElement("div");
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

	const buttonWrapper = document.createElement("div");
	buttonWrapper.className = "text-end py-[3em]";
	const deployShipsButton = document.createElement("button");
	deployShipsButton.textContent = "Deploy ships";
	deployShipsButton.className =
		"rounded-2xl w-fit text-2xl px-[0.6em] py-[0.2em] font-mono bg-green-400 bottom-[-70px] border-[0.1em] border-black";

	const isDisabled =
		state.game.firstPlayer === undefined ||
		state.game.secondPlayer === undefined ||
		state.game.firstPlayer === state.game.secondPlayer;

	deployShipsButton.disabled = isDisabled;

	if (isDisabled) {
		deployShipsButton.classList.replace("bg-green-400", "bg-gray-400");
	}

	deployShipsButton.addEventListener("click", () => {
		goToPage("deployShipsPage");
	});

	buttonWrapper.appendChild(deployShipsButton);

	container.append(h3, mainWrapper, buttonWrapper);
	return container;
}
