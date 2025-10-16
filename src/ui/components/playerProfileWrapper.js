import { playerProfile } from "./index.js";

export default function playerProfileWrapper(player) {
	const container = document.createElement("div");
	container.className = "flex items-center";
	const profile = playerProfile(player);

	const ships = player.gameboard.ships;

	if (ships.length === 0) {
		container.appendChild(profile);
		return container;
	}

	const shipList = document.createElement("div");
	shipList.className = "flex flex-col gap-[0.2em] justify-center";

	ships.forEach(ship => {
		const shipContainer = document.createElement("div");
		shipContainer.className = "flex gap-[0.2em] w-fit border border-black p-1";

		for (let i = 0; i < ship.length; i++) {
			const shipCell = document.createElement("div");
			shipCell.className = "bg-black w-4 h-4";

			shipContainer.appendChild(shipCell);
		}
		shipList.appendChild(shipContainer);
	});

	container.append(profile, shipList);

	return container;
}
