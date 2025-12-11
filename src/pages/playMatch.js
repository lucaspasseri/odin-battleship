import goToPage from "../ui/goToPage.js";
import { state } from "../core/index.js";
import {
	grid,
	leftTriangleSvg,
	playerProfile,
	versusTextSvg,
} from "../ui/components/index.js";
import { computerAttackCell } from "../ui/constants/playMatch.js";
export default function playMatch() {
	if (
		state.game.getPlayerIndex(state.game.currPlayer) >
		state.game.getPlayerIndex(state.game.opponentPlayer)
	) {
		state.game.changePlayer();
	}

	if (state.game.currPlayer.type === "computer") {
		computerAttackCell().then(() => {
			state.game.changePlayer();
			const gameStatus = document.querySelector("#gameStatus");
			gameStatus.textContent = `It's ${state.game.currPlayer.name}'s turn`;
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
	container.className =
		"px-[1em] md:px-[4em] py-[1em] flex gap-[2em] flex-col mt-[1em]";

	const h2 = document.createElement("h2");
	h2.className = "text-3xl";
	h2.textContent = "It's time to fight!";

	const main = document.createElement("main");

	const h3 = document.createElement("h3");
	h3.className = "text-xl";
	h3.id = "gameStatus";
	h3.textContent = `It's ${state.game.currPlayer.name}'s turn`;

	const gridsContainer = document.createElement("div");
	gridsContainer.className =
		"flex justify-evenly gap-[4em] p-[0.1em] flex-wrap relative ";
	const index1 = state.game.firstPlayerIndex;
	const index2 = state.game.secondPlayerIndex;

	const grid1Container = document.createElement("div");
	grid1Container.id = `gridContainer-${index1}`;
	grid1Container.className = "flex flex-col items-start";

	const infoContainer1 = document.createElement("div");
	// infoContainer1.className = "border-[1em] border-red-700";

	const playerProfile1 = playerProfile(index1);

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

	infoContainer1.append(shipsLeft1, moveCounter1);

	const grid1 = grid("playMatch", index1);

	grid1Container.append(playerProfile1, infoContainer1, grid1);

	const grid2Container = document.createElement("div");
	grid2Container.id = `gridContainer-${index2}`;
	grid2Container.className = "flex flex-col-reverse items-end ";

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

	const infoContainer2 = document.createElement("div");

	infoContainer2.append(shipsLeft2, moveCounter2);

	const grid2 = grid("playMatch", index2);

	const playerProfile2 = playerProfile(index2);

	grid2Container.append(playerProfile2, infoContainer2, grid2);

	const versusContainer = document.createElement("div");
	versusContainer.className =
		"absolute inset-0 flex justify-center items-center z-[-1]";

	const text = versusTextSvg();

	versusContainer.appendChild(text);

	gridsContainer.append(grid1Container, versusContainer, grid2Container);

	const buttonContainer = document.createElement("div");
	buttonContainer.className = "flex justify-center my-[2em]";

	const restartButton = document.createElement("button");
	restartButton.className =
		"w-fit rounded border-[var(--color)] border-2 text-2xl px-[0.6em] py-[0.3em] bg-green-700";
	restartButton.textContent = "Restart";
	restartButton.addEventListener("click", () => {
		state.game.restart();
		goToPage("gameMode");
	});

	buttonContainer.appendChild(restartButton);

	main.append(h3, gridsContainer);

	container.append(h2, main, buttonContainer);

	return container;
}
