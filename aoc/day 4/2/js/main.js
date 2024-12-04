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
function stringToMatrix(data) {
    const rows = data.split("\r\n");
    const out = rows.map(row => row.split(""));
    return out;
}
function getTotalX_MAS(data) {
    const matrix = stringToMatrix(data);
    const A_Indexes = [];
    matrix.forEach((row, rowIndex) => {
        row.forEach((char, charIndex) => {
            if (char === "A")
                A_Indexes.push({ rowIndex, charIndex });
        });
    });
    let total = 0;
    console.log(A_Indexes.length);
    A_Indexes.forEach(coord => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let v = 0;
        if (((_a = matrix[coord.rowIndex - 1]) === null || _a === void 0 ? void 0 : _a[coord.charIndex - 1]) === "M" && ((_b = matrix[coord.rowIndex + 1]) === null || _b === void 0 ? void 0 : _b[coord.charIndex + 1]) === "S")
            v += 0.5;
        else if (((_c = matrix[coord.rowIndex - 1]) === null || _c === void 0 ? void 0 : _c[coord.charIndex - 1]) === "S" && ((_d = matrix[coord.rowIndex + 1]) === null || _d === void 0 ? void 0 : _d[coord.charIndex + 1]) === "M")
            v += 0.5;
        if (((_e = matrix[coord.rowIndex - 1]) === null || _e === void 0 ? void 0 : _e[coord.charIndex + 1]) === "M" && ((_f = matrix[coord.rowIndex + 1]) === null || _f === void 0 ? void 0 : _f[coord.charIndex - 1]) === "S")
            v += 0.5;
        else if (((_g = matrix[coord.rowIndex - 1]) === null || _g === void 0 ? void 0 : _g[coord.charIndex + 1]) === "S" && ((_h = matrix[coord.rowIndex + 1]) === null || _h === void 0 ? void 0 : _h[coord.charIndex - 1]) === "M")
            v += 0.5;
        if (v === 1)
            total++;
    });
    return total;
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield readFile("./src/data.txt");
        console.log(getTotalX_MAS(data));
    });
}
main();
