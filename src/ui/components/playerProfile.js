export default function playerProfile(player) {
	const container = document.createElement("div");
	container.className = "playerProfileContainer";

	const profileImage = document.createElement("img");

	if (player === undefined) {
		return;
	}

	if (player.type === "real") {
		profileImage.src = "./imgs/officer.png";
		profileImage.alt = "Human player image";
	} else if (player.type === "computer") {
		profileImage.src = "./imgs/officerRobot.png";
		profileImage.alt = "Computer player image";
	}

	profileImage.width = "100";
	profileImage.height = "100";

	const p = document.createElement("p");
	p.textContent = player.name;

	container.append(profileImage, p);
	return container;
}
