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

const mulRegex: RegExp = /mul\(\d{1,3},\d{1,3}\)/g

async function main() {

    const data = await readFile("./src/data.txt");

    const instructions = data.match(mulRegex)

    let out = 0;

    instructions?.forEach(instruction => {
        const numbers = instruction.match(/\d{1,3}/g)?.map(s => parseInt(s))

        if (numbers) {
            out += numbers[0] * numbers[1];
        }
    })

    console.log(out)

}

main();