"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BuildElement_1 = __importDefault(require("../BuildElement"));
class ErrorComponent {
    constructor(error) {
        this.error = error;
    }
    getComponentHTML() {
        try {
            return (0, BuildElement_1.default)({
                tag: 'div',
                attributes: [
                    { attribute: 'class', value: ['bg-red-500 h-full items-center'] },
                ],
                content: [
                    (0, BuildElement_1.default)({
                        tag: 'div',
                        attributes: [
                            { attribute: 'class', value: ['text-lg text-black font-bold'] },
                        ],
                        content: [
                            (0, BuildElement_1.default)({
                                tag: 'h1',
                                attributes: [
                                    { attribute: 'class', value: ['text-lg text-center text-black font-bold'] },
                                ],
                                content: `Something went wrong !`,
                            }),
                            !this.error ? null : (0, BuildElement_1.default)({
                                tag: 'h1',
                                attributes: [
                                    { attribute: 'class', value: ['text-sm text-center text-black font-bold'] },
                                ],
                                content: `Error: ` + this.error,
                            })
                        ]
                    })
                ]
            });
        }
        catch (error) {
            console.error(`ErrorComponent: ${error}`);
        }
    }
}
exports.default = ErrorComponent;
