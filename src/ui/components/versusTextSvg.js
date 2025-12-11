export default function versusTextSvg() {
	const svgNS = "http://www.w3.org/2000/svg";

	const svg = document.createElementNS(svgNS, "svg");
	svg.setAttribute("xmlns", svgNS);
	svg.classList.add("overflow-visible");
	svg.setAttribute("viewBox", "0 0 100 100");
	svg.style.width = "299px";
	svg.style.height = "258px";

	const text = document.createElementNS(svgNS, "text");
	text.textContent = "VS";
	text.setAttribute("fill", "lch(55% 91 44)");
	text.setAttribute("stroke", "var(--color)");
	text.setAttribute("stroke-width", "10");
	text.setAttribute("font-family", "'Bebas Neue', sans-serif");
	text.setAttribute("font-size", "200");
	text.setAttribute("dominant-baseline", "hanging"); // IMPORTANT
	text.setAttribute("x", "-84");
	text.setAttribute("y", "-30");
	text.setAttribute("paint-order", "stroke fill");
	text.setAttribute("stroke-linejoin", "round");

	svg.appendChild(text);

	return svg;
}
