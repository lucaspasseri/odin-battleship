export function capitalizeFirstLetter(string) {
	if (typeof string !== "string" || string.length === 0) {
		throw new Error();
	}

	const splittedString = string.split("");
	splittedString[0] = splittedString[0].toUpperCase();
	return splittedString.join("");
}
