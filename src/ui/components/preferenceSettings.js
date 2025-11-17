import themeButton from "./themeButton.js";
import { Preferences } from "../state/Preferences.js";
import soundButton from "./soundButton.js";

export default function preferenceSettings() {
	const theme = Preferences.themePreference;
	const sound = Preferences.soundPreference;

	const container = document.createElement("div");
	container.className = "ml-auto";
	const settings = document.createElement("ul");
	settings.className = " flex gap-[1em]";

	const themeLi = document.createElement("li");
	const themeBtn = themeButton(theme);

	themeLi.appendChild(themeBtn);

	const soundLi = document.createElement("li");
	const soundBtn = soundButton(sound);

	soundLi.appendChild(soundBtn);

	settings.append(themeLi, soundLi);

	container.appendChild(settings);

	return container;
}
