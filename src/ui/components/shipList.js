import { state } from "../../core/index.js";

export default function shipList(playerIndex) {
	const ships = state.game.getShips(playerIndex);
	const list = document.createElement("div");
	list.className = "shipList";

	ships?.forEach(ship => {
		const shipShape = document.createElement("div");
		shipShape.className = "shipShape";
		let i = 0;

		while (i < ship.length) {
			const shipPart = document.createElement("div");
			shipPart.className = "shipPart";

			shipShape.appendChild(shipPart);
			i++;
		}

		list.appendChild(shipShape);
	});

	return list;
}
