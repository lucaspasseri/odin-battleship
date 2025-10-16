import { state } from "../../core/index.js";
import { goToPage } from "../index.js";

export default function playerForm() {
	const form = document.createElement("form");
	form.className = "flex flex-col gap-[1em] items-center";

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

		console.log({ currImgIndex });

		state.game.addPlayer(name, playerType, currImgIndex);
		goToPage("initialPage");
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

	const nameInput = document.createElement("input");
	nameInput.className = "text-2xl h-8 rounded pl-4 w-40";
	nameInput.id = "nameInput";
	nameInput.type = "text";
	nameInput.name = "nameInput";

	nameContainer.append(nameLabel, nameInput);

	const confirmBtn = document.createElement("button");
	confirmBtn.textContent = "Create";
	confirmBtn.className =
		"rounded-2xl w-fit text-2xl px-[0.6em] py-[0.2em] font-mono bg-green-400";

	form.append(typeInput, nameContainer, confirmBtn);

	return form;
}
