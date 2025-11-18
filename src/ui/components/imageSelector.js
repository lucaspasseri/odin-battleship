import { leftTriangleSvg } from "./index.js";
import { normalize } from "../../util/normalize.js";

export default function imageSelector() {
	const NUMBER_OF_IMAGES = 8;
	let imageIndex = 0;

	function calculateCoordinates(direction) {
		if (direction === "left") {
			if (imageIndex === 0) {
				imageIndex = 7;
			} else {
				imageIndex -= 1;
			}
		} else {
			imageIndex += 1;
		}

		const xValue = normalize(
			imageIndex % (NUMBER_OF_IMAGES / 2),
			0,
			3,
			-39,
			-485
		);
		const yValue = imageIndex % NUMBER_OF_IMAGES < 4 ? -20 : -220;

		return { x: xValue, y: yValue };
	}

	const container = document.createElement("div");
	container.className = "flex flex-col items-center gap-[1em] relative";

	const KEY_PRESS_DURATION = 300;

	const rightButton = document.createElement("button");
	rightButton.className = "absolute right-0 top-[50%] z-10";
	const rightSvg = leftTriangleSvg();
	rightSvg.style.setProperty("transform", "rotate(180deg)");
	const xInitialR = "50%";
	const yInitialR = "-50%";

	rightButton.style.setProperty(
		"transform",
		`translate(${xInitialR}, ${yInitialR})`
	);
	rightButton.style.setProperty("--x", xInitialR);
	rightButton.style.setProperty("--y", yInitialR);
	rightButton.style.setProperty("--duration", KEY_PRESS_DURATION + "ms");

	rightButton.appendChild(rightSvg);
	rightButton.addEventListener("click", () => {
		const sprite = document.querySelector("#playerProfileSprite");
		const { x, y } = calculateCoordinates("right");
		sprite.style.setProperty("transform", `translate(${x}px, ${y}px)`);

		rightButton.classList.add("arrowPress");
		setTimeout(() => {
			rightButton.classList.remove("arrowPress");
		}, KEY_PRESS_DURATION + 200);
	});

	const leftButton = document.createElement("button");
	leftButton.className = "absolute left-0 top-[50%] z-10";
	const leftSvg = leftTriangleSvg();
	leftButton.appendChild(leftSvg);
	const xInitialL = "-50%";
	const yInitialL = "-50%";

	leftButton.style.setProperty(
		"transform",
		`translate(${xInitialL}, ${yInitialL})`
	);
	leftButton.style.setProperty("--x", xInitialL);
	leftButton.style.setProperty("--y", yInitialL);
	leftButton.style.setProperty("--duration", KEY_PRESS_DURATION + "ms");

	leftButton.addEventListener("click", () => {
		const sprite = document.querySelector("#playerProfileSprite");
		const { x, y } = calculateCoordinates("left");
		sprite.style.setProperty("transform", `translate(${x}px, ${y}px)`);
		leftButton.classList.add("arrowPress");
		setTimeout(() => {
			leftButton.classList.remove("arrowPress");
		}, KEY_PRESS_DURATION + 200);
	});

	const imagesContainer = document.createElement("div");
	imagesContainer.className =
		"flex w-[160px] h-[200px] overflow-hidden border-4 border-black";

	const spriteImage = document.createElement("img");
	spriteImage.id = "playerProfileSprite";
	spriteImage.className = "max-w-none h-fit flex-0";
	spriteImage.src = "./src/assets/imgs/sprite.png";
	spriteImage.width = "660";
	spriteImage.height = "440";
	spriteImage.style.setProperty("transform", "translate(-38px,-20px)");

	imagesContainer.appendChild(spriteImage);
	container.append(imagesContainer, leftButton, rightButton);

	return container;
}
