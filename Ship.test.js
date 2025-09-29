import Ship from "./Ship";

test("Ship Class is imported correctly", () => {
	expect(() => new Ship()).not.toThrow();
});
