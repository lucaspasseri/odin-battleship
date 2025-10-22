export default function createDraggableShip(
	size,
	direction,
	id,
	customClassname
) {
	const container = document.createElement("div");
	container.id = id;
	container.draggable = true;
	container.className = `border-[0.1em] border-black p-[0.2em] flex gap-[0.2em] w-fit rounded absolute cursor-grab ${
		direction === "vertical" ? "flex-col" : "flex-row"
	} ${customClassname !== undefined ? customClassname : ""}`;

	for (let i = 0; i < size; i++) {
		const shipCell = document.createElement("div");
		shipCell.className = "bg-black w-8 h-8 rounded";
		container.appendChild(shipCell);
	}

	container.addEventListener("dragstart", e => {
		e.dataTransfer.setData("ship", JSON.stringify({ id, size, direction }));
	});

	return container;
}
