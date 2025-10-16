const directionMap = {
	left: {
		textContent: "◀",
		className:
			"p-2 border border-black absolute left-[-44px] top-[38px] text-xl bg-white",
		nextImgIndex: (imgsArr, currImageIndex) =>
			currImageIndex === 0
				? imgsArr.length - 1
				: currImageIndex - (1 % imgsArr.length),
	},
	right: {
		textContent: "▶",
		className:
			"p-2 border border-black absolute right-[-44px] top-[38px] text-xl bg-white",
		nextImgIndex: (imgsArr, currImageIndex) =>
			(currImageIndex + 1) % imgsArr.length,
	},
};

export default function selectorButton(
	direction = "left",
	cb = () => {
		const imgs = [...document.querySelectorAll(".gallery img")];
		const currImgIndex = imgs.findIndex(img => img.dataset.current === "true");
		const nextImgIndex = directionMap[direction].nextImgIndex(
			imgs,
			currImgIndex
		);

		imgs[currImgIndex].setAttribute("data-current", false);
		imgs[nextImgIndex].setAttribute("data-current", true);

		imgs[nextImgIndex].scrollIntoView({
			inline: "center",
			behavior: "smooth",
		});
	}
) {
	const container = document.createElement("div");

	const button = document.createElement("button");
	button.textContent = directionMap[direction].textContent;
	button.className = directionMap[direction].className;
	button.addEventListener("click", cb);

	container.appendChild(button);
	return container;
}
