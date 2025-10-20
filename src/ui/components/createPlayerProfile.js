import { capitalizeFirstLetter } from "../../util/capitalizeFirstLetter.js";

export default function createPlayerProfile(player) {
	const container = document.createElement("div");
	container.className =
		"px-[1em] py-[1em] border-[0.3em] border-black bg-blue-600 rounded-2xl h-[361px] w-[250px]";

	const selectionContainer = document.createElement("div");
	selectionContainer.className = "flex flex-col items-center gap-[1em] ";

	const imageWrapper = document.createElement("div");
	imageWrapper.className = "bg-white rounded-lg border-black border-[0.5em]";
	const playerImage = document.createElement("img");
	playerImage.src = player.imagePath;
	playerImage.width = "200";
	playerImage.height = "200";
	playerImage.alt = "playerImage";
	imageWrapper.appendChild(playerImage);

	const playerName = document.createElement("p");
	playerName.textContent = player.name;
	playerName.className =
		"text-2xl h-8 rounded text-center w-40 bg-white mt-[0.33em]";

	const playerType = document.createElement("p");
	playerType.textContent =
		player.type === "computer" ? capitalizeFirstLetter(player.type) : "Human";
	playerType.className =
		"w-[140px] px-[0.2em] py-[0.1em] border-2 border-white rounded-lg h-full text-2xl font-mono bg-blue-500 text-white text-center";

	selectionContainer.append(imageWrapper, playerName, playerType);
	container.append(selectionContainer);
	return container;
}
