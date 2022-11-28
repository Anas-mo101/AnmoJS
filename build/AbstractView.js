"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorComponent_js_1 = __importDefault(require("./utils/ErrorComponent.js"));
class AbstractView {
    constructor({ style = undefined } = {}) {
        this.id = AbstractView.generateID();
        this.mainCompnent = document.createElement('div');
        if (style) {
            for (const [key, value] of Object.entries(style)) {
                this.mainCompnent.style.setProperty(`${key}`, `${value}`);
            }
        }
    }
    static generateID() {
        return `anmo-` + Math.random().toString(36).substring(2, 10);
    }
    setTitle(title) {
        document.title = title;
    }
    getComponentHTML() {
        return document.createElement('div');
    }
    async update() {
        if (!this.id)
            throw new Error('Component ID not found');
        const current_node = document.getElementById(this.id);
        if (!current_node)
            return;
        this.mainCompnent = document.createElement('div');
        const node = await this.getComponentHTML();
        current_node.replaceWith(node);
    }
    appendHTMLComponent(element) {
        this.mainCompnent.appendChild(element);
    }
    getComponent_() {
        return this.mainCompnent;
    }
    obs(vr, callback) {
        let observed = { state: vr };
        return new Proxy(observed, {
            set: (target, key, value) => {
                target[key] = value;
                if (callback)
                    callback();
                this.update();
                return true;
            }
        });
    }
    componentError(error = 'Error') {
        return new ErrorComponent_js_1.default(error).getComponentHTML();
    }
}
exports.default = AbstractView;
