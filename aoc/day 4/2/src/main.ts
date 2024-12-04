import * as fs from "fs";

async function readFile(path: string) {
    return await new Promise<string>((res, rej) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                rej(err);
            }
            return res(data)
        });

    })
}

function stringToMatrix(data: string): string[][] {
    const rows = data.split("\r\n");
    const out = rows.map(row => row.split(""));

    return out
}

type Coords = { rowIndex: number, charIndex: number }
function getTotalX_MAS(data: string) {

    const matrix = stringToMatrix(data);

    const A_Indexes: Coords[] = [];
    matrix.forEach((row, rowIndex) => {
        row.forEach((char, charIndex) => {
            if (char === "A") A_Indexes.push({ rowIndex, charIndex })
        })
    })

    let total = 0;

    A_Indexes.forEach(coord => {

        let v = 0;
        if (matrix[coord.rowIndex - 1]?.[coord.charIndex - 1] === "M" && matrix[coord.rowIndex + 1]?.[coord.charIndex + 1] === "S") v += 0.5;
        else if (matrix[coord.rowIndex - 1]?.[coord.charIndex - 1] === "S" && matrix[coord.rowIndex + 1]?.[coord.charIndex + 1] === "M") v += 0.5;

        if (matrix[coord.rowIndex - 1]?.[coord.charIndex + 1] === "M" && matrix[coord.rowIndex + 1]?.[coord.charIndex - 1] === "S") v += 0.5;
        else if (matrix[coord.rowIndex - 1]?.[coord.charIndex + 1] === "S" && matrix[coord.rowIndex + 1]?.[coord.charIndex - 1] === "M") v += 0.5;

        if (v === 1) total++;
    })

    return total
}

async function main() {

    const data = await readFile("./src/data.txt");

    console.log(getTotalX_MAS(data));
}

main();