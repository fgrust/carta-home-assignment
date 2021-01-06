const argX = parseInt(process.argv[2], 10);
const argY = parseInt(process.argv[3], 10);
const argN = parseInt(process.argv[4], 10);

const arrayX = [-2, -1, 1, 2];
const circleRadiusSquared = 5;
let moves = [];
let hash = new Map();

function findMove(x, y, n) {
  if (x < 0 || x >= n) return;
  if (y < 0 || y >= n) return;
  if (hash.has(`x${x}y${y}`)) return;

  moves = [...moves, { x, y }];
  hash.set(`x${x}y${y}`, 1);

  for (let i = 0; i < arrayX.length; i++) {
    const xOnCircle = x + arrayX[i];
    const dY = Math.sqrt(circleRadiusSquared - Math.pow(arrayX[i], 2));

    for (let j = 1; j < 3; j++) {
      const yOnCircle = y + Math.pow(-1, j) * dY;
      findMove(xOnCircle, yOnCircle, n);
    }
  }
}

function main() {
  findMove(argX, argY, argN);

  if (!moves.length) console.log("No possible movement");

  moves.forEach((m, i) => console.log(`${i}: ${m.x}, ${m.y}`));
}

main();
