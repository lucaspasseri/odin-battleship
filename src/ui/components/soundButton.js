import { Preferences } from "../state/Preferences.js";
import { sampleOne } from "../../util/sampleOne.js";
import app from "../state/app.js";

export default function soundButton(preference) {
	const svgNS = "http://www.w3.org/2000/svg";
	const button = document.createElement("button");
	const svg = document.createElementNS(svgNS, "svg");
	svg.setAttribute("viewBox", "0 0 24 24");
	svg.style.width = "32px";
	svg.style.height = "32px";
	svg.style.overflow = "visible";

	const mainPath = document.createElementNS(svgNS, "path");
	mainPath.setAttribute("fill", "none");
	mainPath.setAttribute("stroke", "white");
	mainPath.setAttribute("stroke-width", "2px");
	mainPath.setAttribute("stroke-linejoin", "round");
	svg.appendChild(mainPath);

	const wave1Path = document.createElementNS(svgNS, "path");
	wave1Path.setAttribute("fill", "none");
	wave1Path.setAttribute("stroke", "white");
	wave1Path.setAttribute("stroke-width", "2px");
	wave1Path.setAttribute("stroke-linejoin", "round");
	svg.appendChild(wave1Path);

	const wave2Path = document.createElementNS(svgNS, "path");
	wave2Path.setAttribute("fill", "none");
	wave2Path.setAttribute("stroke", "white");
	wave2Path.setAttribute("stroke-width", "2px");
	wave2Path.setAttribute("stroke-linejoin", "round");
	svg.appendChild(wave2Path);

	const crossLine1 = document.createElementNS(svgNS, "line");
	crossLine1.setAttribute("x1", "22");
	crossLine1.setAttribute("y1", "9");
	crossLine1.setAttribute("x2", "16");
	crossLine1.setAttribute("y2", "15");
	crossLine1.setAttribute("fill", "none");
	crossLine1.setAttribute("stroke", "white");
	crossLine1.setAttribute("stroke-width", "2px");
	crossLine1.setAttribute("stroke-linejoin", "round");
	svg.appendChild(crossLine1);

	const crossLine2 = document.createElementNS(svgNS, "line");
	crossLine2.setAttribute("x1", "16");
	crossLine2.setAttribute("y1", "9");
	crossLine2.setAttribute("x2", "22");
	crossLine2.setAttribute("y2", "15");
	crossLine2.setAttribute("fill", "none");
	crossLine2.setAttribute("stroke", "white");
	crossLine2.setAttribute("stroke-width", "2px");
	crossLine2.setAttribute("stroke-linejoin", "round");
	svg.appendChild(crossLine2);

	const shapes = {
		stereo: `
		M11 4.702
		a.705.705 0 0 0-1.203-.498
		L6.413 7.587
		A1.4 1.4 0 0 1 5.416 8
		H3
		a1 1 0 0 0-1 1
		v6
		a1 1 0 0 0 1 1
		h2.416
		a1.4 1.4 0 0 1 .997.413
		l3.383 3.384
		A.705.705 0 0 0 11 19.298
		z`,
		wave1: `
		M16 9
		a5 5 0 0 1 0 6 `,
		wave2: `
		M19.364 18.364
		a9 9 0 0 0 0-12.728`,
		empty: `
		M 11,10
		v4
		h1`,
	};

	const { animate } = window.Motion;

	const morphTo = (from, to, wavePath) => {
		const interpolator = flubber.interpolate(from, to);

		animate(0, 1, {
			duration: 0.5,
			onUpdate: progress => {
				wavePath.setAttribute("d", interpolator(progress));
			},
		});
	};

	const fadeOut = () => {
		animate(crossLine1, { opacity: 0 }, { duration: 0.5 });
		animate(crossLine2, { opacity: 0 }, { duration: 0.5 });
	};

	const fadeIn = () => {
		animate(crossLine1, { opacity: 1 }, { duration: 0.5 });
		animate(crossLine2, { opacity: 1 }, { duration: 0.5 });
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

	const handleClickStates = {
		soundOn: () => {
			morphTo(shapes.wave2, shapes.wave1, wave2Path);

			setTimeout(() => {
				morphTo(shapes.wave1, shapes.empty, wave2Path);
				morphTo(shapes.wave1, shapes.empty, wave1Path);
				fadeIn();
			}, 500);

			app.state.dispatchEvent(
				new CustomEvent("preferenceChange", {
					detail: { preference: "sound-off" },
				})
			);

			const spriteId = sampleOne(Object.keys(SPRITE_MAP));

			sound.play(spriteId);
			button.onclick = handleClickStates.soundOff;
			Preferences.toggleSound();
		},
		soundOff: () => {
			fadeOut();
			morphTo(shapes.empty, shapes.wave1, wave1Path);
			morphTo(shapes.empty, shapes.wave1, wave2Path);

			setTimeout(() => morphTo(shapes.wave1, shapes.wave2, wave2Path), 500);

			app.state.dispatchEvent(
				new CustomEvent("preferenceChange", {
					detail: { preference: "sound-on" },
				})
			);
			button.onclick = handleClickStates.soundOn;
			Preferences.toggleSound();
		},
	};

	if (preference === "sound-on") {
		wave1Path.setAttribute("d", shapes.wave1);
		wave2Path.setAttribute("d", shapes.wave2);
		button.onclick = handleClickStates.soundOn;
		crossLine1.setAttribute("opacity", 0);
		crossLine2.setAttribute("opacity", 0);
	} else {
		wave1Path.setAttribute("d", shapes.empty);
		wave2Path.setAttribute("d", shapes.empty);
		button.onclick = handleClickStates.soundOff;
		crossLine1.setAttribute("opacity", 1);
		crossLine2.setAttribute("opacity", 1);
	}

	mainPath.setAttribute("d", shapes.stereo);

	const span = document.createElement("span");
	span.className = "visually-hidden";
	span.textContent = "Change sound preference";
	button.append(svg, span);
	document.body.appendChild(button);
	return button;
}
