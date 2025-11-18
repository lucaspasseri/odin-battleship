export default function leftTriangleSvg() {
	const svgNS = "http://www.w3.org/2000/svg";

	const svg = document.createElementNS(svgNS, "svg");
	const path = document.createElementNS(svgNS, "path");

	svg.setAttribute("viewBox", "0 0 100 100");
	svg.style.width = "28px";
	svg.style.height = "28px";

	// --- CREATE FILTER for triangular shadow ---
	const defs = document.createElementNS(svgNS, "defs");
	const filter = document.createElementNS(svgNS, "filter");

	filter.id = "triangleShadow";
	filter.setAttribute("x", "-50%");
	filter.setAttribute("y", "-50%");
	filter.setAttribute("width", "200%");
	filter.setAttribute("height", "200%");

	const shadow = document.createElementNS(svgNS, "feDropShadow");
	shadow.setAttribute("dx", "4"); // horizontal shadow offset
	shadow.setAttribute("dy", "4"); // vertical shadow offset
	shadow.setAttribute("stdDeviation", "3"); // blur
	shadow.setAttribute("flood-color", "rgba(0,0,0,0.45)");

	filter.appendChild(shadow);
	defs.appendChild(filter);
	svg.appendChild(defs);
	// ----------------------------------------------

	// TRIANGLE PATH
	path.setAttribute("stroke", "white");
	path.setAttribute("stroke-width", "8px");
	path.setAttribute("stroke-linejoin", "round");
	path.setAttribute("stroke-linecap", "round");

	// Apply triangular shadow
	path.setAttribute("filter", "url(#triangleShadow)");

	const leftTriangle = `
		M 10,50
		L 90,10
		L 90,90
		Z
	`;
	path.setAttribute("d", leftTriangle);

	svg.appendChild(path);

	return svg;
}
