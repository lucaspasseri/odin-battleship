import { basicButton } from "./index.js";

export default function playerTypeSelector() {
	const container = document.createElement("div");

	const listWrapper = document.createElement("div");
	listWrapper.className = "relative";

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

	function goLeft() {
		const ps = [...document.querySelectorAll(".typeList p")];
		const currIndex = ps.findIndex(p => p.dataset.current === "true");
		const nextIndex =
			currIndex === 0 ? ps.length - 1 : currIndex - (1 % ps.length);

		console.log({ ps });
		console.log({ currIndex, nextIndex });

		ps[currIndex].setAttribute("data-current", false);
		ps[nextIndex].setAttribute("data-current", true);

		ps[nextIndex].scrollIntoView({
			inline: "center",
			behavior: "smooth",
		});
	}

	function goRight() {
		const ps = [...document.querySelectorAll(".typeList p")];
		const currIndex = ps.findIndex(p => p.dataset.current === "true");
		const nextIndex = (currIndex + 1) % ps.length;

		console.log({ ps });
		console.log({ currIndex, nextIndex });

		ps[currIndex].setAttribute("data-current", false);
		ps[nextIndex].setAttribute("data-current", true);

		ps[nextIndex].scrollIntoView({
			inline: "center",
			behavior: "smooth",
		});
	}

	const leftBtn = basicButton(
		"◀",
		goLeft,
		"p-2 border border-black absolute left-[-44px] top-[-5px] text-xl bg-white"
	);
	const rightBtn = basicButton(
		"▶",
		goRight,
		"p-2 border border-black absolute right-[-44px] top-[-5px] text-xl bg-white"
	);
	listWrapper.append(leftBtn, list, rightBtn);
	container.appendChild(listWrapper);
	return container;
}
