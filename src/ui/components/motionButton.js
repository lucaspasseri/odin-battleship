import { sampleOne } from "../../util/sampleOne.js";
import app from "../state/app.js";
import { Preferences } from "../state/Preferences.js";

export default function motionButton(preference) {
	const svgNS = "http://www.w3.org/2000/svg";
	const button = document.createElement("button");
	button.id = "motionButton";
	button.className = "poke";
	const svg = document.createElementNS(svgNS, "svg");
	svg.setAttribute("viewBox", "0 0 24 24");
	svg.style.width = "32px";
	svg.style.height = "32px";
	svg.style.overflow = "visible";

	const strokeColor =
		Preferences.themePreference === "light-mode" ? "#000000" : "#ffffff";

	const path = document.createElementNS(svgNS, "path");
	path.setAttribute("fill", "none");
	path.setAttribute("stroke", strokeColor);
	path.setAttribute("stroke-width", "2px");
	path.setAttribute("stroke-linejoin", "round");
	svg.appendChild(path);

	const rect2 = document.createElementNS(svgNS, "path");
	rect2.setAttribute("fill", "none");
	rect2.setAttribute("stroke", strokeColor);
	rect2.setAttribute("stroke-width", "2px");
	rect2.setAttribute("stroke-linejoin", "round");
	svg.appendChild(rect2);

	const { animate } = window.Motion;

	const playPath = `
	M5 5a
	2 2 0 0 1 3.008-1.728l11.997 6.998
	a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19
	z`;
	const squarePath = `
		M 3,3 
		h 18
		v 18
		h -18
		v -18
	`;

	const rectPath = `
		M 3,3 
		h 7
		v 18
		h -7
		v -18
		Z
	`;

	const rect2Path = `
		M 14,3
		h 7
		v 18
		h -7
		v -18
		Z
	`;

	const linePath = `
		M 21,3
		h 0
		v 18
		h 0
		v -18
	`;
	const shapes = {
		play: playPath,
		square: squarePath,
		rect: rectPath,
		rect2: rect2Path,
		line: linePath,
	};

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

	const morphTo = (from, to, path) => {
		const interpolator = flubber.interpolate(from, to);

		animate(0, 1, {
			duration: 0.5,
			ease: "easeOut",
			onUpdate: progress => {
				path.setAttribute("d", interpolator(progress));
			},
		});
	};

	const fadeOut = () => {
		animate(rect2, { opacity: 0 }, { duration: 0.5 });
	};

	const fadeIn = () => {
		animate(rect2, { opacity: 1 }, { duration: 0.5 });
	};

	const handleClickStates = {
		play: () => {
			morphTo(shapes.play, shapes.rect, path);
			fadeIn();
			morphTo(shapes.line, shapes.rect2, rect2);

			if (Preferences.soundPreference === "sound-on") {
				const spriteId = sampleOne(Object.keys(SPRITE_MAP));
				sound.play(spriteId);
			}

			app.state.dispatchEvent(
				new CustomEvent("preferenceChange", {
					detail: { preference: "reduce" },
				})
			);

			button.onclick = handleClickStates.pause;
		},
		pause: () => {
			morphTo(shapes.rect, shapes.play, path);
			morphTo(shapes.line, shapes.rect2, rect2);
			fadeOut();

			if (Preferences.soundPreference === "sound-on") {
				const spriteId = sampleOne(Object.keys(SPRITE_MAP));
				sound.play(spriteId);
			}

			app.state.dispatchEvent(
				new CustomEvent("preferenceChange", {
					detail: { preference: "no-preference" },
				})
			);

			button.onclick = handleClickStates.play;
		},
	};

	if (preference === "no-preference") {
		path.setAttribute("d", shapes.play);
		rect2.setAttribute("d", shapes.line);
		rect2.setAttribute("opacity", 0);
		button.onclick = handleClickStates.play;
	} else {
		path.setAttribute("d", shapes.rect);
		rect2.setAttribute("d", shapes.rect2);
		rect2.setAttribute("opacity", 1);
		button.onclick = handleClickStates.pause;
	}
	const span = document.createElement("span");
	span.className = "visually-hidden";
	span.textContent = "Change motion animation preference";
	button.append(svg, span);

	return button;
}
