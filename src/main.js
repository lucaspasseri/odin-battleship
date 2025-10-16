import { Game, state } from "./core/index.js";
import { goToPage } from "./ui/index.js";

const game = new Game();
state.game = game;

goToPage("initialPage");
