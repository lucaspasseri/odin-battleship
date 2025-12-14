import goToPage from "../ui/goToPage.js";
import { state } from "../core/index.js";
import { grid, playerProfile, versusTextSvg } from "../ui/components/index.js";
import { computerAttackCell } from "../ui/constants/playMatch.js";

function updateGameStatus(el = document.querySelector("#gameStatus")) {
	if (!el || state.game.isGameOver) return;
	el.textContent = `It's ${state.game.currPlayer.name}'s turn`;
}

function createPlayerInfo(index) {
	const infoContainer = document.createElement("div");
	infoContainer.className = "p-[1em] gap-[0.3em]";

	const shipsLeft = document.createElement("h3");
	shipsLeft.textContent = "Ships left (#): ";
	const shipsLeftSpan = document.createElement("span");
	shipsLeftSpan.id = `shipsLeft-${index}`;
	shipsLeftSpan.textContent = state.game.getShips(index).length;
	shipsLeft.appendChild(shipsLeftSpan);

	const moveCounter = document.createElement("h3");
	moveCounter.textContent = "Moves (#): ";
	const moveCounterSpan = document.createElement("span");
	moveCounterSpan.id = `moveCounter-${index}`;
	moveCounterSpan.textContent = "0";
	moveCounter.appendChild(moveCounterSpan);

	infoContainer.append(shipsLeft, moveCounter);
	return infoContainer;
}

function createPlayerGrid({ index, reverse = false }) {
	const container = document.createElement("div");
	container.id = `gridContainer-${index}`;
	container.className = `flex flex-col ${
		reverse ? "items-end flex-col-reverse" : "items-start"
	}`;

	const profile = playerProfile(index);
	const info = createPlayerInfo(index);
	const gridEl = grid("playMatch", index);

	container.append(profile, info, gridEl);
	return container;
}

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
			updateGameStatus();
		});
	}

	[
		"./src/assets/dropOnWater.wav",
		"./src/assets/explosion.mp3",
		"./src/assets/bigExplosion.wav",
	].forEach(src =>
		state.pageSounds.push(new Howl({ src: [src], volume: 0.25 }))
	);

	const container = document.createElement("div");
	container.className =
		"px-[1em] md:px-[4em] py-[1em] flex gap-[2em] flex-col mt-[1em]";

	const title = document.createElement("h2");
	title.className = "text-3xl";
	title.textContent = "It's time to fight!";

	const main = document.createElement("main");

	const status = document.createElement("h3");
	status.className = "text-xl mb-[1em]";
	status.id = "gameStatus";
	updateGameStatus(status);

	const gridsContainer = document.createElement("div");
	gridsContainer.className =
		"flex justify-evenly gap-[4em] p-[0.1em] flex-wrap relative ";

	const index1 = state.game.firstPlayerIndex;
	const index2 = state.game.secondPlayerIndex;

	const playerGrid1 = createPlayerGrid({ index: index1 });
	const playerGrid2 = createPlayerGrid({ index: index2, reverse: true });

	const versusContainer = document.createElement("div");
	versusContainer.className =
		"absolute inset-0 flex justify-center items-center z-[-1]";
	versusContainer.appendChild(versusTextSvg());

	gridsContainer.append(playerGrid1, versusContainer, playerGrid2);

	const restartButton = document.createElement("button");
	restartButton.className =
		"w-fit rounded border-[var(--color)] border-2 text-2xl px-[0.6em] py-[0.3em] bg-green-700";
	restartButton.textContent = "Restart";
	restartButton.addEventListener("click", () => {
		state.game.restart();
		goToPage("gameMode");
	});

	const buttonContainer = document.createElement("div");
	buttonContainer.className = "flex justify-center my-[2em]";
	buttonContainer.appendChild(restartButton);

	main.append(status, gridsContainer);
	container.append(title, main, buttonContainer);

	return container;
}
