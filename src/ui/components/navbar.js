export default function navbar() {
	const nav = document.createElement("nav");
	nav.className = "flex bg-blue-600 items-center px-[4em] py-[1em] gap-[2em]";

	const gameLogo = document.createElement("img");
	gameLogo.className = "rounded-lg";
	gameLogo.src = "./imgs/logo.png";
	gameLogo.alt = "Game logo (ship)";
	gameLogo.width = "100";
	gameLogo.height = "100";

	const gameName = document.createElement("h1");
	gameName.textContent = "Battleship";
	gameName.className = "text-[3.5em] text-white font-mono";

	nav.append(gameLogo, gameName);
	return nav;
}
