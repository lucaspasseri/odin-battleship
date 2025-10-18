export default function basicButton(
	textContent,
	cb,
	className,
	containerClassName
) {
	const container = document.createElement("div");
	container.className = containerClassName;

	const button = document.createElement("button");
	button.textContent = textContent;
	button.className = className;
	button.addEventListener("click", cb);

	container.appendChild(button);
	return container;
}
