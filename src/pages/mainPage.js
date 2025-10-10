import { state } from "../core/index.js";
import { createUI } from "../ui/index.js";

export default function mainPage() {
	const page = createUI(state.game);

	return page;
}
