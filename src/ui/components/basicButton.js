export default function basicButton(textContent, cb, className) {
	const container = document.createElement("div");

	const button = document.createElement("button");
	button.textContent = textContent;
	button.className = className;
	button.addEventListener("click", cb);

	container.appendChild(button);
	return container;
}
