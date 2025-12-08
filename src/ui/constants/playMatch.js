import { state } from "../../core/index.js";
import computerHitCell from "../../core/orchestration/computerHitCell.js";

export function verifyGameOver() {
	if (state.game.isGameOver) {
		const gameStatus = document.querySelector("#gameStatus");
		gameStatus.textContent = "Game is over!";

		const untouchedCells = [
			...document.querySelectorAll(".topLayer:not(.fadeOutRevealed)"),
		];

		untouchedCells.forEach(cell => {
			cell.classList.add("gameOverRevealed");
		});

		const topLayerCells = [...document.querySelectorAll(".topLayer")];
		topLayerCells.forEach(cell => {
			cell.classList.remove("topLayer");
		});

		return true;
	}

	return false;
}

export async function attackGridCell(x, y, gameboardIndex) {
	const currPlayerIndex = state.game.currPlayerIndex;
	const container = document.querySelector(`#playMatchGrid-${gameboardIndex}`);
	const otherGrid = document.querySelector(`#playMatchGrid-${currPlayerIndex}`);

	if (gameboardIndex === currPlayerIndex || verifyGameOver()) return;

	const prevNumberOfShips =
		state.game.players[gameboardIndex].gameboard.numberOfShips;

	const hitAnInitialStateCell = state.game.hitCellByPlayerIndex(
		x,
		y,
		gameboardIndex
	);

	const postNumberOfShips =
		state.game.players[gameboardIndex].gameboard.numberOfShips;

	if (!hitAnInitialStateCell) return;

	const cellState = state.game.checkShipCellByPlayerIndex(x, y, gameboardIndex);

	if (cellState === "water") {
		state.pageSounds[0].play();
	} else if (prevNumberOfShips !== postNumberOfShips) {
		state.pageSounds[2].play();
	} else {
		state.pageSounds[1].play();
	}

	const topLayer = document.querySelector(
		`#playMatchGrid-${gameboardIndex} > #gridCell_${x}-${y} > .topLayer`
	);

	const bottomLayer = document.querySelector(
		`#playMatchGrid-${gameboardIndex} > #gridCell_${x}-${y} > .bottomLayer`
	);

	topLayer.classList.add("fadeOutRevealed");

	setTimeout(() => {
		bottomLayer.classList.add("z-[99]", "resizeRevealed");
	}, 400);
	setTimeout(() => {
		bottomLayer.classList.remove("z-[99]");
		topLayer.classList.add("z-[0]");
	}, 800);

	const moveCounter = document.querySelector(`#moveCounter-${gameboardIndex}`);

	moveCounter.textContent =
		state.game.playedCellsByPlayerIndex(gameboardIndex).size;

	const shipsLeft = document.querySelector(`#shipsLeft-${gameboardIndex}`);

	shipsLeft.textContent = state.game.opponentPlayer.gameboard.numberOfShips;

	const isGameOver = verifyGameOver();
	if (isGameOver) return;

	container.classList.remove("playableGrid");
	otherGrid.classList.add("playableGrid");

	if (state.game.opponentPlayer.type === "computer") {
		state.game.changePlayer();

		await computerAttackCell();

		state.game.changePlayer();
	} else {
		state.game.changePlayer();
	}
}

export async function computerAttackCell() {
	if (state.game.currPlayer.type !== "computer") return;

	const positionHit = await computerHitCell();

	if (positionHit === false) {
		throw new Error("Error on computerPlays");
	}
	const [otherX, otherY] = positionHit.split(",");

	const currPlayerIndex = state.game.currPlayerIndex;
	const opponentPlayerIndex = state.game.getPlayerIndex(
		state.game.opponentPlayer
	);

	const grid = document.querySelector(`#playMatchGrid-${currPlayerIndex}`);
	const otherGrid = document.querySelector(
		`#playMatchGrid-${opponentPlayerIndex}`
	);

	const otherGridTopLayer = document.querySelector(
		`#playMatchGrid-${opponentPlayerIndex} > #gridCell_${otherX}-${otherY} > .topLayer`
	);

	otherGridTopLayer.classList.add("fadeOutRevealed");

	const otherGridBottomLayer = document.querySelector(
		`#playMatchGrid-${opponentPlayerIndex} > #gridCell_${otherX}-${otherY} > .bottomLayer`
	);

	setTimeout(() => {
		otherGridBottomLayer.classList.add("resizeRevealed");
	}, 400);

	setTimeout(() => {
		otherGridBottomLayer.classList.add("z-[99]", "resizeRevealed");
	}, 400);
	setTimeout(() => {
		otherGridBottomLayer.classList.remove("z-[99]");
		otherGridTopLayer.classList.add("z-[0]");
	}, 800);

	const moveCounterComputer = document.querySelector(
		`#moveCounter-${opponentPlayerIndex}`
	);

	moveCounterComputer.textContent =
		state.game.playedCellsByPlayerIndex(opponentPlayerIndex).size;

	const shipsLeftComputer = document.querySelector(
		`#shipsLeft-${opponentPlayerIndex}`
	);

	shipsLeftComputer.textContent =
		state.game.opponentPlayer.gameboard.numberOfShips;

	if (verifyGameOver()) return;

	otherGrid.classList.remove("playableGrid");
	grid.classList.add("playableGrid");
}
