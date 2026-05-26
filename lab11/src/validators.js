export function isCorrectImage(data) {
  return (
    data &&
    Number.isInteger(data.gridSize) &&
    Array.isArray(data.cells) &&
    data.cells.length === data.gridSize * data.gridSize
  );
}
