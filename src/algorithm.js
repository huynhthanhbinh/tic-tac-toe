export const boardSize = 20;
export const winArray = new Array(5);
let winner = null;

export const getWinner = () => {
	return winner;
}

export const isWin = (array2D, row, col) => {
	let value = array2D[row][col];

	if (isWinnerExists(getVerticalArray(array2D, row, col), value)
		|| isWinnerExists(getHorizontalArray(array2D, row, col), value)
		|| isWinnerExists(getLeftDiagonalArray(array2D, row, col), value)
		|| isWinnerExists(getRightDiagonalArray(array2D, row, col), value)) {
			return true;
		}
	return false;
}

const isWinnerExists = (array, value) => {
	let index = getArrayWinFirstElementIndex(array, value);
	if (index !== -1) {
		for (let i = 0; i < 5; i++) {
			winArray[i] = array[index + i];
		}
		winner = value;
		return true;
	}
	return false;
}

// 0 1 2 3 <4> 5 6 7 8 
// X X X X X || O O O O O
const getArrayWinFirstElementIndex = (array, value) => {
	if (array.length >= 5) {
		for (let i = 0; i <= array.length - 5; i++) {
			let count = 0;
			for (let j = i; j < i + 5; j++) {
				if (array[j].val === value) {
					count++;
					if (count === 5) {
						return i;
					}
				} else {
					break;
				}
			}
		}
	}
	return -1;
}

const getVerticalArray = (array2D, row, col) => { // column
	let array = [];
	for (let i = ((row - 4 > 0) ? (row - 4) : 0); i <= ((row + 4 < boardSize - 1) ? (row + 4) : boardSize - 1); i++) {
		array.push({ val: array2D[i][col], row: i, col: col });
	}
	return array;
}

const getHorizontalArray = (array2D, row, col) => { // row
	let array = [];
	for (let i = ((col - 4 > 0) ? (col - 4) : 0); i <= ((col + 4 < boardSize - 1) ? (col + 4) : boardSize - 1); i++) {
		array.push({ val: array2D[row][i], row: row, col: i });
	}
	return array;
}

const getLeftDiagonalArray = (array2D, row, col) => { // topLeft --> bottomRight
	let array = [];
	let startRow;
	let startCol;
	let deltaBackward;
	let nElement;

	for (let i = 4; i >= 0; i--) {
		if (row - i >= 0 && col - i >= 0) {
			deltaBackward = i;
			startRow = row - i;
			startCol = col - i;
			break;
		}
	}

	for (let i = 4; i >= 0; i--) {
		if (row + i <= boardSize - 1 && col + i <= boardSize - 1) {
			nElement = deltaBackward + 1 + i;
			break;
		}
	}

	for (let i = 0; i < nElement; i++) {
		array.push({ val: array2D[startRow + i][startCol + i], row: startRow + i, col: startCol + i });
	}

	return array;
}

const getRightDiagonalArray = (array2D, row, col) => { // topRight --> bottomLeft
	let array = [];
	let startRow;
	let startCol;
	let deltaBackward;
	let nElement;

	for (let i = 4; i >= 0; i--) {
		if (row - i >= 0 && col + i <= boardSize - 1) {
			deltaBackward = i;
			startRow = row - i;
			startCol = col + i;
			break;
		}
	}

	for (let i = 4; i >= 0; i--) {
		if (row + i <= boardSize - 1 && col - i >= 0) {
			nElement = deltaBackward + 1 + i;
			break;
		}
	}

	for (let i = 0; i < nElement; i++) {
		array.push({ val: array2D[startRow + i][startCol - i], row: startRow + i, col: startCol - i });
	}

	return array;
}