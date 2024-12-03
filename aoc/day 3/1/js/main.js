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
const mulRegex = /mul\(\d{1,3},\d{1,3}\)/g;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield readFile("./src/data.txt");
        const instructions = data.match(mulRegex);
        let out = 0;
        instructions === null || instructions === void 0 ? void 0 : instructions.forEach(instruction => {
            var _a;
            const numbers = (_a = instruction.match(/\d{1,3}/g)) === null || _a === void 0 ? void 0 : _a.map(s => parseInt(s));
            if (numbers) {
                out = out + numbers[0] * numbers[1];
            }
        });
        console.log(out);
    });
}
main();
