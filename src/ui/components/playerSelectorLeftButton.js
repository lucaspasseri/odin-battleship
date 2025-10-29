import { basicButton } from "./index.js";
import { state } from "../../core/index.js";
import { updateDeployShipButton } from "./constants.js";

function goLeft(playerString) {
	const lis = [
		...document.querySelectorAll(`li.${playerString}-playerProfile`),
	];
	const currIndex = lis.findIndex(li => li.dataset.current === "true");
	const nextIndex =
		currIndex === 0 ? lis.length - 1 : currIndex - (1 % lis.length);

	lis[currIndex].setAttribute("data-current", false);
	lis[nextIndex].setAttribute("data-current", true);

	lis[nextIndex].scrollIntoView({
		inline: "center",
		behavior: "smooth",
		block: "nearest",
	});

	if (playerString === "firstPlayer") {
		state.game.setFirstPlayerIndex(nextIndex);
		state.game.setCurrPlayerIndex(nextIndex);
	}

	if (playerString === "secondPlayer") {
		state.game.setSecondPlayerIndex(nextIndex);
	}
	updateDeployShipButton();
}

export default function playerSelectorLeftButton(playerString) {
	return basicButton(
		"◀",
		goLeft,
		"h-fit px-[0.35em] border border-black text-2xl bg-white my-auto rounded",
		"h-full absolute flex left-[-20px] top-0",
		`${playerString}-playerSelectorLeftButton`,
		false,
		playerString
	);
}
