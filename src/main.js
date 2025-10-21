import { Game, state } from "./core/index.js";
import { goToPage } from "./ui/index.js";

const game = new Game();
state.game = game;

game.addPlayer("123", "real", 0);
game.addPlayer("abc", "computer", 1);

goToPage("deployShipsPage");
