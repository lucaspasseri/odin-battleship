export default function navbar() {
	const nav = document.createElement("nav");
	nav.className = "navbar";

	const gameLogo = document.createElement("img");
	gameLogo.src = "./imgs/shipLoadedLogo.png";
	gameLogo.alt = "Game logo (ship)";
	gameLogo.width = "100";
	gameLogo.height = "100";

	const gameName = document.createElement("h1");
	gameName.textContent = "Battleship";
	gameName.className = "gameName";

	nav.append(gameLogo, gameName);
	return nav;
}
