import GameboardInterface from "./GameboardInterface";
import Player from "./Player";

it("should be able to check the state of a grid cell, initial state", () => {
	const player = new Player("real");
	const gbi = new GameboardInterface(player);
	expect(gbi.checkCell(0, 0)).toBe("initial");
});

it("should be able to check the state of a grid cell, water state", () => {
	const player = new Player("real");
	const gbi = new GameboardInterface(player);

	gbi.hit(0, 0);
	expect(gbi.checkCell(0, 0)).toBe("water");
});

it("should be able to check the state of a grid cell, ship state", () => {
	const player = new Player("real");
	const gbi = new GameboardInterface(player);
	gbi.gameboard.placeShip(0, 0, 3);
	gbi.hit(0, 0);
	expect(gbi.checkCell(0, 0)).toBe("ship");
});

it("should be able to hit a grid cell if the state of the cell is the initial state", () => {
	const player = new Player("real");
	const gbi = new GameboardInterface(player);

	expect(gbi.hit(0, 0)).toBe(true);
	expect(gbi.hit(0, 0)).toBe(false);
});
