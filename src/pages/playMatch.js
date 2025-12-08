import goToPage from "../ui/goToPage.js";
import { state } from "../core/index.js";
import { grid } from "../ui/components/index.js";
import { computerAttackCell } from "../ui/constants/playMatch.js";
export default function playMatch() {
	console.log({
		state,
		players: state.game.players,
		currPlayer: state.game.currPlayer,
	});

	if (
		state.game.getPlayerIndex(state.game.currPlayer) >
		state.game.getPlayerIndex(state.game.opponentPlayer)
	) {
		state.game.changePlayer();
	}

	if (state.game.currPlayer.type === "computer") {
		computerAttackCell().then(() => {
			state.game.changePlayer();
		});
	}

	const waterSplash = new Howl({
		src: ["./src/assets/dropOnWater.wav"],
		volume: 0.25,
	});

	const shipDamage = new Howl({
		src: ["./src/assets/explosion.mp3"],
		volume: 0.25,
	});

	const shipDestruction = new Howl({
		src: ["./src/assets/bigExplosion.wav"],
		volume: 0.25,
	});

	state.pageSounds.push(waterSplash);
	state.pageSounds.push(shipDamage);
	state.pageSounds.push(shipDestruction);

	const container = document.createElement("div");
	container.className = "px-[1em] md:px-[4em] py-[1em] flex gap-[2em] flex-col";

	const h2 = "Play match";

	const main = document.createElement("main");

	const h3 = document.createElement("h3");
	h3.textContent = "Game status: ";
	const gameStatusSpan = document.createElement("span");
	gameStatusSpan.id = "gameStatus";
	gameStatusSpan.textContent = "Playing game...";
	h3.appendChild(gameStatusSpan);

	const gridsContainer = document.createElement("div");
	gridsContainer.className =
		"border flex justify-center gap-[2em] p-[2em] flex-wrap";
	const index1 = state.game.firstPlayerIndex;
	const p1 = state.game.players[index1];
	const index2 = state.game.secondPlayerIndex;
	const p2 = state.game.players[index2];

	const grid1Container = document.createElement("div");
	grid1Container.id = `gridContainer-${index1}`;

	const header1 = document.createElement("h2");
	header1.textContent = p1.name;

	const subHeader1 = document.createElement("h3");
	subHeader1.textContent = p1.type;

	const shipsLeft1 = document.createElement("h3");
	shipsLeft1.textContent = "Ships left (#): ";
	const shipsLeftSpan1 = document.createElement("span");
	shipsLeftSpan1.id = `shipsLeft-${index1}`;
	shipsLeftSpan1.textContent = state.game.getShips(index1).length;
	shipsLeft1.appendChild(shipsLeftSpan1);

	const moveCounter1 = document.createElement("h3");
	moveCounter1.textContent = "Moves (#): ";
	const moveCounterSpan1 = document.createElement("span");
	moveCounterSpan1.id = `moveCounter-${index1}`;
	moveCounterSpan1.textContent = "0";
	moveCounter1.appendChild(moveCounterSpan1);

	const playerInfoContainer1 = document.createElement("div");
	playerInfoContainer1.append(header1, subHeader1, shipsLeft1, moveCounter1);

	const grid1 = grid("playMatch", index1);

	grid1Container.append(playerInfoContainer1, grid1);

	const grid2Container = document.createElement("div");
	grid2Container.id = `gridContainer-${index2}`;

	const header2 = document.createElement("h2");
	header2.textContent = p2.name;

	const subHeader2 = document.createElement("h3");
	subHeader2.textContent = p2.type;

	const shipsLeft2 = document.createElement("h3");
	shipsLeft2.textContent = "Ships left (#): ";
	const shipsLeftSpan2 = document.createElement("span");
	shipsLeftSpan2.id = `shipsLeft-${index2}`;
	shipsLeftSpan2.textContent = state.game.getShips(index2).length;
	shipsLeft2.appendChild(shipsLeftSpan2);

	const moveCounter2 = document.createElement("h3");
	moveCounter2.textContent = "Moves (#): ";
	const moveCounterSpan2 = document.createElement("span");
	moveCounterSpan2.id = `moveCounter-${index2}`;
	moveCounterSpan2.textContent = "0";
	moveCounter2.appendChild(moveCounterSpan2);

	const playerInfoContainer2 = document.createElement("div");
	playerInfoContainer2.append(header2, subHeader2, shipsLeft2, moveCounter2);

	const grid2 = grid("playMatch", index2);

	grid2Container.append(playerInfoContainer2, grid2);

	gridsContainer.append(grid1Container, grid2Container);

	const restartButton = document.createElement("button");
	restartButton.textContent = "Restart";
	restartButton.addEventListener("click", () => {
		state.game.restart();
		goToPage("gameMode");
	});

	main.append(h3, gridsContainer);

	container.append(h2, main, restartButton);
	return container;
}
