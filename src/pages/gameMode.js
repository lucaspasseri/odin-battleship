import goToPage from "../ui/goToPage.js";

export default function gameMode() {
	const container = document.createElement("div");
	container.className =
		"px-[1em] md:px-[4em] py-[1em] flex gap-[2em] flex-col mt-[1em]";

	const h2 = document.createElement("h2");
	h2.textContent = "Welcome, Captain, are you ready?";
	h2.className = "text-3xl";

	const buttonContainer = document.createElement("div");
	buttonContainer.className = "flex justify-center";

	const button = document.createElement("button");
	button.className =
		"rounded border-[var(--color)] border-2 bg-gray-700 px-[0.6em] py-[0.3em] bg-green-700 text-2xl mt-[2em]";
	button.textContent = "Start game";
	button.addEventListener("click", () => {
		goToPage("multiplayerPage");
	});

	buttonContainer.appendChild(button);

	container.append(h2, buttonContainer);
	return container;
}
