import { state } from "../../core/index.js";
import { goToPage } from "../index.js";

export default function createPlayerSection() {
	const section = document.createElement("section");
	section.className = "createPlayerSection";
	const h1 = "Create a player";

	const form = document.createElement("form");
	form.addEventListener("submit", ev => {
		ev.preventDefault();
		const formData = new FormData(ev.target);
		const type = formData.get("typeInput");
		const name = formData.get("nameInput");

		state.game.addPlayer(name, type);
		goToPage("initialPage");
	});

	const typeContainer = document.createElement("div");
	const typeLabel = document.createElement("label");
	typeLabel.htmlFor = "typeInput";
	typeLabel.textContent = "Player type:";

	const typeInput = document.createElement("select");
	typeInput.id = "typeInput";
	typeInput.name = "typeInput";

	const realOpt = document.createElement("option");
	realOpt.value = "real";
	realOpt.textContent = "Real";

	const computerOpt = document.createElement("option");
	computerOpt.value = "computer";
	computerOpt.textContent = "Computer";

	typeInput.append(realOpt, computerOpt);
	typeContainer.append(typeLabel, typeInput);

	const nameContainer = document.createElement("div");
	const nameLabel = document.createElement("label");
	nameLabel.htmlFor = "nameInput";
	nameLabel.textContent = "Player name:";

	const nameInput = document.createElement("input");
	nameInput.id = "nameInput";
	nameInput.type = "text";
	nameInput.name = "nameInput";

	nameContainer.append(nameLabel, nameInput);

	const confirmBtn = document.createElement("button");
	confirmBtn.textContent = "Create";
	confirmBtn.className = "playerConfirmBtn";

	form.append(typeContainer, nameContainer, confirmBtn);

	section.append(h1, form);

	return section;
}
