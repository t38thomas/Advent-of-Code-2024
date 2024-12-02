import * as fs from "fs";


async function readFile(path: string) {
    return await new Promise<string>((res, rej) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                rej();
            }
            return res(data)
        });

    })
}

/**
 * transform strings in format string (space) string (space) string in [number, number, number]
 * @example
 * stringToNumberArray("20 30 40") => [20, 30, 40]
 */
function stringToNumberArray(str: string): number[] {
    const arrayOfStrings = str.split(" ");
    const out: number[] = arrayOfStrings.map(str => parseInt(str));

    return out;
}


type ValidationOperation = ">=" | "<="
type ValidationSuccess = { valid: true, operation: ValidationOperation };
type ValidationError = { valid: false, operation: ValidationOperation | undefined }

type Validation = ValidationSuccess | ValidationError;


function validateItems(prevItem: number, prevOperation: ValidationOperation | undefined, nextItem: number): Validation {

    if (prevItem === nextItem)
        return {
            operation: prevOperation,
            valid: false
        }

    function withMax(prevItem: number, nextItem: number): Validation {
        if (prevItem >= nextItem && prevItem - nextItem <= 3) return { operation: ">=", valid: true }
        else return { operation: ">=", valid: false }
    }

    function withMin(prevItem: number, nextItem: number): Validation {
        if (prevItem <= nextItem && nextItem - prevItem <= 3) return { operation: "<=", valid: true }
        else return { operation: "<=", valid: false }
    }

    if (prevOperation) {
        switch (prevOperation) {
            case ">=": return withMax(prevItem, nextItem);
            case "<=": return withMin(prevItem, nextItem)
        }
    }


    let validate: Validation | undefined = undefined;

    validate = withMax(prevItem, nextItem);
    if (validate.valid) return validate;

    validate = withMin(prevItem, nextItem);
    if (validate.valid) return validate;

    return {
        valid: false,
        operation: prevOperation
    }


}

/**
 * validate the number array with aoc rule
 */
function validateArray(array: number[]): boolean {

    if (array.length < 0)
        return false;

    let validation: Validation = { valid: false, operation: undefined };

    for (let i = 1; i < array.length; i++) {
        validation = validateItems(array[i - 1], validation.operation, array[i]);
        if (!validation.valid) return false
    }

    return true;
}

async function main() {
    const data = await readFile("./src/data.txt");
    const rows = data.split("\r\n")

    let out: number = 0;

    rows.forEach((row, index) => {

        if (validateArray(stringToNumberArray(row))) out++;
    })

    console.log(out)

}

main()