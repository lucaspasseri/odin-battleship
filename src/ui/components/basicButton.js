export default function basicButton(
	textContent,
	cb,
	className,
	containerClassName,
	...args
) {
	const container = document.createElement("div");
	container.className = containerClassName;

	const button = document.createElement("button");
	button.textContent = textContent;
	button.className = className;
	button.addEventListener("click", () => cb(...args));

	container.appendChild(button);
	return container;
}
