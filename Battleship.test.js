import BattleShip from "./Battleship";
import Player from "./Player";
Player;

it("should be able to add a player", () => {
	const game = new BattleShip();

	const playerTypes = ["real", "computer"];
	const players = playerTypes.map(type => new Player(type));

	players.forEach(player => expect(() => game.addPlayer(player)).not.toThrow());

	expect(game.players.length).toBe(2);
});

it("should be to return the current player", () => {
	const game = new BattleShip();

	const player = new Player("real");

	game.addPlayer(player);
	expect(game.currentPlayer).toEqual(player);
});

it("should be play in alternating rounds", () => {
	const game = new BattleShip();

	const p1 = new Player("real");
	const p2 = new Player("real");

	game.addPlayer(p1);
	game.addPlayer(p2);

	expect(game.currentPlayer).toEqual(game.players[0]);
	game.playRound();
	expect(game.currentPlayer).toEqual(game.players[1]);
	game.playRound();
	expect(game.currentPlayer).toEqual(game.players[0]);
});

it("should have different phases: initial, ship placement, fight and end", () => {
	const game = new BattleShip();

	expect(game.phase).toBe("initial");
	game.nextPhase();
	expect(game.phase).toBe("shipPlacement");
	game.nextPhase();
	expect(game.phase).toBe("fight");
	game.nextPhase();
	expect(game.phase).toBe("end");
});

// it("should populate the")

// test("players should be able to place their ships only on ship placement phase", () => {
// 	const game = new BattleShip()

// 	game.currentPlayer.gameboard.placeShip(1)
// });
