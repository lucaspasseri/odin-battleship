import { state } from "../../core/index.js";

import { paths } from "../constants/paths.js";
import {
	createNewPlayer,
	playerList,
	createMatch,
	createDropTargetGrid,
	nextPlayerButton,
	createGrid,
	restartButton,
} from "./index.js";

function updateCreateNewPlayer() {
	const wrapper = document.querySelector("#createPlayerWrapper");
	const oldNode = document.querySelector("#createNewPlayer");
	const newNode = createNewPlayer();
	wrapper.replaceChild(newNode, oldNode);
}

function updatePlayerList() {
	const wrapper = document.querySelector("#createPlayerWrapper");
	const oldList = document.querySelector("#playerList");
	const newList = playerList();
	wrapper.replaceChild(newList, oldList);
}

function updateMatchSection() {
	const page = document.querySelector("#createPlayerPage");
	const oldSection = document.querySelector("#matchContainer");
	const newSection = createMatch();
	page.replaceChild(newSection, oldSection);
}

function updateDeployShipGrid() {
	const main = document.querySelector("#deployShipMain");
	const oldGrid = document.querySelector("#dropTargetGrid");
	const newGrid = createDropTargetGrid();
	main.replaceChild(newGrid, oldGrid);
}

function updateNextPlayerButton() {
	const div = document.querySelector("#nextPlayerButtonContainer");
	const oldButton = document.querySelector("#nextPlayerButton");
	const newButton = nextPlayerButton();
	div.replaceChild(newButton, oldButton);
}

function updateMatchGrid(player) {
	let currPlayer;
	let currIndex;

	if (player === state.game.firstPlayer) {
		currPlayer = "p1";
		currIndex = state.game.firstPlayerIndex;
	}
	if (player === state.game.secondPlayer) {
		currPlayer = "p2";
		currIndex = state.game.secondPlayerIndex;
	}

	if (currPlayer === undefined || currIndex === undefined) return;

	const playerContainer = document.querySelector(`#${currPlayer}Container`);
	const oldGrid = document.querySelector(`#gridContainer-${player.id}`);
	const newGrid = createGrid(player, currIndex);

	playerContainer.replaceChild(newGrid, oldGrid);
}

function updateRestartButton() {
	const div = document.querySelector("#restartButtonWrapper");
	const oldButton = document.querySelector("#restartButtonContainer");
	const newButton = restartButton();
	div.replaceChild(newButton, oldButton);
}

export {
	paths,
	updateCreateNewPlayer,
	updatePlayerList,
	updateMatchSection,
	updateDeployShipGrid,
	updateNextPlayerButton,
	updateMatchGrid,
	updateRestartButton,
};
