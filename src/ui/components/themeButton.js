import { sampleOne } from "../../util/sampleOne.js";
import app from "../state/app.js";
import { Preferences } from "../state/Preferences.js";

export default function themeButton(preference) {
	const MORPH_DURATION = 0.5;
	const STROKE_COLOR_DURATION = 0.5;

	const svgNS = "http://www.w3.org/2000/svg";
	const button = document.createElement("button");
	button.id = "themeButton";
	const svg = document.createElementNS(svgNS, "svg");
	const path = document.createElementNS(svgNS, "path");

	svg.setAttribute("viewBox", "0 0 100 100");
	svg.style.width = "32px";
	svg.style.height = "32px";

	const SPRITE_MAP = {
		a: [11, 78],
		b: [107, 167],
		c: [182, 250],
	};

	const sound = new Howl({
		src: ["./src/assets/clickMp3.mp3"],
		sprite: SPRITE_MAP,
		volume: 0.25,
	});

	const { animate } = window.Motion;

	const moonPath = "M 50,10 A 40,40 0 1 0 90,50 A 30,30 0 1 1 50,10 Z";
	const circlePath = "M 50 10 A 40 40 0 1 0 50 90 A 40 40 0 1 0 50 10 Z";
	const shapes = {
		moon: moonPath,
		sun: circlePath,
	};

	const morphTo = (from, to) => {
		const interpolator = flubber.interpolate(from, to);

		animate(0, 1, {
			duration: MORPH_DURATION,
			ease: "easeOut",
			onUpdate: progress => {
				path.setAttribute("d", interpolator(progress));
			},
		});
	};

	const handleClickStates = {
		moon: () => {
			morphTo(shapes.moon, shapes.sun);
			setTimeout(() => {
				const soundButtonPaths = [
					...document.querySelectorAll("#soundButton svg path"),
				];

				const motionButtonPath = [
					...document.querySelectorAll("#motionButton svg path"),
				];

				const navbarPaths = [...soundButtonPaths, ...motionButtonPath, path];

				navbarPaths.forEach(path =>
					animate(
						path,
						{ stroke: "#000000" },
						{ duration: STROKE_COLOR_DURATION }
					)
				),
					MORPH_DURATION + 0.2;
			});

			app.state.dispatchEvent(
				new CustomEvent("preferenceChange", {
					detail: { preference: "light-mode" },
				})
			);

			if (Preferences.soundPreference === "sound-on") {
				const spriteId = sampleOne(Object.keys(SPRITE_MAP));
				sound.play(spriteId);
			}

			button.onclick = handleClickStates.sun;
		},
		sun: () => {
			morphTo(shapes.sun, shapes.moon);
			setTimeout(() => {
				const soundButtonPaths = [
					...document.querySelectorAll("#soundButton svg path"),
				];

				const motionButtonPath = [
					...document.querySelectorAll("#motionButton svg path"),
				];

				const navbarPaths = [...soundButtonPaths, ...motionButtonPath, path];

				navbarPaths.forEach(path =>
					animate(
						path,
						{ stroke: "#ffffff" },
						{ duration: STROKE_COLOR_DURATION }
					)
				),
					MORPH_DURATION + 0.2;
			});
			app.state.dispatchEvent(
				new CustomEvent("preferenceChange", {
					detail: { preference: "dark-mode" },
				})
			);

			if (Preferences.soundPreference === "sound-on") {
				const spriteId = sampleOne(Object.keys(SPRITE_MAP));
				sound.play(spriteId);
			}
			button.onclick = handleClickStates.moon;
		},
	};

	if (preference === "dark-mode") {
		path.setAttribute("d", shapes.moon);
		button.onclick = handleClickStates.moon;
	} else {
		path.setAttribute("d", shapes.sun);
		button.onclick = handleClickStates.sun;
	}

	path.setAttribute("fill", "none");
	const strokeColor =
		Preferences.themePreference === "light-mode" ? "#000000" : "#ffffff";
	path.setAttribute("stroke", strokeColor);
	path.setAttribute("stroke-width", "8px");
	path.setAttribute("stroke-linejoin", "round");

	svg.appendChild(path);

	const span = document.createElement("span");
	span.className = "visually-hidden";
	span.textContent = "Change theme preference";
	button.append(svg, span);

	return button;
}
