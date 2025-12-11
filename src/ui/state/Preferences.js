const STORAGE_KEYS = {
	THEME_STATE: "themePreference",
	SOUND_STATE: "soundPreference",
	MOTION_STATE: "motionPreference",
};

const DEFAULTS = {
	darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark-mode"
		: "light-mode",
	soundPreference: "sound-on",
	motionNoPreference: window.matchMedia(
		"(prefers-reduced-motion: no-preference"
	).matches
		? "no-preference"
		: "reduced",
};

function getItem(key, defaultValue) {
	const value = localStorage.getItem(key);
	if (value === null) return defaultValue;
	return value;
}

function setItem(key, value) {
	localStorage.setItem(key, String(value));
}

export const Preferences = {
	get themePreference() {
		return getItem(STORAGE_KEYS.THEME_STATE, DEFAULTS.darkMode);
	},

	set themePreference(value) {
		setItem(STORAGE_KEYS.THEME_STATE, value);
	},

	toggleTheme() {
		const currTheme = this.themePreference;
		if (currTheme === "dark-mode") {
			this.themePreference = "light-mode";
		} else {
			this.themePreference = "dark-mode";
		}
	},

	get soundPreference() {
		return getItem(STORAGE_KEYS.SOUND_STATE, DEFAULTS.soundPreference);
	},
	set soundPreference(value) {
		setItem(STORAGE_KEYS.SOUND_STATE, value);
	},
	toggleSound() {
		const currSound = this.soundPreference;
		if (currSound === "sound-on") {
			this.soundPreference = "sound-off";
		} else {
			this.soundPreference = "sound-on";
		}
	},

	get motionPreference() {
		return getItem(STORAGE_KEYS.MOTION_STATE, DEFAULTS.motionNoPreference);
	},
	set motionPreference(value) {
		setItem(STORAGE_KEYS.MOTION_STATE, value);
	},

	toggleMotion() {
		const currMotion = this.motionPreference;
		if (currMotion === "no-preference") {
			this.motionPreference = "reduce";
		} else {
			this.motionPreference = "no-preference";
		}
	},
};
