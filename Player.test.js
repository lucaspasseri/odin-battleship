import Player from "./Player";
test("Player should be instantiated correctly", () => {
	expect(() => new Player("real")).not.toThrow();
	expect(() => new Player("computer")).not.toThrow();

	const invalidInputs = [-1, 1, "human", false, NaN, undefined, null, {}, []];

	invalidInputs.forEach(input => expect(() => new Player(input)).toThrow());
});

test("Each Player should contain it own gameboard", () => {
	const player1 = new Player("real");
	const player2 = new Player("computer");

	player1.gameboard.placeShip(1, 1, 2, "horizontal");

	expect(player1.gameboard.isThereAnyShipLeft()).toBe(true);
	expect(player2.gameboard.isThereAnyShipLeft()).toBe(false);
});
