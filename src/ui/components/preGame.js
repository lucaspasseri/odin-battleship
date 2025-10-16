import { playerProfile, playerList } from "./index.js";

export default function preGame() {
	const container = document.createElement("div");
	container.className = "border-red-500 border-4 px-[4em] py-[1em]";

	const h3 = document.createElement("h3");
	h3.textContent = "Players";
	h3.className = "text-2xl mb-[0.4em]";

	// const playerList = document.createElement("ul");
	// playerList.className = "border-black border flex h-[130px]";

	// players.forEach(player => {
	// 	const li = document.createElement("li");
	// 	const profile = playerProfile(player);

	// 	li.appendChild(profile);
	// 	playerList.appendChild(li);
	// });

	// const li = document.createElement("li");

	// const openModalBtn = document.createElement("button");
	// openModalBtn.textContent = "Add";
	// openModalBtn.addEventListener("click", () => console.log(1));

	// li.appendChild(openModalBtn);
	// playerList.appendChild(li);

	const list = playerList();

	container.append(h3, list);

	return container;
}
