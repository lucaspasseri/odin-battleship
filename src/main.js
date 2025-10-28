import { Game, state } from "./core/index.js";
import { goToPage } from "./ui/index.js";

const game = new Game();
state.game = game;

game.addPlayer("123", "real", 0);
game.addPlayer("abc", "computer", 1);

game.placeShipByPlayerIndex(0, 0, 5, "horizontal", 0);
game.placeShipByPlayerIndex(0, 1, 5, "vertical", 0);

game.placeShipByPlayerIndex(0, 0, 5, "horizontal", 1);
game.placeShipByPlayerIndex(0, 1, 5, "vertical", 1);

goToPage("mainPage");

// goToPage("initialPage");
