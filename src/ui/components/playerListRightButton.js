import { basicButton } from "./index.js";

function goRight() {
	const lis = [...document.querySelectorAll("li.playerProfile")];
	const currIndex = lis.findIndex(li => li.dataset.current === "true");
	const nextIndex = (currIndex + 1) % lis.length;

	lis[currIndex].setAttribute("data-current", false);
	lis[nextIndex].setAttribute("data-current", true);

	lis[nextIndex].scrollIntoView({
		inline: "center",
		behavior: "smooth",
		block: "nearest",
	});
}

const playerListRightButton = basicButton(
	"▶",
	goRight,
	"h-fit px-[0.35em] border border-black text-2xl bg-white my-auto rounded",
	"h-full absolute flex right-[-20px] top-0"
);

export default playerListRightButton;
