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
                    rej(err);
                }
                return res(data);
            });
        });
    });
}
function horizontalCheck(data) {
    var _a, _b, _c, _d;
    let totalHorizontal = 0;
    totalHorizontal += (_b = (_a = data.match(/XMAS/g)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
    totalHorizontal += (_d = (_c = data.match(/SAMX/g)) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0;
    return totalHorizontal;
}
function strinToMatrix(data) {
    const rows = data.split("\r\n");
    const out = rows.map(row => row.split(""));
    return out;
}
function verticalCheck(data) {
    const matrix = strinToMatrix(data);
    let total = 0;
    const X_Indexs = [];
    const S_Indexs = [];
    matrix.forEach((row, rowIndex) => {
        row.forEach((char, charIndex) => {
            if (char === "X")
                X_Indexs.push({ rowIndex, charIndex });
            else if (char === "S")
                S_Indexs.push({ rowIndex, charIndex });
        });
    });
    X_Indexs.forEach(coord => {
        var _a, _b, _c;
        if (matrix[coord.rowIndex][coord.charIndex] === "X"
            && ((_a = matrix[coord.rowIndex + 1]) === null || _a === void 0 ? void 0 : _a[coord.charIndex]) === "M"
            && ((_b = matrix[coord.rowIndex + 2]) === null || _b === void 0 ? void 0 : _b[coord.charIndex]) === "A"
            && ((_c = matrix[coord.rowIndex + 3]) === null || _c === void 0 ? void 0 : _c[coord.charIndex]) === "S")
            total++;
    });
    X_Indexs.forEach(coord => {
        var _a, _b, _c;
        if (matrix[coord.rowIndex][coord.charIndex] === "X"
            && ((_a = matrix[coord.rowIndex + 1]) === null || _a === void 0 ? void 0 : _a[coord.charIndex + 1]) === "M"
            && ((_b = matrix[coord.rowIndex + 2]) === null || _b === void 0 ? void 0 : _b[coord.charIndex + 2]) === "A"
            && ((_c = matrix[coord.rowIndex + 3]) === null || _c === void 0 ? void 0 : _c[coord.charIndex + 3]) === "S")
            total++;
    });
    X_Indexs.forEach(coord => {
        var _a, _b, _c;
        if (matrix[coord.rowIndex][coord.charIndex] === "X"
            && ((_a = matrix[coord.rowIndex + 1]) === null || _a === void 0 ? void 0 : _a[coord.charIndex - 1]) === "M"
            && ((_b = matrix[coord.rowIndex + 2]) === null || _b === void 0 ? void 0 : _b[coord.charIndex - 2]) === "A"
            && ((_c = matrix[coord.rowIndex + 3]) === null || _c === void 0 ? void 0 : _c[coord.charIndex - 3]) === "S")
            total++;
    });
    S_Indexs.forEach(coord => {
        var _a, _b, _c;
        if (matrix[coord.rowIndex][coord.charIndex] === "S"
            && ((_a = matrix[coord.rowIndex + 1]) === null || _a === void 0 ? void 0 : _a[coord.charIndex]) === "A"
            && ((_b = matrix[coord.rowIndex + 2]) === null || _b === void 0 ? void 0 : _b[coord.charIndex]) === "M"
            && ((_c = matrix[coord.rowIndex + 3]) === null || _c === void 0 ? void 0 : _c[coord.charIndex]) === "X")
            total++;
    });
    S_Indexs.forEach(coord => {
        var _a, _b, _c;
        if (matrix[coord.rowIndex][coord.charIndex] === "S"
            && ((_a = matrix[coord.rowIndex + 1]) === null || _a === void 0 ? void 0 : _a[coord.charIndex + 1]) === "A"
            && ((_b = matrix[coord.rowIndex + 2]) === null || _b === void 0 ? void 0 : _b[coord.charIndex + 2]) === "M"
            && ((_c = matrix[coord.rowIndex + 3]) === null || _c === void 0 ? void 0 : _c[coord.charIndex + 3]) === "X")
            total++;
    });
    S_Indexs.forEach(coord => {
        var _a, _b, _c;
        if (matrix[coord.rowIndex][coord.charIndex] === "S"
            && ((_a = matrix[coord.rowIndex + 1]) === null || _a === void 0 ? void 0 : _a[coord.charIndex - 1]) === "A"
            && ((_b = matrix[coord.rowIndex + 2]) === null || _b === void 0 ? void 0 : _b[coord.charIndex - 2]) === "M"
            && ((_c = matrix[coord.rowIndex + 3]) === null || _c === void 0 ? void 0 : _c[coord.charIndex - 3]) === "X")
            total++;
    });
    return total;
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield readFile("./src/data.txt");
        let total = 0;
        total += horizontalCheck(data);
        total += verticalCheck(data);
        console.log(total);
    });
}
main();
