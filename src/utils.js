export const total_bombs = 14;
export function generateTiles() {
    const bombs = Array.from({ length: 100 });

    let planted_bombs = 0;
    while(planted_bombs != total_bombs){
        const index = Math.floor(Math.random() * 100);

        if(!bombs[index]){
            bombs[index] = 1;
            planted_bombs++;
        }
    }
    return bombs.map( (bomb, index, array)=> {
        const { row, column } = getCoordinates(index);

        let surrounding_bombs = 0;
        if(array[getIndex(row - 1, column - 1)]) surrounding_bombs++;
        if(array[getIndex(row - 1, column - 0)]) surrounding_bombs++;
        if(array[getIndex(row - 1, column + 1)]) surrounding_bombs++;
        if(array[getIndex(row - 0, column - 1)]) surrounding_bombs++;
        if(array[getIndex(row - 0, column + 1)]) surrounding_bombs++;
        if(array[getIndex(row + 1, column - 1)]) surrounding_bombs++;
        if(array[getIndex(row + 1, column - 0)]) surrounding_bombs++;
        if(array[getIndex(row + 1, column + 1)]) surrounding_bombs++;

        return {bomb, surrounding_bombs, flagged: false, revealed: false};
    });
}

export function getIndex(row, column) {
    if (row < 0) return;
    if (column < 0) return;
    if (row > 9) return;
    if (column > 9) return;

    return row * 10 + column;
}
export function getCoordinates(index) {
    return {
        row: Math.floor(index/10),
        column: index % 10,
    };
}