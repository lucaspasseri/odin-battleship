import { state } from "../../core/index.js";
import {
	updateCreateNewPlayer,
	updateMatchSection,
	updatePlayerList,
} from "./constants.js";

export default function playerForm() {
	const form = document.createElement("form");
	form.className = "flex flex-col gap-[1em] items-center mt-[-1em]";

	form.addEventListener("submit", ev => {
		ev.preventDefault();
		const formData = new FormData(ev.target);
		const type = formData.get("typeInput");
		const name = formData.get("nameInput");

		const imgs = [...document.querySelectorAll(".gallery img")];
		const currImgIndex = imgs.findIndex(img => img.dataset.current === "true");

		const ps = [...document.querySelectorAll(".typeList p")];
		const currIndex = ps.findIndex(p => p.dataset.current === "true");
		const types = ["real", "computer"];

		const playerType = type === "" ? types[currIndex] : type;

		state.game.addPlayer(name, playerType, currImgIndex);
		updatePlayerList();
		updateCreateNewPlayer();
		updateMatchSection();
	});

	const typeInput = document.createElement("select");
	typeInput.id = "typeInput";
	typeInput.name = "typeInput";
	typeInput.hidden = true;

	const defaultOpt = document.createElement("option");
	defaultOpt.value = "";
	defaultOpt.textContent = "(default)";

	const realOpt = document.createElement("option");
	realOpt.value = "real";
	realOpt.textContent = "Real";

	const computerOpt = document.createElement("option");
	computerOpt.value = "computer";
	computerOpt.textContent = "Computer";

	typeInput.append(defaultOpt, realOpt, computerOpt);

	const nameContainer = document.createElement("div");
	nameContainer.className = "flex flex-col gap-[0.1em]";

	const nameLabel = document.createElement("label");
	nameLabel.htmlFor = "nameInput";
	nameLabel.textContent = "Player name:";
	nameLabel.className = "text-white";

	const nameInput = document.createElement("input");
	nameInput.className = "text-2xl h-8 rounded text-center w-40";
	nameInput.id = "nameInput";
	nameInput.type = "text";
	nameInput.name = "nameInput";
	nameInput.placeholder = `Player ${state.game.players.length + 1}`;

	nameContainer.append(nameLabel, nameInput);

	const confirmBtn = document.createElement("button");
	confirmBtn.textContent = "Create";
	confirmBtn.className =
		"rounded-2xl w-full text-2xl px-[0.6em] py-[0.2em] font-mono bg-green-400 absolute bottom-[-70px]";

	form.append(typeInput, nameContainer, confirmBtn);

	return form;
}
