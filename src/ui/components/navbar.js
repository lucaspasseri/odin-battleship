import preferenceSettings from "./preferenceSettings.js";

export default function navbar() {
	const nav = document.createElement("nav");
	nav.id = "navbar";
	nav.className = "flex items-center px-[1em] md:px-[4em] py-[1em] gap-[2em]";

	const gameLogo = document.createElement("img");
	gameLogo.className = "rounded-lg";
	gameLogo.src = "./src/assets/imgs/logo.png";
	gameLogo.alt = "Game logo (ship)";
	gameLogo.width = "100";
	gameLogo.height = "100";

	const gameName = document.createElement("h1");
	gameName.textContent = "Battleship";
	gameName.className = "text-[3.2em] text-white font-mono hidden md:block";

	const settings = preferenceSettings();

	nav.append(gameLogo, gameName, settings);
	return nav;
}
