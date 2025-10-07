import state from "./state.js";
import createGameboardUI from "./createGameboardUI.js";

export default function render() {
	const body = document.querySelector("body");

	body.innerHTML = "";
	state.boards?.forEach(board => {
		body.appendChild(createGameboardUI(board));
	});
}
