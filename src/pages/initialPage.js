import {
	navbar,
	createPlayerSection,
	createMatch,
} from "../ui/components/index.js";

export default function initialPage() {
	const nav = navbar();

	const page = document.createElement("div");
	page.id = "initialPage";

	const createSection = createPlayerSection();

	const match = createMatch();

	page.append(nav, createSection, match);

	return page;
}
