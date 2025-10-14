import { state } from "../../core/index.js";
import { goToPage } from "../index.js";
import { playerProfile, shipList } from "../components/index.js";

export default function createMatchSection() {
	const section = document.createElement("section");
	section.className = "createMatchSection";
	const h1 = "Play Battleship";

	const profileContainer = document.createElement("div");
	profileContainer.className = "profileContainer";

	const playerOneProfile = playerProfile(state.game.firstPlayer);
	const playerTwoProfile = playerProfile(state.game.secondPlayer);

	profileContainer.append(playerOneProfile, playerTwoProfile);

	const form = document.createElement("form");
	form.addEventListener("submit", ev => {
		ev.preventDefault();
		const formData = new FormData(ev.target);

		const playerOneIndex = Number(formData.get("playerOneInput"));
		const playerTwoIndex = Number(formData.get("playerTwoInput"));

		console.log({ playerOneIndex, playerTwoIndex });

		if (
			playerOneIndex === playerTwoIndex ||
			state.game.getShips(playerOneIndex).length === 0 ||
			state.game.getShips(playerTwoIndex).length === 0
		) {
			return;
		}

		state.game.setCurrPlayerIndex(state.game.firstPlayerIndex);
		goToPage("mainPage");
	});

	const choosePlayerContainer = document.createElement("div");
	choosePlayerContainer.className = "choosePlayerContainer";

	const playersArr = state.game.players;

	// Player 1

	const playerOneContainer = document.createElement("div");
	const playerOneLabel = document.createElement("label");
	playerOneLabel.htmlFor = "playerOneInput";
	playerOneLabel.textContent = "Choose the first player:";

	const playerOneInput = document.createElement("select");
	playerOneInput.id = "playerOneInput";
	playerOneInput.name = "playerOneInput";

	playerOneInput.addEventListener("change", ev => {
		const value = Number(ev.target.value);

		state.game.setFirstPlayerIndex(value);
		goToPage("initialPage");
	});

	playersArr.forEach((player, index) => {
		const opt = document.createElement("option");
		opt.value = index;
		opt.textContent = player.name;
		if (player === state.game.firstPlayer) {
			opt.selected = true;
		}

		playerOneInput.appendChild(opt);
	});

	const playerOneShipList = shipList(state.game.firstPlayerIndex);

	playerOneContainer.append(playerOneLabel, playerOneInput, playerOneShipList);

	// Player 2

	const playerTwoContainer = document.createElement("div");
	const playerTwoLabel = document.createElement("label");
	playerTwoLabel.htmlFor = "playerTwoInput";
	playerTwoLabel.textContent = "Choose the second player:";

	const playerTwoInput = document.createElement("select");
	playerTwoInput.id = "playerTwoInput";
	playerTwoInput.name = "playerTwoInput";

	playerTwoInput.addEventListener("change", ev => {
		const value = Number(ev.target.value);

		state.game.setSecondPlayerIndex(value);
		goToPage("initialPage");
	});

	playersArr
		// .filter(player => player !== state.game.firstPlayer)
		.forEach((player, index) => {
			const opt = document.createElement("option");
			opt.value = index;
			opt.textContent = player.name;

			if (player === state.game.secondPlayer) {
				opt.selected = true;
			}
			playerTwoInput.appendChild(opt);
		});

	const playerTwoShipList = shipList(state.game.secondPlayerIndex);

	playerTwoContainer.append(playerTwoLabel, playerTwoInput, playerTwoShipList);

	// Btn

	const playBtn = document.createElement("button");
	playBtn.textContent = "Play";
	playBtn.className = "playBtn";

	choosePlayerContainer.append(playerOneContainer, playerTwoContainer);

	form.append(choosePlayerContainer, playBtn);

	section.append(h1, profileContainer, form);

	return section;
}
