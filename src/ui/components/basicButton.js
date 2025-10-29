export default function basicButton(
	textContent,
	cb,
	className,
	containerClassName,
	containerId = crypto.randomUUID(),
	isDisabled = false,
	...args
) {
	const container = document.createElement("div");
	container.className = containerClassName;
	container.id = containerId;

	const button = document.createElement("button");

	button.textContent = textContent;
	button.className = className;
	button.disabled = isDisabled;
	button.addEventListener("click", () => cb(...args));

	container.appendChild(button);
	return container;
}
