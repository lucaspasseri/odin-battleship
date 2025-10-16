export default function playerProfile(player) {
	if (player === undefined) {
		return;
	}

	const container = document.createElement("div");
	container.className =
		"border-2 border-black h-full w-[90px] overflow-x-hidden rounded-lg flex flex-col items-center bg-white";

	const profileImage = document.createElement("img");
	profileImage.width = "80";
	profileImage.height = "80";
	profileImage.src = player.imagePath;

	if (player.type === "real") {
		profileImage.alt = "Human player image";
	} else if (player.type === "computer") {
		profileImage.alt = "Computer player image";
	}

	const p = document.createElement("p");
	p.textContent = player.name;
	p.className = "text-center font-mono";

	container.append(profileImage, p);
	return container;
}
