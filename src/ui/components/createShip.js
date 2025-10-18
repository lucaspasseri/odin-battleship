export default function createShip(size, direction, id) {
	const container = document.createElement("div");
	container.className = `border-[0.1em] border-black p-[0.2em] flex gap-[0.2em] w-fit rounded fixed ${
		direction === "vertical" ? "flex-col" : ""
	} ship-${id}`;

	for (let i = 0; i < size; i++) {
		const shipCell = document.createElement("div");
		shipCell.className = "bg-black w-8 h-8 rounded";

		container.appendChild(shipCell);
	}

	let newX = 0,
		newY = 0,
		startX = 0,
		startY = 0;

	container.addEventListener("mousedown", e => {
		console.log(1);
		startX = e.clientX;
		startY = e.clientY;

		document.addEventListener("mousemove", mouseMove);

		document.addEventListener("mouseup", () => {
			document.removeEventListener("mousemove", mouseMove);
		});
	});

	function mouseMove(e) {
		newX = startX - e.clientX;
		newY = startY - e.clientY;

		startX = e.clientX;
		startY = e.clientY;

		const ship = document.querySelector(`.ship-${id}`);

		ship.style.top = `${ship.offsetTop - newY}px`;
		ship.style.left = `${ship.offsetLeft - newX}px`;
	}

	return container;
}
