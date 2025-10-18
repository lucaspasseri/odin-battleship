export default function createPlayerProfile(player) {
	const container = document.createElement("div");
	container.className =
		"px-[1em] py-[1em] relative border-[0.3em] border-black bg-blue-600 rounded-2xl";

	const selectionContainer = document.createElement("div");
	selectionContainer.className = "flex flex-col items-center gap-[0.6em]";

	const playerImage = document.createElement("img");
	playerImage.src = player.imagePath;
	playerImage.width = "200";
	playerImage.height = "200";
	playerImage.alt = "playerImage";
	playerImage.className = "border-black border-[0.5em] rounded-lg";

	const playerName = document.createElement("p");
	playerName.textContent = player.name;

	const playerType = document.createElement("p");
	playerType.textContent = player.type;

	selectionContainer.append(playerImage, playerName, playerType);
	container.append(selectionContainer);
	return container;
}
