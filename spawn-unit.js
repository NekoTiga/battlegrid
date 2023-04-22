function spawnUnit(type, unitRow, unitCol, player) {
  const unit = new Unit(type, player);

  if (gridData[unitRow][unitCol]) {
    console.error(`Cannot spawn unit: position (${unitRow}, ${unitCol}) is already occupied.`);
    return;
  }

  gridData[unitRow][unitCol] = unit;
  createGrid();
}

export { spawnUnit };