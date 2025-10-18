import { playerTypeLeftButton, playerTypeRightButton } from "./index.js";

export default function playerTypeSelector() {
	const container = document.createElement("div");
	container.className = "relative h-full flex flex-1";

	const list = document.createElement("div");
	list.className =
		"typeList flex w-[140px] gap-[2em] px-[2.2em] py-[0.1em] overflow-hidden border-2 border-white rounded-lg h-full font-mono bg-blue-500 text-white";

	const playerTypes = ["Human", "Computer"];

	playerTypes.forEach((type, index) => {
		const typeDiv = document.createElement("div");
		const p = document.createElement("p");
		p.textContent = type;
		p.className = "text-2xl";

		if (index === 0) {
			p.setAttribute("data-current", true);
		}
		typeDiv.appendChild(p);
		list.appendChild(typeDiv);
	});

	const leftBtn = playerTypeLeftButton;
	const rightBtn = playerTypeRightButton;

	container.append(leftBtn, list, rightBtn);
	return container;
}
