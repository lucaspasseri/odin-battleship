import preferenceButton from "./preferenceButton.js";
import { Preferences } from "../state/Preferences.js";

export default function preferenceSettings() {
	const theme = Preferences.themePreference;
	// const sound = Preferences.soundPreference;
	// const motion = Preferences.motionPreference;

	const preferences = [{ id: "themeLi", value: theme }];

	const container = document.createElement("div");
	container.className = "ml-auto";
	const settings = document.createElement("ul");
	settings.className = " flex gap-[1em]";

	preferences.forEach(preference => {
		const { id, value } = preference;
		const li = document.createElement("li");
		li.id = id;
		console.log({ value });
		const button = preferenceButton(value);
		li.appendChild(button);

		settings.appendChild(li);
	});

	container.appendChild(settings);

	return container;
}
