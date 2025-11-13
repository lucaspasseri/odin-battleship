export default function circleShape() {
	const svgNS = "http://www.w3.org/2000/svg";
	const svg = document.createElementNS(svgNS, "svg");
	svg.setAttribute("width", "30");
	svg.setAttribute("height", "30");
	svg.setAttribute("viewBox", "0 0 100 100");
	svg.classList.add("circleSvg");

	const path = document.createElementNS(svgNS, "path");
	path.id = "circlePath";
	path.setAttribute("stroke-linejoin", "round");

	// const moonPath = "M 50,10 A 40,40 0 1 0 90,50 A 30,30 0 1 1 50,10 Z";

	const circlePath = "M 50 10 A 40 40 0 1 0 50 90 A 40 40 0 1 0 50 10 Z";

	path.setAttribute("d", circlePath);

	svg.appendChild(path);

	return svg;
}

// 	`
// 	M 56.96, 10.8
// 	A 40,40 0 1 0 89.2,43.05
// 	A 28,28 0 1 1 56.96, 10.8
// 	Z
// `

// 	`
// 	M 36.32, 12.4
// 	A 40,40 0 1 0 87.6,63.68
// 	A 20,20 0 1 1 36.32, 12.4
// 	Z
// `
// svg.addEventListener("mouseenter", () => {
// 	// path.classList.add("beingPoked");
// 	console.log(1);
// 	animate(
// 		path,
// 		{
// 			d: `
//      M 10,50
// 		 A 40,40 0 0 0 90,50
// 		 A 40,40 0 0 0 10, 50
// 		 Z
//     `,
// 		},
// 		{
// 			duration: 1,
// 		}
// 	);

// 	setTimeout(() => {
// 		// path.classList.remove("beingPoked");
// 	}, 300);
// });

// svg.addEventListener("mouseleave", () => {
// 	// path.classList.add("beingPoked");
// 	console.log(2);
// 	animate(
// 		path,
// 		{
// 			d: `
//   	M 50,10
// 		A 40,40 0 1 0 90,50
// 		A 30,30 0 1 1 50,10
// 		Z
//     `,
// 		},
// 		{
// 			duration: 0.5,
// 		}
// 	);

// 	setTimeout(() => {
// 		// path.classList.remove("beingPoked");
// 	}, 300);
// });
// animate(
// 	path,
// 	{
// 		d: circlePath,
// 	},
// 	{
// 		duration: 1,
// 	}
// );
// animate(
// 	"#moonPath",
// 	{ stroke: "red", d: circlePath },
// 	{
// 		duration: 0.6,
// 		// direction: "alternate",
// 		// iterations: Infinity,
// 		// easing: "ease-in-out",
// 	}
// );

// const str1 = "M50,10 A40,40 0 1 0 90,50 A30,30 0 1 1 50,10 Z"; //"M50,10 A40,40 0 1 0 90,50 A40,40 0 0 0 50,10 Z"
// const str2 = "M 90,50 A 40,40 0 1 0 10,50 A 30,30 0 1 1 90,50";
// const str3 = "M 90,50 A 40,40 0 1 0 10,50 A 30,30 0 1 1 90,50";
// const str4 = "M 90,50 A 40,40 0 1 0 10,50 A 40,40 0 1 1 90,50";
// const circlePath = "M 50,10 A 40,40 0 1 0 90,50 A 40,40 0 0 0 50,10 Z";
// const circlePath = "M 50,10 A 40,40 0 1 0 50,90 A 40,40 0 1 1 50,10 Z";
// const moonPath = "M 50 10 A 40 40 0 1 0 50 90 A 30 30 0 1 0 50 10 Z";

// svg.addEventListener("mouseenter", () => {
// 	console.log(1);
// 	if (currentAnimation) currentAnimation.cancel();

// 	const morph = window.flubber.interpolate(moonPath, circlePath, {
// 		maxSegmentLength: 0.5,
// 	});

// 	// Animate a numeric value from 0 to 1
// 	currentAnimation = animate(0, 1, {
// 		duration: 1,
// 		direction: "alternate",
// 		// repeat: Infinity,
// 		easing: "ease-out",
// 		onUpdate: latest => {
// 			path.setAttribute("d", morph(latest));
// 		},
// 	});
// });

// svg.addEventListener("mouseleave", () => {
// 	if (currentAnimation) currentAnimation.cancel();

// 	const morph = window.flubber.interpolate(circlePath, moonPath);
// 	currentAnimation = animate(0, 1, {
// 		duration: 1,
// 		easing: "ease-in-out",
// 		onUpdate: v => path.setAttribute("d", morph(v)),
// 	});
// });
