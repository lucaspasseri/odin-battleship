import startMultiPlayerGame from "../core/orchestration/startMultiPlayerGame.js";
import {
	carouselImageSelector,
	playerProfileForm,
} from "../ui/components/index.js";
import goToPage from "../ui/goToPage.js";

export default function multiplayerPage() {
	const container = document.createElement("div");
	container.className = "px-[1em] md:px-[4em] py-[1em] flex gap-[2em] flex-col";

	const h2 = "Add players";

	const trueForm = document.createElement("form");
	trueForm.className = "flex border flex-wrap";
	trueForm.id = "playersForm";

	const p1Container = document.createElement("div");
	p1Container.className = "flex-1 flex justify-center";
	const p1H3 = document.createElement("h3");
	p1H3.textContent = "P1";

	const p1 = playerProfileForm("1");

	p1Container.append(p1H3, p1);

	const p2Container = document.createElement("div");
	p2Container.className = "flex-1";
	const p2H3 = document.createElement("h3");
	p2H3.textContent = "P2";

	const p2 = playerProfileForm("2");

	p2Container.append(p2H3, p2);
	p2Container.className = "flex-1 flex justify-center";

	trueForm.append(p1Container, p2Container);

	const buttonContainer = document.createElement("div");
	buttonContainer.className = "flex justify-center";

	const button = document.createElement("button");
	button.className =
		"flex-1 rounded border-[var(--color)] border-2 bg-gray-700";
	button.textContent = "next";
	button.type = "submit";
	button.setAttribute("form", "playersForm");

	trueForm.addEventListener("submit", e => {
		e.preventDefault();
		// goToPage("deployShips");
		console.log(2);

		const formData = new FormData(e.target);

		const p1ActiveFrame = document.querySelector(
			"#playerProfileForm-1 .frame[data-active-frame-index]"
		);

		const p1FrameIndex = p1ActiveFrame.dataset.activeFrameIndex;

		const p2ActiveFrame = document.querySelector(
			"#playerProfileForm-2 .frame[data-active-frame-index]"
		);

		const p2FrameIndex = p2ActiveFrame.dataset.activeFrameIndex;

		const p1TypeSelector = document.querySelector("#typeCheckbox-1");
		const p1Type = p1TypeSelector.checked ? "computer" : "real";

		const p2TypeSelector = document.querySelector("#typeCheckbox-2");
		const p2Type = p2TypeSelector.checked ? "computer" : "real";

		const obj = {
			p1Name: formData.get("p1Name"),
			p1Type,
			p1FrameIndex,
			p2Name: formData.get("p2Name"),
			p2Type,
			p2FrameIndex,
		};

		const hasStarted = startMultiPlayerGame(obj);
		if (hasStarted) {
			goToPage("deployShips");
		}
	});

	buttonContainer.appendChild(button);

	container.append(h2, trueForm, buttonContainer);
	return container;
}
