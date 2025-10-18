import { playerList } from "./index.js";

const paths = [
	"./imgs/humanBust.png",
	"./imgs/robotBust.png",
	"./imgs/officer.png",
	"./imgs/officerRobot.png",
	"./imgs/human.png",
];

function updatePlayerList() {
	const wrapper = document.querySelector("#createPlayerWrapper");
	const oldList = document.querySelector("#playerList");
	const newList = playerList();
	wrapper.replaceChild(newList, oldList);
}

export { paths, updatePlayerList };
