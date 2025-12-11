import { Game, state } from "./core/index.js";
import startSinglePlayerGame from "./core/orchestration/startSinglePlayerGame.js";
import { navbar } from "./ui/components/index.js";
import goToPage from "./ui/goToPage.js";
import app from "./ui/state/app.js";
import { Preferences } from "./ui/state/Preferences.js";

const game = new Game();
state.game = game;

const changePreference = new EventTarget();
changePreference.addEventListener("preferenceChange", e => {
	const { preference } = e.detail;

	switch (preference) {
		case "light-mode":
			Preferences.toggleTheme();
			document.documentElement.setAttribute("data-theme", preference);
			break;
		case "dark-mode":
			Preferences.toggleTheme();
			document.documentElement.setAttribute("data-theme", preference);
			break;
		case "no-preference":
		case "reduce":
			Preferences.toggleMotion();
	}
});

app.state = changePreference;

const preferredTheme = Preferences.themePreference;

document.documentElement.setAttribute("data-theme", preferredTheme);

const container = document.querySelector("#container");

const header = document.createElement("div");
header.id = "header";
const nav = navbar();

header.appendChild(nav);

const main = document.createElement("main");
main.id = "main";

const footer = document.createElement("div");

container.append(header, main, footer);

// goToPage("gameMode");

startSinglePlayerGame();
goToPage("playMatch");
