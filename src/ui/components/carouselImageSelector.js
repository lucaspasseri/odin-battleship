import { normalize } from "../../util/normalize.js";
import { range } from "../../util/range.js";

export default function carouselImageSelector() {
	const container = document.createElement("div");

	const carousel = document.createElement("div");
	carousel.className = "carousel";

	const strip = document.createElement("div");
	strip.className = "strip";
	strip.style.transform = "translate(-180px)";

	range(10).forEach(() => {
		const frame = document.createElement("div");
		frame.className = "frame";

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

	leftButton.addEventListener("click", () => {
		const strip = document.querySelector(".strip");

		frameIndex -= 1;
		if (frameIndex === -1) {
			frameIndex = 9;
		}

		const position = normalize(frameIndex, 0, 9, 0, -1620);

		strip.style.transform = `translate(${position}px)`;
		strip.style.transition = "240ms";

		if (frameIndex === 0) {
			setTimeout(() => {
				requestAnimationFrame(() => {
					strip.style.transition = "0s";
					strip.style.transform = `translate(-1440px)`;
				});
				frameIndex = 8;
			}, 260);
		}
	});

	const rightButton = document.createElement("button");
	rightButton.textContent = "RIGHT";
	rightButton.className = "border absolute top-[-8em] right-[-30%]";

	rightButton.addEventListener("click", () => {
		const strip = document.querySelector(".strip");

		frameIndex += 1;
		if (frameIndex === 10) {
			frameIndex = 0;
		}

		const position = normalize(frameIndex, 0, 9, 0, -1620);

		strip.style.transform = `translate(${position}px)`;
		strip.style.transition = "240ms";

		if (frameIndex === 9) {
			setTimeout(() => {
				requestAnimationFrame(() => {
					strip.style.transition = "0s";
					strip.style.transform = `translate(-180px)`;
				});
				frameIndex = 1;
			}, 260);
		}
	});

	directionalButtonContainer.append(leftButton, rightButton);

	container.appendChild(directionalButtonContainer);

	return container;
}
