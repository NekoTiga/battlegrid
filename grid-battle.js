import { spawnUnit } from './spawn-unit.js';
const gameGrid = document.getElementById("gameGrid");
const endTurnButton = document.getElementById("endTurnButton");

let currentPlayer = player1;
let selectedUnit = null;
const gridData = createInitialGridData();

function createInitialGridData() {
    const grid = [];
    for (let row = 0; row < 5; row++) {
        const rowData = [];
        for (let col = 0; col < 5; col++) {
            if (row === 0 && col === 0) {
                rowData.push(createUnit("MELEE", player1));
            } else if (row === 4 && col === 4) {
                rowData.push(createUnit("MELEE", player2));
            } else {
                rowData.push(null);
            }
        }
        grid.push(rowData);
    }
    return grid;
}

function createGrid() {
    gameGrid.innerHTML = "";
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener("click", onCellClick);
            cell.addEventListener("mouseover", onMouseOver);
            cell.addEventListener("mouseout", onMouseOut);

            const unit = gridData[row][col];
            if (unit) {
                const unitElement = document.createElement("span");
                unitElement.textContent = unit.type.charAt(0).toUpperCase();
                unitElement.style.color = unit.player === player1 ? "blue" : "red";
                cell.appendChild(unitElement);
            }

            gameGrid.appendChild(cell);
        }
    }
}

function onCellClick(event) {
    const cell = event.target.closest(".cell");
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const gridCell = gridData[row][col];

    if (selectedUnit) {
        if (gridCell && gridCell.player !== currentPlayer) {
            attackEnemy(selectedUnit, row, col);
        } else {
            moveUnit(selectedUnit, row, col);
        }
        selectedUnit = null;
    } else if (gridCell && gridCell.player === currentPlayer) {
        selectedUnit = { row, col };
    }

    createGrid();
}


function onMouseOver(event) {
    const cell = event.target.closest(".cell");
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const unit = gridData[row][col];

    if (unit) {
        const stats = `HP: ${unit.hp}, Armor: ${unit.armor}, Strength: ${unit.strength}`;
        cell.title = stats;
    }
}

function onMouseOut(event) {
    const cell = event.target.closest(".cell");
    cell.title = "";
}

function moveUnit(selectedUnit, targetRow, targetCol) {
    const unit = gridData[selectedUnit.row][selectedUnit.col];
    const targetCell = gridData[targetRow][targetCol];

    if (!targetCell) {
        gridData[targetRow][targetCol] = unit;
        gridData[selectedUnit.row][selectedUnit.col] = null;
        createGrid();
        return true;
    }
    return false;
}

function attackEnemy(selectedUnit, targetRow, targetCol) {
    const unit = gridData[selectedUnit.row][selectedUnit.col];
    const enemy = gridData[targetRow][targetCol];

    if (!enemy || enemy.player === unit.player) return;

    let damage = unit.strength - enemy.armor;
    damage = Math.max(damage, 0);

    console.log(`Attacking unit:`, unit);
    console.log(`Enemy unit:`, enemy);
    console.log(`Damage dealt:`, damage);

    enemy.hp -= damage;

    console.log(`Enemy unit HP after attack:`, enemy.hp);

    if (enemy.hp <= 0) {
        gridData[targetRow][targetCol] = null;
    }

    createGrid();
}

function checkVictoryConditions() {
    let player1Units = 0;
    let player2Units = 0;

    for (const row of gridData) {
        for (const cell of row) {
            if (cell) {
                if (cell.player === player1) {
                    player1Units++;
                } else if (cell.player === player2) {
                    player2Units++;
                }
            }
        }
    }

    if (player1Units === 0 || player2Units === 0) {
        alert(currentPlayer === player1 ? "Player 2 wins!" : "Player 1 wins!");
    } else {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
}

endTurnButton.addEventListener("click", () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    selectedUnit = null;
});

createGrid();