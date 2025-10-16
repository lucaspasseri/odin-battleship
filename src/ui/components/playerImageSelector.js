import { selectorButton } from "./index.js";
import { paths } from "./constants.js";
export default function playerImageSelector() {
	const galleryWrapper = document.createElement("div");
	galleryWrapper.className =
		"border-[0.3em] border-black rounded-lg w-fit relative bg-white";

	const leftBtn = selectorButton();
	const rightBtn = selectorButton("right");

	const gallery = document.createElement("div");
	gallery.className =
		"gallery flex px-[0.6em] py-[0.2em] gap-[0.6em] w-[100px] overflow-hidden border-4 border-black";

	paths.forEach((path, index) => {
		const img = document.createElement("img");
		img.width = 90;
		img.height = 90;
		img.alt = "img-" + index;
		img.id = "img-" + index;
		img.src = path;
		if (index === 0) {
			img.setAttribute("data-current", true);
		}

		gallery.appendChild(img);
	});

	galleryWrapper.append(leftBtn, gallery, rightBtn);

	return galleryWrapper;
}
