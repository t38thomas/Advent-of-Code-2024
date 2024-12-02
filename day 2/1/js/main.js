"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
function readFile(path) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((res, rej) => {
            fs.readFile(path, 'utf-8', (err, data) => {
                if (err) {
                    rej();
                }
                return res(data);
            });
        });
    });
}
/**
 * transform strings in format string (space) string (space) string in [number, number, number]
 * @example
 * stringToNumberArray("20 30 40") => [20, 30, 40]
 */
function stringToNumberArray(str) {
    const arrayOfStrings = str.split(" ");
    const out = arrayOfStrings.map(str => parseInt(str));
    return out;
}
function validateItems(prevItem, prevOperation, nextItem) {
    if (prevItem === nextItem)
        return {
            operation: prevOperation,
            valid: false
        };
    function withMax(prevItem, nextItem) {
        if (prevItem >= nextItem && prevItem - nextItem <= 3)
            return { operation: ">=", valid: true };
        else
            return { operation: ">=", valid: false };
    }
    function withMin(prevItem, nextItem) {
        if (prevItem <= nextItem && nextItem - prevItem <= 3)
            return { operation: "<=", valid: true };
        else
            return { operation: "<=", valid: false };
    }
    if (prevOperation) {
        switch (prevOperation) {
            case ">=": return withMax(prevItem, nextItem);
            case "<=": return withMin(prevItem, nextItem);
        }
    }
    let validate = undefined;
    validate = withMax(prevItem, nextItem);
    if (validate.valid)
        return validate;
    validate = withMin(prevItem, nextItem);
    if (validate.valid)
        return validate;
    return {
        valid: false,
        operation: prevOperation
    };
}
/**
 * validate the number array with aoc rule
 */
function validateArray(array) {
    if (array.length < 0)
        return false;
    let validation = { valid: false, operation: undefined };
    for (let i = 1; i < array.length; i++) {
        validation = validateItems(array[i - 1], validation.operation, array[i]);
        if (!validation.valid)
            return false;
    }
    return true;
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield readFile("./src/data.txt");
        const rows = data.split("\r\n");
        let out = 0;
        console.log(rows.length);
        rows.forEach((row, index) => {
            if (validateArray(stringToNumberArray(row)))
                out++;
        });
        console.log(out);
    });
}
main();
