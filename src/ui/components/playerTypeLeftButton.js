import { basicButton } from "./index.js";

function goLeft() {
	const ps = [...document.querySelectorAll(".typeList p")];
	const currIndex = ps.findIndex(p => p.dataset.current === "true");
	const nextIndex =
		currIndex === 0 ? ps.length - 1 : currIndex - (1 % ps.length);

	ps[currIndex].setAttribute("data-current", false);
	ps[nextIndex].setAttribute("data-current", true);

	ps[nextIndex].scrollIntoView({
		inline: "center",
		behavior: "smooth",
	});
}

const playerTypeLeftButton = basicButton(
	"◀",
	goLeft,
	"h-fit px-[0.35em] border border-black text-2xl bg-white my-auto",
	"h-full absolute flex left-[-72px]"
);

export default playerTypeLeftButton;
