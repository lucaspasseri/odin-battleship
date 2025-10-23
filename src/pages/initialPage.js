import {
	navbar,
	createPlayerSectionNew,
	createMatch,
} from "../ui/components/index.js";

export default function initialPage() {
	const nav = navbar();

	const page = document.createElement("div");
	page.id = "createPlayerPage";

	const createSection = createPlayerSectionNew();

	const match = createMatch();

	page.append(nav, createSection, match);

	return page;
}
