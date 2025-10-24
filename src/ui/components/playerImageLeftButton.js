import { basicButton } from "./index.js";

function goLeft() {
	const imgs = [...document.querySelectorAll(".gallery img")];
	const currImgIndex = imgs.findIndex(img => img.dataset.current === "true");
	const nextImgIndex =
		currImgIndex === 0 ? imgs.length - 1 : currImgIndex - (1 % imgs.length);

	imgs[currImgIndex].setAttribute("data-current", false);
	imgs[nextImgIndex].setAttribute("data-current", true);

	imgs[nextImgIndex].scrollIntoView({
		inline: "center",
		behavior: "smooth",
		block: "nearest",
	});
}

const playerImageLeftButton = basicButton(
	"◀",
	goLeft,
	"h-fit px-[0.35em] border border-black text-2xl bg-white my-auto rounded",
	"h-full absolute flex left-[-44px]"
);

export default playerImageLeftButton;
