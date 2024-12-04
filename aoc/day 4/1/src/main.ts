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

function horizontalCheck(data: string) {

    let totalHorizontal = 0;

    totalHorizontal += data.match(/XMAS/g)?.length ?? 0
    totalHorizontal += data.match(/SAMX/g)?.length ?? 0

    return totalHorizontal;
}

function stringToMatrix(data: string): string[][] {
    const rows = data.split("\r\n");
    const out = rows.map(row => row.split(""));

    return out
}

type Coords = { rowIndex: number, charIndex: number }
function verticalAndObliqueCheck(data: string): number {

    const matrix = stringToMatrix(data)

    let total = 0;

    const X_Indexs: Coords[] = []
    const S_Indexs: Coords[] = []
    matrix.forEach((row, rowIndex) => {
        row.forEach((char, charIndex) => {
            if (char === "X") X_Indexs.push({ rowIndex, charIndex })
            else if (char === "S") S_Indexs.push({ rowIndex, charIndex })
        })
    })

    X_Indexs.forEach(coord => {     // verticale

        if (
            matrix[coord.rowIndex][coord.charIndex] === "X"
            && matrix[coord.rowIndex + 1]?.[coord.charIndex] === "M"
            && matrix[coord.rowIndex + 2]?.[coord.charIndex] === "A"
            && matrix[coord.rowIndex + 3]?.[coord.charIndex] === "S"
        )
            total++;
    })

    X_Indexs.forEach(coord => {     // obliquo a destra

        if (
            matrix[coord.rowIndex][coord.charIndex] === "X"
            && matrix[coord.rowIndex + 1]?.[coord.charIndex + 1] === "M"
            && matrix[coord.rowIndex + 2]?.[coord.charIndex + 2] === "A"
            && matrix[coord.rowIndex + 3]?.[coord.charIndex + 3] === "S"
        )
            total++;
    })

    X_Indexs.forEach(coord => {     //obliquo a sinistra

        if (
            matrix[coord.rowIndex][coord.charIndex] === "X"
            && matrix[coord.rowIndex + 1]?.[coord.charIndex - 1] === "M"
            && matrix[coord.rowIndex + 2]?.[coord.charIndex - 2] === "A"
            && matrix[coord.rowIndex + 3]?.[coord.charIndex - 3] === "S"
        )
            total++;
    })

    S_Indexs.forEach(coord => {     // verticale
        if (
            matrix[coord.rowIndex][coord.charIndex] === "S"
            && matrix[coord.rowIndex + 1]?.[coord.charIndex] === "A"
            && matrix[coord.rowIndex + 2]?.[coord.charIndex] === "M"
            && matrix[coord.rowIndex + 3]?.[coord.charIndex] === "X"
        )
            total++;
    })

    S_Indexs.forEach(coord => {     // verticale
        if (
            matrix[coord.rowIndex][coord.charIndex] === "S"
            && matrix[coord.rowIndex + 1]?.[coord.charIndex + 1] === "A"
            && matrix[coord.rowIndex + 2]?.[coord.charIndex + 2] === "M"
            && matrix[coord.rowIndex + 3]?.[coord.charIndex + 3] === "X"
        )
            total++;
    })

    S_Indexs.forEach(coord => {     // verticale
        if (
            matrix[coord.rowIndex][coord.charIndex] === "S"
            && matrix[coord.rowIndex + 1]?.[coord.charIndex - 1] === "A"
            && matrix[coord.rowIndex + 2]?.[coord.charIndex - 2] === "M"
            && matrix[coord.rowIndex + 3]?.[coord.charIndex - 3] === "X"
        )
            total++;
    })

    return total;
}

async function main() {
    const data = await readFile("./src/data.txt");

    let total = 0;

    total += horizontalCheck(data)
    total += verticalAndObliqueCheck(data)

    console.log(total)

}

main();