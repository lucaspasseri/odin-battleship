import app from "../state/app.js";

export default function preferenceButton(preference) {
	const svgNS = "http://www.w3.org/2000/svg";
	const button = document.createElement("button");
	const svg = document.createElementNS(svgNS, "svg");
	const path = document.createElementNS(svgNS, "path");

	svg.setAttribute("viewBox", "0 0 100 100");
	svg.style.width = "32px";
	svg.style.height = "32px";

	path.setAttribute("fill", "none");
	path.setAttribute("stroke", "white");
	path.setAttribute("stroke-width", "10px");
	path.setAttribute("stroke-linejoin", "round");
	svg.appendChild(path);

	const span = document.createElement("span");
	span.className = "visually-hidden";
	span.textContent = "Change theme preference";
	button.append(svg, span);
	document.body.appendChild(button);

	const { animate } = window.Motion;

	const moonPath = "M 50,10 A 40,40 0 1 0 90,50 A 30,30 0 1 1 50,10 Z";
	const circlePath = "M 50 10 A 40 40 0 1 0 50 90 A 40 40 0 1 0 50 10 Z";
	const shapes = {
		moon: moonPath,
		sun: circlePath,
	};

	let current = "moon";

	const morphTo = (from, to) => {
		const interpolator = flubber.interpolate(from, to);

		animate(0, 1, {
			duration: 0.5,
			onUpdate: progress => {
				path.setAttribute("d", interpolator(progress));
			},
		});
	};

	const handleClickStates = {
		moon: () => {
			morphTo(shapes.moon, shapes.sun);
			current = "sun";
			app.state.dispatchEvent(
				new CustomEvent("preferenceChange", {
					detail: { preference: "light-mode", btnId: "darkModeBtn" },
				})
			);
			button.onclick = handleClickStates.sun;
		},
		sun: () => {
			morphTo(shapes.sun, shapes.moon);
			current = "moon";
			app.state.dispatchEvent(
				new CustomEvent("preferenceChange", {
					detail: { preference: "dark-mode", btnId: "lightModeBtn" },
				})
			);
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

	return button;
}
