"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractView_js_1 = __importDefault(require("../AbstractView.js"));
const BuildElement_js_1 = __importDefault(require("../BuildElement.js"));
class default_1 extends AbstractView_js_1.default {
    constructor() {
        super();
    }
    incubator() {
        if (!this.popup)
            throw new Error('Popup not defined');
        return (0, BuildElement_js_1.default)({
            tag: 'div',
            id: this.id,
            attributes: [
                { attribute: 'class', value: ['fixed z-50 bg-neutral-500 opacity-60 top-0 left-0 h-full w-full justify-center items-center'] }
            ],
            content: (0, BuildElement_js_1.default)({
                tag: 'div',
                attributes: [
                    {
                        attribute: 'class',
                        value: [
                            'flex justify-center items-center h-full w-full',
                            'app-popup-main-incubator'
                        ]
                    }
                ],
                content: this.popup
            })
        });
    }
    displayPopup(popup) {
        this.popup = popup;
        const prev = document.querySelector(".app-popup-main-incubator");
        if (prev)
            prev.remove();
        const mainPopup = this.incubator();
        document.querySelector("#main-content").append(mainPopup);
    }
    hidePopup() {
        if (this.id)
            document.getElementById(this.id).remove();
    }
}
exports.default = default_1;
