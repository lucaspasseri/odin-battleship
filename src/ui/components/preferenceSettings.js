import { Preferences } from "../state/Preferences.js";
import { motionButton, themeButton, soundButton } from "./index.js";

export default function preferenceSettings() {
	const theme = Preferences.themePreference;
	const sound = Preferences.soundPreference;
	const motion = Preferences.motionPreference;

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

	// const motionLi = document.createElement("li");
	// const motionBtn = motionButton(motion);
	// motionLi.appendChild(motionBtn);

	settings.append(themeLi, soundLi);

	container.appendChild(settings);

	return container;
}
