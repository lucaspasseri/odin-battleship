import Player from "./Player.js";
import createGameboardUI from "./gameboardUI.js";

console.log(1);
const body = document.querySelector("body");

const p1 = new Player("real");

p1.gameboard.placeShip(1, 1, 5, "horizontal");
p1.gameboard.placeShip(4, 4, 5, "vertical");
p1.gameboard.placeShip(9, 1, 5, "vertical");

const grid = createGameboardUI(p1);

// const p1 = new Player("real");
// console.log(p1);

// const occupiedPlaces = p1.gameboard.occupiedPlaces;
// console.log({ occupiedPlaces });

// const boardView = document.createElement("div");

// const ul = document.createElement("ul");

// const cols = 10;
// const rows = 10;

// let grid = [];

// for (let i = 0; i < rows; i++) {
// 	const arr = [];
// 	for (let j = 0; j < cols; j++) {
// 		arr.push(undefined);
// 	}
// 	grid.push(arr);
// }

// occupiedPlaces.forEach(entry => {
// 	const [key, ship] = entry;
// 	const stringKeysArr = key.split(",");
// 	const x = Number(stringKeysArr[0]);
// 	const y = Number(stringKeysArr[1]);

// 	grid[x][y] = ship;
// });

// console.log({ grid });

// grid.forEach(row => {
// 	row.forEach(cell => {
// 		const li = document.createElement("li");
// 		const btn = document.createElement("button");

// 		btn.classList.add("water");
// 		btn.addEventListener("click", () => {
// 			console.log(cell);

// 			const ship = cell;
// 			if (ship !== undefined && ship !== false) {
// 				ship.hit();
// 				cell = false;
// 				btn.classList.remove("ship");
// 				btn.classList.add("damage");
// 			}
// 		});
// 		li.appendChild(btn);
// 		ul.appendChild(li);
// 	});
// });

// boardView.appendChild(ul);
body.appendChild(grid);
