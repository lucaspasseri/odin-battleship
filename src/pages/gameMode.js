import goToPage from "../ui/goToPage.js";

export default function gameMode() {
	const container = document.createElement("div");
	container.className = "px-[1em] md:px-[4em] py-[1em] flex gap-[2em] flex-col";

	const h2 = "Choose the game mode";

	const buttonContainer = document.createElement("div");
	buttonContainer.className = "flex justify-center";

	const playerTypes = [
		{
			value: "human",
			svg: 123,
			text: "P1 vs CPU",
		},
		{
			value: "computer",
			svg: 123,
			text: "P1 vs P2",
		},
	];

	const ul = document.createElement("ul");
	ul.className = "flex w-full h-fit gap-[1em] flex-wrap";

	playerTypes.forEach(type => {
		const li = document.createElement("li");
		li.className = "flex-1 flex justify-center align-items h-[160px] w-fit";
		li.id = type.value + "li";
		const button = document.createElement("button");
		button.className =
			"flex-1 rounded border-[var(--color)] border-2 bg-gray-700";
		button.textContent = type.text;
		button.addEventListener("click", () => {
			goToPage("errorPage");
		});

		li.appendChild(button);

		ul.appendChild(li);
	});

	buttonContainer.appendChild(ul);

	container.append(h2, buttonContainer);
	return container;
}
