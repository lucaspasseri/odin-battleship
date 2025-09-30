import Gameboard from "./Gameboard";

test("Gameboard should be correctly instantiated", () => {
	const invalidValues = [null, 0, -1, 1, "2", NaN, false, {}, []];
	invalidValues.forEach(value => expect(() => new Gameboard(value)).toThrow());
});

test("receiveAttack should receive the right arguments", () => {
	const gb = new Gameboard();

	const invalidInputs = [undefined, null, false, -1, 10, NaN, "12", {}, []];

	invalidInputs.forEach(value => {
		expect(() => gb.receiveAttack(value, 1)).toThrow();
		expect(() => gb.receiveAttack(1, value)).toThrow();
	});
});

test("Gameboard should keep track of missed attack", () => {
	const gb = new Gameboard();

	const place = [1, 2];
	const place1 = [3, 4];
	const place2 = [5, 6];

	gb.receiveAttack(place[0], place[1]);
	gb.receiveAttack(place1[0], place1[1]);
	gb.receiveAttack(place2[0], place2[1]);

	const placeString = `${place[0]},${place[1]}`;
	const placeString1 = `${place1[0]},${place1[1]}`;
	const placeString2 = `${place2[0]},${place2[1]}`;

	expect(gb.missedAttacks).toEqual([placeString, placeString1, placeString2]);
});

test("Gameboard should not keep track of duplicate missed attacks", () => {
	const gb = new Gameboard();

	const place = [1, 2];
	const placeCopy = [1, 2];
	const placeCopyCopy = [1, 2];

	gb.receiveAttack(place[0], place[1]);
	gb.receiveAttack(placeCopy[0], placeCopy[1]);
	gb.receiveAttack(placeCopyCopy[0], placeCopyCopy[1]);

	const placeString = `${place[0]},${place[1]}`;

	expect(gb.missedAttacks).toEqual([placeString]);
});

test("Gameboard should be able to place a ship", () => {
	const gb = new Gameboard();

	expect(gb.isThereAnyShipLeft()).toBe(false);
	gb.placeShip(1, 2, 3);
	expect(gb.isThereAnyShipLeft()).toBe(true);
});

test("Gameboard cannot place a ship starting beyond the defined places", () => {
	const gb = new Gameboard();

	const numberBeyondLimit = 999;

	expect(() => gb.placeShip(1, numberBeyondLimit)).toThrow();
	expect(() => gb.placeShip(numberBeyondLimit, 1)).toThrow();
});

// test("Gameboard cannot place a ship going beyond the defined places", () => {
// 	const gb = new Gameboard();

// 	const numberBeyondLimit = 10;

// 	expect(() => gb.placeShip(1, 1, numberBeyondLimit)).toThrow();
// });

test("Gameboard cannot place a ship in the place occupied by another ship", () => {});

test("Gameboard should be able to place sunk all the ships", () => {
	const gb = new Gameboard();

	gb.placeShip(1, 2, 3);
	gb.placeShip(3, 3, 2, "vertical");

	expect(gb.isThereAnyShipLeft()).toBe(true);

	gb.receiveAttack(1, 2);
	gb.receiveAttack(2, 2);
	gb.receiveAttack(3, 2);

	gb.receiveAttack(3, 3);
	gb.receiveAttack(3, 4);

	expect(gb.isThereAnyShipLeft()).toBe(false);
});
