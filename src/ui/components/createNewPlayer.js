import {
	playerImageSelector,
	playerTypeSelector,
	playerForm,
	imageSelector,
} from "./index.js";
import { normalize } from "../../util/normalize.js";
import leftTriangleSvg from "./leftTriangleSvg.js";

export default function createNewPlayer() {
	const container = document.createElement("div");
	container.id = "createNewPlayer";
	container.className =
		"px-[1em] py-[1em] relative border-[0.3em] border-black bg-blue-600 rounded-2xl h-[361px] flex-0";

	const imageSelect = imageSelector();

	const typeContainer = document.createElement("div");
	typeContainer.className = "flex border justify-center p-[0.4em] rounded-xl";

	const ul = document.createElement("ul");
	ul.className = "flex gap-[0.4em] border";

	const humanLi = document.createElement("li");

	const humanButton = document.createElement("button");
	humanButton.className = "bg-white rounded-xl p-[0.4em]";
	humanButton.textContent = "Human";
	humanButton.addEventListener("click", () => {
		console.log(1);
		humanButton.classList.add("playerTypeSelected");
		computerButton.classList.remove("playerTypeSelected");
	});

	humanLi.appendChild(humanButton);

	const computerLi = document.createElement("li");

	const computerButton = document.createElement("button");

	computerButton.className = "bg-white rounded-xl p-[0.4em]";
	computerButton.textContent = "Computer";
	computerButton.addEventListener("click", () => {
		console.log(2);
		computerButton.classList.add("playerTypeSelected");
		humanButton.classList.remove("playerTypeSelected");
	});

	computerLi.appendChild(computerButton);

	ul.append(humanLi, computerLi);

	typeContainer.appendChild(ul);

	container.append(imageSelect, typeContainer);
	return container;
}
// const imageSelector = playerImageSelector();
// const typeSelector = playerTypeSelector();
// const form = playerForm();

// selectionContainer.append(imageSelector, form, typeSelector);

// const label = document.createElement("label");
// 	label.textContent = "Player type:";
// 	label.htmlFor = "sliderInput";

// 	const slider = document.createElement("input");
// 	slider.id = "sliderInput";
// 	slider.type = "range";
// 	slider.min = "-10";
// 	slider.max = "10";
// 	slider.step = "10";
// 	slider.setAttribute("list", "typeList");

// 	const typeList = document.createElement("datalist");
// 	typeList.id = "typeList";

// 	const humanOption = document.createElement("option");
// 	humanOption.value = -10;

// 	const notSelectedOption = document.createElement("option");
// 	notSelectedOption.value = 0;

// 	const computerOption = document.createElement("option");
// 	computerOption.value = 10;

// 	typeList.append(humanOption, notSelectedOption, computerOption);
