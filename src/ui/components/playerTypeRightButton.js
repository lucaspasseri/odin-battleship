import { basicButton } from "./index.js";

function goRight() {
	const ps = [...document.querySelectorAll(".typeList p")];
	const currIndex = ps.findIndex(p => p.dataset.current === "true");
	const nextIndex = (currIndex + 1) % ps.length;

	ps[currIndex].setAttribute("data-current", false);
	ps[nextIndex].setAttribute("data-current", true);

	ps[nextIndex].scrollIntoView({
		inline: "center",
		behavior: "smooth",
		block: "nearest",
	});
}

const playerTypeRightButton = basicButton(
	"▶",
	goRight,
	"h-fit px-[0.35em] border border-black text-2xl bg-white my-auto rounded",
	"h-full absolute flex right-[-72px]"
);

export default playerTypeRightButton;
