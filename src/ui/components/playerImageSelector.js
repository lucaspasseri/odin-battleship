import { playerImageLeftButton, playerImageRightButton } from "./index.js";
import { paths } from "./constants.js";
export default function playerImageSelector() {
	const galleryWrapper = document.createElement("div");
	galleryWrapper.className =
		"border-[0.3em] border-black rounded-lg w-fit relative bg-white h-full";

	const gallery = document.createElement("div");
	gallery.className =
		"gallery flex gap-[0.6em] w-[200px] h-[200px] overflow-hidden border-4 border-black";

	paths.forEach((path, index) => {
		const img = document.createElement("img");
		img.width = 200;
		img.height = 200;
		img.alt = "img-" + index;
		img.id = "img-" + index;
		img.src = path;
		if (index === 0) {
			img.setAttribute("data-current", true);
		}

		gallery.appendChild(img);
	});

	const leftBtn = playerImageLeftButton;
	const rightBtn = playerImageRightButton;

	galleryWrapper.append(leftBtn, gallery, rightBtn);

	return galleryWrapper;
}
