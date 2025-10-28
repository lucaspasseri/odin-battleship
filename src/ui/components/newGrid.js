import { state } from "../../core/index.js";
import { updateMatchGrid, updateRestartButton } from "./constants.js";

export default function newGrid(player, playerIndex) {
	const ROWS = 10;
	const COLS = 10;

	const gridContainer = document.createElement("div");
	gridContainer.className = "flex flex-col gap-[0.6em]";
	gridContainer.id = `gridContainer-${player.id}`;

	const h4 = document.createElement("h4");
	h4.textContent = `Ships left: ${player.gameboard.numberOfShips}`;
	h4.className = "font-mono text-lg text-blue-600 font-bold";

	const grid = document.createElement("div");
	grid.className =
		"grid grid-cols-[repeat(10,minmax(40px,40px))] gap-[0.4em] p-[0.8em] border-[0.4em] rounded border-white max-w-[494.2px]";

	for (let i = 0; i < ROWS * COLS; i++) {
		const cell = document.createElement("button");
		cell.className =
			"min-w-10 min-h-10 rounded hover:cursor-pointer shrink-0 relative";

		const x = i % COLS;
		const y = Math.abs(Math.floor(i / COLS) - 9);

		const bottomCellState = state.game.checkShipCellByPlayerIndex(
			x,
			y,
			playerIndex
		);

		const bottomLayer = document.createElement("div");
		bottomLayer.className = `absolute inset-0 ${bottomCellState}`;

		const topLayer = document.createElement("button");
		const place = `${x},${y}`;
		const playedCells = state.game.playedCellsByPlayerIndex(playerIndex);

		topLayer.className = `absolute inset-0 initial ${
			playedCells.has(place)
				? "opacity-0"
				: state.game.isGameOver
				? "opacity-25"
				: "opacity-100"
		}`;

		topLayer.addEventListener("click", () => {
			console.log(1);

			if (player === state.game.currPlayer) {
				console.log("player cant play on its own board");
			}

			if (state.game.isGameOver) {
				console.log("The game is over");
			}

			if (state.game.currPlayer.type === "computer") {
				console.log("computer player dont play");
			}

			if (
				player === state.game.currPlayer ||
				state.game.isGameOver ||
				state.game.currPlayer.type === "computer"
			) {
				return;
			}

			const attack = state.game.hitCellByPlayerIndex(x, y, playerIndex);

			if (attack) {
				if (state.game.isGameOver) {
					alert("Game is over!");
					updateMatchGrid(state.game.firstPlayer);
					updateMatchGrid(state.game.secondPlayer);
					updateRestartButton();
					return;
				}
				updateMatchGrid(player);
				state.game.changePlayer();
				if (state.game.currPlayer.type === "computer") {
					const computerAttack = state.game.computerPlays();

					if (state.game.isGameOver) {
						alert("Game is over!");
						updateMatchGrid(state.game.firstPlayer);
						updateMatchGrid(state.game.secondPlayer);
						updateRestartButton();
						return;
					}

					if (computerAttack) {
						updateMatchGrid(state.game.opponentPlayer);
						state.game.changePlayer();
					}
				}
			}
		});

		cell.append(bottomLayer, topLayer);
		grid.appendChild(cell);
	}

	gridContainer.append(h4, grid);

	return gridContainer;
}
