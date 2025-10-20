export default function createMatch() {
	const container = document.createElement("section");
	container.className = "px-[4em] py-[2em]";

	const h3 = document.createElement("h3");
	h3.textContent = "Match";
	h3.className = "font-mono text-2xl text-blue-600 font-bold mb-[1em]";

	const wrapper = document.createElement("div");
	// wrapper.className = "flex wrap gap-[3em] items-center";
	wrapper.id = "matchWrapper";

	container.append(h3, wrapper);
	return container;
}
