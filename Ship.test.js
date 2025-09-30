import Ship from "./Ship";

test("throws error for invalid lengths", () => {
	const invalidValues = [undefined, null, 0, -1, 11, "2", NaN, false, {}, []];
	invalidValues.forEach(len => expect(() => new Ship(len)).toThrow());
});

test("hit() increases hit count when ship is not sunk", () => {
	const ship = new Ship(2);
	ship.hit();
	expect(ship.hitNumber).toBe(1);
});

test("hit() does not increase hit count once ship is sunk", () => {
	const ship = new Ship(1);
	ship.hit();
	expect(ship.hitNumber).toBe(1);
	ship.hit();
	expect(ship.hitNumber).toBe(1);
});

test("isSunk() reflects the sunk state", () => {
	const ship = new Ship(2);
	expect(ship.isSunk()).toBe(false);
	ship.hit();
	expect(ship.isSunk()).toBe(false);
	ship.hit();
	expect(ship.isSunk()).toBe(true);
});
