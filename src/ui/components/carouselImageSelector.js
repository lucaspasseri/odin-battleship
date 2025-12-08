import { normalize } from "../../util/normalize.js";
import { range } from "../../util/range.js";

export default function carouselImageSelector(playerIndex) {
	const container = document.createElement("div");

	const carousel = document.createElement("div");
	carousel.className = "carousel";

	const strip = document.createElement("div");
	strip.className = "strip";
	strip.style.transform = "translate(-180px)";

	range(10).forEach(index => {
		const frame = document.createElement("div");
		frame.className = "frame";
		frame.ariaLabel = `Avatar ${index}`;
		if (index === 1) {
			frame.dataset.activeFrameIndex = 1;
		}

		strip.appendChild(frame);
	});

	carousel.appendChild(strip);

	container.appendChild(carousel);

	const directionalButtonContainer = document.createElement("div");
	directionalButtonContainer.className = "relative";

	let frameIndex = 1;
	const leftButton = document.createElement("button");
	leftButton.textContent = "LEFT";
	leftButton.className = "border absolute top-[-8em] left-[-24%]";
	leftButton.type = "button";

	function changeActiveFrameIndex(frameIndex) {
		const frames = [
			...document.querySelectorAll(`#playerProfileForm-${playerIndex} .frame`),
		];

		frames.forEach((frame, index) => {
			if (frameIndex === index) {
				frame.dataset.activeFrameIndex = frameIndex;
			} else {
				delete frame.dataset.activeFrameIndex;
			}
		});
	}

	let isTimeoutActive = false;

	leftButton.addEventListener("click", () => {
		if (isTimeoutActive) return;
		const strip = document.querySelector(
			`#playerProfileForm-${playerIndex} .strip`
		);

		frameIndex -= 1;
		if (frameIndex === -1) {
			frameIndex = 9;
		}

		changeActiveFrameIndex(frameIndex);
		const position = normalize(frameIndex, 0, 9, 0, -1620);

		strip.style.transform = `translate(${position}px)`;
		strip.style.transition = "240ms";

		if (frameIndex === 0) {
			isTimeoutActive = true;
			setTimeout(() => {
				requestAnimationFrame(() => {
					strip.style.transition = "0s";
					strip.style.transform = `translate(-1440px)`;
				});
				frameIndex = 8;
				changeActiveFrameIndex(8);
				isTimeoutActive = false;
			}, 260);
		}
	});

	const rightButton = document.createElement("button");
	rightButton.textContent = "RIGHT";
	rightButton.className = "border absolute top-[-8em] right-[-30%]";
	rightButton.type = "button";

	rightButton.addEventListener("click", () => {
		if (isTimeoutActive) return;
		const strip = document.querySelector(
			`#playerProfileForm-${playerIndex} .strip`
		);

		frameIndex += 1;
		if (frameIndex === 10) {
			frameIndex = 0;
		}
		changeActiveFrameIndex(frameIndex);
		const position = normalize(frameIndex, 0, 9, 0, -1620);

		strip.style.transform = `translate(${position}px)`;
		strip.style.transition = "240ms";

		if (frameIndex === 9) {
			isTimeoutActive = true;
			setTimeout(() => {
				requestAnimationFrame(() => {
					strip.style.transition = "0s";
					strip.style.transform = `translate(-180px)`;
				});
				frameIndex = 1;
				changeActiveFrameIndex(1);
				isTimeoutActive = false;
			}, 260);
		}
	});

	directionalButtonContainer.append(leftButton, rightButton);

	container.appendChild(directionalButtonContainer);

	return container;
}
