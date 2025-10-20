import { createPlayerProfile, basicButton } from "./index.js";
import { state } from "../../core/index.js";
import { updateMatchSection } from "./constants.js";

export default function playerSelector(playerString) {
	const container = document.createElement("div");
	container.className =
		"border-[0.3em] border-black flex items-center p-[0.4em] rounded-2xl h-[400px] w-[272px] relative";

	let player;
	let playerIndex;
	let handleNextPlayer;

	if (playerString === "firstPlayer") {
		player = state.game.firstPlayer;
		playerIndex = state.game.firstPlayerIndex;
		handleNextPlayer = function (nextIndex) {
			state.game.setFirstPlayerIndex(nextIndex);
		};
	} else if (playerString === "secondPlayer") {
		player = state.game.secondPlayer;
		playerIndex = state.game.secondPlayerIndex;
		handleNextPlayer = function (nextIndex) {
			state.game.setSecondPlayerIndex(nextIndex);
		};
	}

	if (player === undefined) {
		const p = document.createElement("div");
		p.textContent = "(not set)";
		container.appendChild(p);
		container.classList.add("justify-center");

		return container;
	}

	const profile = createPlayerProfile(player);

	function goLeft() {
		// const ps = [...document.querySelectorAll(".typeList p")];
		// const currIndex = ps.findIndex(p => p.dataset.current === "true");
		// const nextIndex =
		// 	currIndex === 0 ? ps.length - 1 : currIndex - (1 % ps.length);

		// ps[currIndex].setAttribute("data-current", false);
		// ps[nextIndex].setAttribute("data-current", true);

		// ps[nextIndex].scrollIntoView({
		// 	inline: "center",
		// 	behavior: "smooth",
		// });

		const nextIndex =
			playerIndex === 0 ? state.game.players.length - 1 : playerIndex - 1;
		handleNextPlayer(nextIndex);
		updateMatchSection();
	}

	const leftButton = basicButton(
		"◀",
		goLeft,
		"h-fit px-[0.35em] border border-black text-2xl bg-white my-auto",
		"h-full absolute flex left-[-72px]"
	);

	function goRight() {
		// const ps = [...document.querySelectorAll(".typeList p")];
		// const currIndex = ps.findIndex(p => p.dataset.current === "true");
		// const nextIndex = (currIndex + 1) % ps.length;

		// ps[currIndex].setAttribute("data-current", false);
		// ps[nextIndex].setAttribute("data-current", true);

		// ps[nextIndex].scrollIntoView({
		// 	inline: "center",
		// 	behavior: "smooth",
		// });
		const nextIndex =
			playerIndex === state.game.players.length - 1 ? 0 : playerIndex + 1;
		handleNextPlayer(nextIndex);
		updateMatchSection();
	}

	const rightButton = basicButton(
		"▶",
		goRight,
		"h-fit px-[0.35em] border border-black text-2xl bg-white my-auto",
		"h-full absolute flex right-[-72px]"
	);

	container.append(leftButton, profile, rightButton);
	return container;
}
