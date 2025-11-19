import { Game, state } from "./core/index.js";
import { navbar } from "./ui/components/index.js";
import goToPage from "./ui/goToPage.js";
import app from "./ui/state/app.js";
import { Preferences } from "./ui/state/Preferences.js";

const game = new Game();
state.game = game;

const changePreference = new EventTarget();
changePreference.addEventListener("preferenceChange", e => {
	const { preference } = e.detail;
	console.log({ preference });
	switch (preference) {
		case "light-mode":
			// const darkModeElements = [...document.querySelectorAll(".dark-mode")];
			// darkModeElements.forEach(el =>
			// 	el.classList.replace("dark-mode", "light-mode")
			// );
			Preferences.toggleTheme();
			document.documentElement.setAttribute("data-theme", preference);
			break;
		case "dark-mode":
			// const lightModeElements = [...document.querySelectorAll(".light-mode")];
			// lightModeElements.forEach(el =>
			// 	el.classList.replace("light-mode", "dark-mode")
			// );
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
console.log({ preferredTheme });

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

goToPage("gameMode");
