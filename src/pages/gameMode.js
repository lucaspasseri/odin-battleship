import { shimmerButton } from "../ui/components/index.js";
import goToPage from "../ui/goToPage.js";

export default function gameMode() {
	const container = document.createElement("div");
	container.className =
		"px-[1em] md:px-[4em] py-[1em] flex gap-[2em] flex-col mt-[1em]";

	const h2 = document.createElement("h2");
	h2.textContent = "Welcome, Captain, are you ready?";
	h2.className = "text-3xl mb-[2em]";

	const startButton = shimmerButton("Start game", false);

	startButton.addEventListener("click", () => {
		goToPage("multiplayerPage");
	});

	container.append(h2, startButton);
	return container;
}
