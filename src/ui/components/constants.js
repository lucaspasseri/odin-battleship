import { paths } from "../constants/paths.js";
import {
	createNewPlayer,
	playerList,
	createMatch,
	createDropTargetGrid,
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

export {
	paths,
	updateCreateNewPlayer,
	updatePlayerList,
	updateMatchSection,
	updateDeployShipGrid,
};
