export default function lastPage() {
	const page = document.createElement("div");
	const h1 = document.createElement("h1");
	h1.textContent = "LAST PAGE!";

	page.appendChild(h1);
	return page;
}
