const rows = ['one', 'two', 'three', 'four', 'five'];
const columns = ['A', 'B', 'C', 'D', 'E']

const getColor = (i, j) => {
    if (i % 2) {
        if (j % 2) {
            return 'brown';
        }

        return 'white';
    }

    if (j % 2) {
        return 'white';
    }

    return 'brown';
};

const buildBoard = () => {
    const board = document.getElementById('board');
    for (let i = 0; i < 5; i++) {
        const newRow = document.createElement('div');

        newRow.className = `row ${rows[i]}`;
        newRow.dataset.row = rows[i];
        board.appendChild(newRow);

        for (let j = 0; j < 5; j++) {
            const newSquare = document.createElement('div');

            if (i === 4 && j === 2) {
                newSquare.id = 'pink-temple';
                newSquare.className = 'square white';
                newSquare.dataset.row = '5';
                newSquare.dataset.column = 'C';
            }

            if (i === 0 && j === 2) {
                newSquare.id = 'blue-temple';
                newSquare.className = 'square brown';
                newSquare.dataset.row = '1';
                newSquare.dataset.column = 'C';
            } else {
                newSquare.id = `${rows[i]}-${columns[j]}`;
                newSquare.className =`square ${getColor(i, j)}`;
                newSquare.dataset.row = `${i+1}`;
                newSquare.dataset.column = columns[j];
            }

            newRow.appendChild(newSquare);
        }
    }
}

buildBoard();