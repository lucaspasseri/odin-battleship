import { state } from "../core/index.js";
import { createGrid } from "../ui/components/index.js";

export default function mainPage() {
	const page = document.createElement("div");

	const h1 = document.createElement("h1");
	h1.textContent = `Current player: ${state.game.firstPlayer.name}`;

	const h2GameStatus = document.createElement("h2");
	h2GameStatus.textContent = `Game status:${
		state.game.isGameOver ? "Game over!" : "Game in progress..."
	}  `;

	page.append(h1, h2GameStatus);

	const firstPlayerBoard = createGrid(
		state.game.firstPlayer,
		state.game.firstPlayerIndex
	);
	const secondPlayerBoard = createGrid(
		state.game.secondPlayer,
		state.game.secondPlayerIndex
	);

	page.append(firstPlayerBoard, secondPlayerBoard);

	return page;
}
