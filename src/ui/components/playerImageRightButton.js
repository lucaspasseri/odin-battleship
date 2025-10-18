import { basicButton } from "./index.js";

function goRight() {
	const imgs = [...document.querySelectorAll(".gallery img")];
	const currImgIndex = imgs.findIndex(img => img.dataset.current === "true");
	const nextImgIndex = (currImgIndex + 1) % imgs.length;

	imgs[currImgIndex].setAttribute("data-current", false);
	imgs[nextImgIndex].setAttribute("data-current", true);

	imgs[nextImgIndex].scrollIntoView({
		inline: "center",
		behavior: "smooth",
	});
}

const playerImageRightButton = basicButton(
	"▶",
	goRight,
	"h-fit px-[0.35em] border border-black text-2xl bg-white my-auto",
	"h-full absolute flex top-0 right-[-44px]"
);

export default playerImageRightButton;
