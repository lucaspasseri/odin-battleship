import { state } from "../../core/index.js";

export default function verifyGameOver() {
	if (state.game.isGameOver) {
		const gameStatus = document.querySelector("#gameStatus");
		gameStatus.textContent = "Game is over!";

		const untouchedCells = [
			...document.querySelectorAll(".topLayer:not(.fadeOutRevealed)"),
		];

		untouchedCells.forEach(cell => {
			cell.classList.add("gameOverRevealed");
		});

		return true;
	}

	return false;
}
